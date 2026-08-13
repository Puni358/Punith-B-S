import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Laptop,
  PenTool,
  Home as HostelIcon,
  Armchair,
  Microscope,
  Dumbbell,
  Package,
  ArrowRight
} from 'lucide-react';
import { ListingCategory } from '../../types';

export interface CategoryItem {
  name: string;
  categoryValue: ListingCategory | 'All';
  icon: React.ElementType;
  description: string;
  countBadge?: string;
}

export const CATEGORIES_DATA: CategoryItem[] = [
  {
    name: 'Textbooks & Books',
    categoryValue: 'Books',
    icon: BookOpen,
    description: 'Engineering math, physics, novels & notes',
    countBadge: '350+ items',
  },
  {
    name: 'Electronics & Tech',
    categoryValue: 'Electronics',
    icon: Laptop,
    description: 'Laptops, scientific calculators, tablets',
    countBadge: '180+ items',
  },
  {
    name: 'Stationery & Drafters',
    categoryValue: 'Stationery',
    icon: PenTool,
    description: 'Drawing kits, T-scales, notebooks',
    countBadge: '220+ items',
  },
  {
    name: 'Hostel Essentials',
    categoryValue: 'Other',
    icon: HostelIcon,
    description: 'Storage boxes, buckets, water bottles',
    countBadge: '140+ items',
  },
  {
    name: 'Furniture & Study',
    categoryValue: 'Furniture',
    icon: Armchair,
    description: 'Study tables, chairs, LED lamps',
    countBadge: '95+ items',
  },
  {
    name: 'Lab & Engineering',
    categoryValue: 'Stationery',
    icon: Microscope,
    description: 'Lab coats, components, Arduino kits',
    countBadge: '110+ items',
  },
  {
    name: 'Sports & Fitness',
    categoryValue: 'Other',
    icon: Dumbbell,
    description: 'Cricket bats, badminton rackets, gear',
    countBadge: '80+ items',
  },
  {
    name: 'All Essentials',
    categoryValue: 'All',
    icon: Package,
    description: 'Browse everything listed on campus',
    countBadge: 'Explore all',
  },
];

interface CategoryGridProps {
  selectedCategory?: string;
  onSelectCategory?: (category: ListingCategory | 'All') => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section id="categories" className="py-12 bg-zinc-50/50 border-y border-zinc-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
              Campus Categories
            </span>
            <h2 className="text-2xl font-black tracking-tight text-zinc-900 sm:text-3xl mt-1">
              Shop by Category
            </h2>
            <p className="text-sm text-zinc-500 mt-1">
              Jump straight to the student essentials you need for classes and dorm life.
            </p>
          </div>

          <Link
            to="/browse"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-700 transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {CATEGORIES_DATA.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.categoryValue;

            if (onSelectCategory) {
              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => onSelectCategory(cat.categoryValue)}
                  className={`group flex flex-col justify-between rounded-2xl p-4 text-left border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-purple-600 bg-purple-600 text-white shadow-lg shadow-purple-600/20 scale-[1.02]'
                      : 'border-zinc-200/80 bg-white text-zinc-800 hover:border-purple-300 hover:shadow-md hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex size-10 items-center justify-center rounded-xl transition-colors ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white'
                      }`}
                    >
                      <Icon className="size-5" />
                    </span>
                    {cat.countBadge && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-zinc-100 text-zinc-600'
                        }`}
                      >
                        {cat.countBadge}
                      </span>
                    )}
                  </div>

                  <div className="mt-4">
                    <h3 className="font-bold text-sm tracking-tight">{cat.name}</h3>
                    <p
                      className={`text-xs mt-0.5 line-clamp-1 ${
                        isSelected ? 'text-purple-100' : 'text-zinc-500'
                      }`}
                    >
                      {cat.description}
                    </p>
                  </div>
                </button>
              );
            }

            return (
              <Link
                key={cat.name}
                to={
                  cat.categoryValue === 'All'
                    ? '/browse'
                    : `/browse?category=${cat.categoryValue}`
                }
                className="group flex flex-col justify-between rounded-2xl p-4 text-left border border-zinc-200/80 bg-white text-zinc-800 hover:border-purple-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <Icon className="size-5" />
                  </span>
                  {cat.countBadge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600">
                      {cat.countBadge}
                    </span>
                  )}
                </div>

                <div className="mt-4">
                  <h3 className="font-bold text-sm tracking-tight text-zinc-900 group-hover:text-purple-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1">
                    {cat.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
