import {
  Armchair,
  BookOpen,
  Dumbbell,
  FlaskConical,
  Laptop,
  type LucideIcon,
  Package,
  PencilRuler,
  Shapes,
} from 'lucide-react'

export type Listing = {
  id: string
  title: string
  price: number
  category: string
  condition: string
  location: string
  sellerName: string
  image: string
  createdAt: string
}

export type Category = {
  id: string
  name: string
  icon: LucideIcon
}

/**
 * Category definitions. `id` values are the canonical filter keys and match
 * the `category` field on each listing so the app can be wired to
 * Firestore queries later (e.g. where("category", "==", id)).
 */
export const categories: Category[] = [
  { id: 'textbooks', name: 'Textbooks', icon: BookOpen },
  { id: 'electronics', name: 'Electronics', icon: Laptop },
  { id: 'stationery', name: 'Stationery', icon: PencilRuler },
  { id: 'hostel', name: 'Hostel Essentials', icon: Package },
  { id: 'furniture', name: 'Furniture', icon: Armchair },
  { id: 'lab', name: 'Lab & Engineering', icon: FlaskConical },
  { id: 'sports', name: 'Sports', icon: Dumbbell },
  { id: 'other', name: 'Other', icon: Shapes },
]

export const categoryLabel = (id: string) =>
  categories.find((c) => c.id === id)?.name ?? 'Other'

/**
 * Mock marketplace listings. Replace this array with a Firestore fetch later —
 * the shape mirrors a `listings` collection document.
 */
export const listings: Listing[] = [
  {
    id: 'l1',
    title: 'Engineering Mathematics',
    price: 350,
    category: 'textbooks',
    condition: 'Like New',
    location: 'North Campus Hostel',
    sellerName: 'Aarav S.',
    image: '/listings/engineering-math-textbook.png',
    createdAt: '2026-08-10T09:00:00.000Z',
  },
  {
    id: 'l2',
    title: 'Casio FX-991ES Plus',
    price: 650,
    category: 'electronics',
    condition: 'Good',
    location: 'Block C, Room 214',
    sellerName: 'Priya M.',
    image: '/listings/scientific-calculator.png',
    createdAt: '2026-08-11T11:30:00.000Z',
  },
  {
    id: 'l3',
    title: 'Study Table',
    price: 1200,
    category: 'furniture',
    condition: 'Used - Good',
    location: 'PG near Gate 3',
    sellerName: 'Rohit K.',
    image: '/listings/study-table.png',
    createdAt: '2026-08-09T15:45:00.000Z',
  },
  {
    id: 'l4',
    title: 'Laptop Stand',
    price: 500,
    category: 'electronics',
    condition: 'Like New',
    location: 'South Campus',
    sellerName: 'Neha D.',
    image: '/listings/laptop-stand.png',
    createdAt: '2026-08-12T08:20:00.000Z',
  },
  {
    id: 'l5',
    title: 'Hostel Storage Box',
    price: 300,
    category: 'hostel',
    condition: 'Good',
    location: 'Girls Hostel A',
    sellerName: 'Ananya R.',
    image: '/listings/hostel-storage-box.png',
    createdAt: '2026-08-08T18:10:00.000Z',
  },
  {
    id: 'l6',
    title: 'Drawing Instruments',
    price: 450,
    category: 'lab',
    condition: 'Like New',
    location: 'Engineering Block',
    sellerName: 'Karan V.',
    image: '/listings/drawing-kit.png',
    createdAt: '2026-08-12T13:05:00.000Z',
  },
  {
    id: 'l7',
    title: 'Physics Volume II',
    price: 280,
    category: 'textbooks',
    condition: 'Good',
    location: 'Central Library Area',
    sellerName: 'Ishita P.',
    image: '/listings/physics-textbook.png',
    createdAt: '2026-08-07T10:00:00.000Z',
  },
  {
    id: 'l8',
    title: 'LED Study Desk Lamp',
    price: 400,
    category: 'hostel',
    condition: 'Like New',
    location: 'Block B, Room 108',
    sellerName: 'Dev T.',
    image: '/listings/desk-lamp.png',
    createdAt: '2026-08-11T20:15:00.000Z',
  },
  {
    id: 'l9',
    title: 'Cricket Bat (English Willow)',
    price: 900,
    category: 'sports',
    condition: 'Used - Good',
    location: 'Sports Complex',
    sellerName: 'Manav J.',
    image: '/listings/cricket-bat.png',
    createdAt: '2026-08-06T16:40:00.000Z',
  },
]

export const formatPrice = (price: number) =>
  `₹${price.toLocaleString('en-IN')}`
