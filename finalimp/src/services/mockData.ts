import { Listing } from '../types';

export const INITIAL_MOCK_LISTINGS: Listing[] = [
  {
    id: 'l1',
    title: 'Engineering Mathematics (Higher Eng Math)',
    description: 'B.Tech standard textbook for calculus, linear algebra and differential equations. Great condition with no markings.',
    price: 350,
    category: 'Books',
    condition: 'Like New',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800'
    ],
    sellerId: 'user-aarav',
    sellerName: 'Aarav S.',
    sellerPhotoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'l2',
    title: 'Casio Scientific Calculator FX-991ES Plus',
    description: 'Dual powered 417 functions scientific calculator. Ideal for engineering, statistics, and physics labs.',
    price: 650,
    category: 'Electronics',
    condition: 'Good',
    images: [
      'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&q=80&w=800'
    ],
    sellerId: 'user-priya',
    sellerName: 'Priya M.',
    sellerPhotoURL: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: 'l3',
    title: 'Foldable Wooden Study Table',
    description: 'Sturdy wooden desk for hostel room with book slot and cup holder. Easy to fold and store.',
    price: 1200,
    category: 'Furniture',
    condition: 'Good',
    images: [
      'https://images.unsplash.com/photo-1580481072645-022f9a6d1290?auto=format&fit=crop&q=80&w=800'
    ],
    sellerId: 'user-rohit',
    sellerName: 'Rohit K.',
    sellerPhotoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'l4',
    title: 'Aluminum Ergonomic Laptop Stand',
    description: 'Adjustable height laptop riser for desk setup. Prevents overheating and improves neck posture.',
    price: 500,
    category: 'Electronics',
    condition: 'Like New',
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800'
    ],
    sellerId: 'user-neha',
    sellerName: 'Neha D.',
    sellerPhotoURL: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    createdAt: new Date(Date.now() - 3600000 * 36).toISOString(),
  },
  {
    id: 'l5',
    title: 'Hostel Storage Box & Organizer',
    price: 300,
    category: 'Other',
    description: 'Heavy duty plastic storage trunk with lock latches. Great for keeping clothes and extra supplies organized in dorms.',
    condition: 'Good',
    images: [
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=800'
    ],
    sellerId: 'user-ananya',
    sellerName: 'Ananya R.',
    sellerPhotoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
  {
    id: 'l6',
    title: 'Engineering Drawing Instruments Kit',
    price: 450,
    category: 'Stationery',
    description: 'Complete set with mini drafter, compass box, set squares, and T-scale in protective carry pouch.',
    condition: 'Like New',
    images: [
      'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800'
    ],
    sellerId: 'user-karan',
    sellerName: 'Karan V.',
    sellerPhotoURL: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    createdAt: new Date(Date.now() - 3600000 * 60).toISOString(),
  },
  {
    id: 'l7',
    title: 'University Physics Volume II (Resnick & Halliday)',
    price: 280,
    category: 'Books',
    description: 'Essential physics reference book for engineering and science undergraduates.',
    condition: 'Good',
    images: [
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800'
    ],
    sellerId: 'user-ishita',
    sellerName: 'Ishita P.',
    sellerPhotoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
  },
  {
    id: 'l8',
    title: 'Rechargeable LED Study Desk Lamp',
    price: 400,
    category: 'Furniture',
    description: 'Flexible goose neck desk light with 3 brightness modes and warm light for night studying.',
    condition: 'Like New',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800'
    ],
    sellerId: 'user-dev',
    sellerName: 'Dev T.',
    sellerPhotoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    createdAt: new Date(Date.now() - 3600000 * 84).toISOString(),
  },
  {
    id: 'l9',
    title: 'Cricket Bat (English Willow)',
    price: 900,
    category: 'Other',
    description: 'Short handle Kashmir/English willow bat with rubber grip and bat cover. Ready for campus tournament match play.',
    condition: 'Good',
    images: [
      'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800'
    ],
    sellerId: 'user-manav',
    sellerName: 'Manav J.',
    sellerPhotoURL: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    createdAt: new Date(Date.now() - 3600000 * 96).toISOString(),
  }
];

