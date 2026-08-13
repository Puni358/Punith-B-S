import { 
  collection, 
  doc, 
  addDoc, 
  getDocs, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, isFirebaseConfigured } from '../firebase/config';
import { Listing, ListingCategory, ListingFormData } from '../types';
import { INITIAL_MOCK_LISTINGS } from './mockData';
import { handleFirestoreError, OperationType } from './firestoreError';

const LOCAL_LISTINGS_KEY = 'student_market_local_listings';

// Helper to load local listings
export function getLocalListings(): Listing[] {
  try {
    const raw = localStorage.getItem(LOCAL_LISTINGS_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_LISTINGS_KEY, JSON.stringify(INITIAL_MOCK_LISTINGS));
      return INITIAL_MOCK_LISTINGS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_MOCK_LISTINGS;
  }
}

function saveLocalListings(listings: Listing[]) {
  try {
    localStorage.setItem(LOCAL_LISTINGS_KEY, JSON.stringify(listings));
  } catch (err) {
    console.error('Failed to save local listings', err);
  }
}

/**
 * Upload photos to Firebase Storage or convert to Base64 data URLs for local fallback
 */
export async function uploadListingImages(files: (File | string)[], userId: string): Promise<string[]> {
  const imageUrls: string[] = [];

  for (const file of files) {
    if (typeof file === 'string') {
      imageUrls.push(file); // Already an image URL or base64
      continue;
    }

    if (isFirebaseConfigured && storage) {
      try {
        const fileExt = file.name.split('.').pop() || 'jpg';
        const storageRef = ref(storage, `listingImages/${userId}/${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`);
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        imageUrls.push(url);
      } catch (err) {
        console.error('Firebase Storage upload error:', err);
        // Fallback convert to Base64 data URL if storage upload fails
        const dataUrl = await fileToDataUrl(file);
        imageUrls.push(dataUrl);
      }
    } else {
      // Local fallback
      const dataUrl = await fileToDataUrl(file);
      imageUrls.push(dataUrl);
    }
  }

  return imageUrls;
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Fetch all active listings, optionally filtered by category and search query
 */
export async function fetchListings(
  categoryFilter?: ListingCategory | 'All',
  searchQuery?: string
): Promise<Listing[]> {
  let listings: Listing[] = [];

  if (isFirebaseConfigured && db) {
    try {
      const listingsRef = collection(db, 'listings');
      const querySnapshot = await getDocs(listingsRef);
      
      listings = querySnapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          title: data.title || '',
          description: data.description || '',
          price: Number(data.price) || 0,
          category: data.category || 'Other',
          condition: data.condition || 'Good',
          images: Array.isArray(data.images) ? data.images : [],
          sellerId: data.sellerId || '',
          sellerName: data.sellerName || 'Student Seller',
          sellerPhotoURL: data.sellerPhotoURL || '',
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : (data.createdAt || new Date().toISOString()),
          updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt,
        };
      });

      // Sort newest first
      listings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      // If database is currently empty, serve initial mock listings so marketplace is populated
      if (listings.length === 0 && (!categoryFilter || categoryFilter === 'All') && (!searchQuery || searchQuery === '')) {
        return getLocalListings();
      }
    } catch (error) {
      console.warn('Firestore listing query notice, loading fallback local dataset:', error);
      listings = getLocalListings();
    }
  } else {
    listings = getLocalListings();
  }

  // Filter in memory for category if needed and client search query
  if (categoryFilter && categoryFilter !== 'All') {
    listings = listings.filter(item => item.category === categoryFilter);
  }

  if (searchQuery && searchQuery.trim() !== '') {
    const qStr = searchQuery.toLowerCase().trim();
    listings = listings.filter(item => 
      item.title.toLowerCase().includes(qStr) || 
      item.description.toLowerCase().includes(qStr) ||
      item.category.toLowerCase().includes(qStr)
    );
  }

  return listings;
}

/**
 * Fetch a single listing by ID
 */
export async function fetchListingById(listingId: string): Promise<Listing | null> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'listings', listingId);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data();
        return {
          id: snap.id,
          title: data.title || '',
          description: data.description || '',
          price: Number(data.price) || 0,
          category: data.category || 'Other',
          condition: data.condition || 'Good',
          images: Array.isArray(data.images) ? data.images : [],
          sellerId: data.sellerId || '',
          sellerName: data.sellerName || 'Student Seller',
          sellerPhotoURL: data.sellerPhotoURL || '',
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : (data.createdAt || new Date().toISOString()),
          updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt,
        };
      }
    } catch (err) {
      console.warn('Error fetching single listing from Firestore, loading fallback local data:', err);
    }
  }

  // Fallback to local search if not found in Firestore
  const localListings = getLocalListings();
  return localListings.find(item => item.id === listingId) || null;
}

/**
 * Fetch listings created by a specific user
 */
export async function fetchUserListings(userId: string): Promise<Listing[]> {
  if (isFirebaseConfigured && db) {
    try {
      const listingsRef = collection(db, 'listings');
      const q = query(listingsRef, where('sellerId', '==', userId));
      const querySnapshot = await getDocs(q);
      
      const userItems = querySnapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          title: data.title || '',
          description: data.description || '',
          price: Number(data.price) || 0,
          category: data.category || 'Other',
          condition: data.condition || 'Good',
          images: Array.isArray(data.images) ? data.images : [],
          sellerId: data.sellerId || '',
          sellerName: data.sellerName || 'Student Seller',
          sellerPhotoURL: data.sellerPhotoURL || '',
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : (data.createdAt || new Date().toISOString()),
          updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt,
        };
      });

      // Sort newest first
      return userItems.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (err) {
      console.warn('Error fetching user listings from Firestore, loading fallback local dataset:', err);
    }
  }

  const localListings = getLocalListings();
  return localListings
    .filter(item => item.sellerId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

/**
 * Create a new listing
 */
export async function createListing(
  formData: ListingFormData,
  user: { uid: string; name: string; photoURL?: string }
): Promise<Listing> {
  const imageUrls = await uploadListingImages(formData.images, user.uid);
  const now = new Date().toISOString();

  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, 'listings'), {
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        category: formData.category,
        condition: formData.condition,
        images: imageUrls,
        sellerId: user.uid,
        sellerName: user.name,
        sellerPhotoURL: user.photoURL || '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return {
        id: docRef.id,
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        category: formData.category,
        condition: formData.condition,
        images: imageUrls,
        sellerId: user.uid,
        sellerName: user.name,
        sellerPhotoURL: user.photoURL || '',
        createdAt: now,
        updatedAt: now,
      };
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'listings');
    }
  } else {
    // Local persistence
    const localListings = getLocalListings();
    const newListing: Listing = {
      id: `list-local-${Date.now()}`,
      title: formData.title.trim(),
      description: formData.description.trim(),
      price: Number(formData.price),
      category: formData.category,
      condition: formData.condition,
      images: imageUrls.length > 0 ? imageUrls : ['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=800'],
      sellerId: user.uid,
      sellerName: user.name,
      sellerPhotoURL: user.photoURL || '',
      createdAt: now,
      updatedAt: now,
    };

    localListings.unshift(newListing);
    saveLocalListings(localListings);
    return newListing;
  }
}

/**
 * Update an existing listing
 */
export async function updateListing(
  listingId: string,
  formData: Partial<ListingFormData>,
  userId: string
): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'listings', listingId);
      const updateData: Record<string, any> = {
        updatedAt: serverTimestamp()
      };

      if (formData.title !== undefined) updateData.title = formData.title.trim();
      if (formData.description !== undefined) updateData.description = formData.description.trim();
      if (formData.price !== undefined) updateData.price = Number(formData.price);
      if (formData.category !== undefined) updateData.category = formData.category;
      if (formData.condition !== undefined) updateData.condition = formData.condition;
      if (formData.images !== undefined) {
        updateData.images = await uploadListingImages(formData.images, userId);
      }

      await updateDoc(docRef, updateData);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `listings/${listingId}`);
    }
  } else {
    const localListings = getLocalListings();
    const index = localListings.findIndex(item => item.id === listingId);
    if (index !== -1) {
      if (localListings[index].sellerId !== userId) {
        throw new Error('Unauthorized to edit this listing.');
      }
      const existing = localListings[index];
      let newImages = existing.images;
      if (formData.images) {
        newImages = await uploadListingImages(formData.images, userId);
      }

      localListings[index] = {
        ...existing,
        title: formData.title !== undefined ? formData.title.trim() : existing.title,
        description: formData.description !== undefined ? formData.description.trim() : existing.description,
        price: formData.price !== undefined ? Number(formData.price) : existing.price,
        category: formData.category !== undefined ? formData.category : existing.category,
        condition: formData.condition !== undefined ? formData.condition : existing.condition,
        images: newImages,
        updatedAt: new Date().toISOString()
      };
      saveLocalListings(localListings);
    }
  }
}

/**
 * Delete a listing
 */
export async function deleteListing(listingId: string, userId: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'listings', listingId);
      const snap = await getDoc(docRef);
      if (snap.exists() && snap.data().sellerId !== userId) {
        throw new Error('You can only delete your own listings.');
      }
      await deleteDoc(docRef);
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `listings/${listingId}`);
    }
  } else {
    const localListings = getLocalListings();
    const filtered = localListings.filter(item => {
      if (item.id === listingId) {
        if (item.sellerId !== userId) {
          throw new Error('You can only delete your own listings.');
        }
        return false;
      }
      return true;
    });
    saveLocalListings(filtered);
  }
}

