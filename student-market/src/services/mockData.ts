import { Listing } from '../types';

export const INITIAL_MOCK_LISTINGS: Listing[] = [
  {
    id: 'list-101',
    title: 'Calculus: Early Transcendentals (8th Edition)',
    description: 'Textbook used for MAT101 & MAT102. Highlights on chapters 3 and 4, but otherwise in great condition. Includes formula sheet cheat card!',
    price: 450,
    category: 'Books',
    condition: 'Good',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800'
    ],
    sellerId: 'user-alex',
    sellerName: 'Alex Chen',
    sellerPhotoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: 'list-102',
    title: 'Apple iPad Air M1 (64GB) + Apple Pencil 2nd Gen',
    description: 'Space Gray iPad Air in immaculate condition. Used solely for lecture note-taking. Screen protector installed from day one. Comes with original box and USB-C charger.',
    price: 28500,
    category: 'Electronics',
    condition: 'Like New',
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800'
    ],
    sellerId: 'user-maya',
    sellerName: 'Maya Patel',
    sellerPhotoURL: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'list-103',
    title: 'Ergonomic Mesh College Dorm Desk Chair',
    description: 'Super comfortable lumbar support chair for long study sessions. Adjustable height and armrests. Clean and smoke-free dorm.',
    price: 1800,
    category: 'Furniture',
    condition: 'Good',
    images: [
      'https://images.unsplash.com/photo-1580481072645-022f9a6d1290?auto=format&fit=crop&q=80&w=800'
    ],
    sellerId: 'user-sam',
    sellerName: 'Sam Miller',
    sellerPhotoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    createdAt: new Date(Date.now() - 3600000 * 36).toISOString(),
  },
  {
    id: 'list-104',
    title: 'TI-84 Plus CE Graphing Calculator',
    description: 'Full color display graphing calculator. Essential for engineering and statistics courses. Pre-loaded with custom science programs and fresh battery.',
    price: 3200,
    category: 'Stationery',
    condition: 'Like New',
    images: [
      'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&q=80&w=800'
    ],
    sellerId: 'user-alex',
    sellerName: 'Alex Chen',
    sellerPhotoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
  {
    id: 'list-105',
    title: 'Campus Varsity Oversized Hoodie (Size L)',
    description: 'Heavyweight fleece college hoodie. Extremely warm for early morning winter lectures. Worn just a few times.',
    price: 750,
    category: 'Clothing',
    condition: 'Good',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800'
    ],
    sellerId: 'user-jordan',
    sellerName: 'Jordan Vance',
    sellerPhotoURL: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    createdAt: new Date(Date.now() - 3600000 * 60).toISOString(),
  },
  {
    id: 'list-106',
    title: 'Sony WH-1000XM4 Noise Canceling Headphones',
    description: 'The ultimate study companion for noisy library environments. Outstanding active noise cancellation and 30hr battery life. Includes audio cable and travel pouch.',
    price: 12500,
    category: 'Electronics',
    condition: 'Good',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800'
    ],
    sellerId: 'user-maya',
    sellerName: 'Maya Patel',
    sellerPhotoURL: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
  },
  {
    id: 'list-107',
    title: 'Waterproof Laptop Backpack with USB Charging Port',
    description: 'Spacious 25L commuter backpack with padded sleeve for up to 15.6" laptops. Multiple organizer pockets for notebooks and water bottle side slots.',
    price: 850,
    category: 'Accessories',
    condition: 'Like New',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800'
    ],
    sellerId: 'user-sam',
    sellerName: 'Sam Miller',
    sellerPhotoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    createdAt: new Date(Date.now() - 3600000 * 96).toISOString(),
  },
  {
    id: 'list-108',
    title: 'Compact Mini Fridge (45L) - Dorm Ready',
    description: 'Low-noise energy efficient mini refrigerator with small freezer compartment. Perfect for student dorm rooms. Fully cleaned and defrosted.',
    price: 3400,
    category: 'Furniture',
    condition: 'Good',
    images: [
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=800'
    ],
    sellerId: 'user-jordan',
    sellerName: 'Jordan Vance',
    sellerPhotoURL: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    createdAt: new Date(Date.now() - 3600000 * 120).toISOString(),
  }
];
