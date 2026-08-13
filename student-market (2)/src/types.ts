export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
  createdAt: string;
}

export type ListingCategory = 
  | 'Books'
  | 'Electronics'
  | 'Furniture'
  | 'Stationery'
  | 'Clothing'
  | 'Accessories'
  | 'Other';

export type ListingCondition = 
  | 'New'
  | 'Like New'
  | 'Good'
  | 'Fair'
  | 'Used';

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: ListingCategory;
  condition: ListingCondition;
  images: string[];
  sellerId: string;
  sellerName: string;
  sellerPhotoURL?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ListingFormData {
  title: string;
  description: string;
  price: number | '';
  category: ListingCategory;
  condition: ListingCondition;
  images: (string | File)[];
}
