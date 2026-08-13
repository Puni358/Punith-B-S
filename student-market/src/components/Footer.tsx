import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-[#F7F3EF] border-t-2 border-[#1A1A1A] py-10 px-4 font-mono text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2 font-extrabold text-base text-[#1A1A1A]">
            <div className="w-6 h-6 bg-[#1A1A1A] text-[#F7F3EF] flex items-center justify-center font-bold border border-[#1A1A1A]">
              <ShoppingBag className="w-3.5 h-3.5" />
            </div>
            STUDENT MARKET
          </div>
          <p className="font-sans text-xs text-[#555555]">
            The dedicated campus marketplace. Buy and sell textbooks, dorm furniture, electronics, and supplies safely with fellow students.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-xs uppercase text-[#1A1A1A] mb-3 border-b border-[#1A1A1A] pb-1">
            Navigation
          </h4>
          <ul className="space-y-2 text-xs font-sans">
            <li><Link to="/browse" className="hover:underline">Browse Listings</Link></li>
            <li><Link to="/sell" className="hover:underline">Sell an Item</Link></li>
            <li><Link to="/my-listings" className="hover:underline">My Listings</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-bold text-xs uppercase text-[#1A1A1A] mb-3 border-b border-[#1A1A1A] pb-1">
            Popular Categories
          </h4>
          <ul className="space-y-2 text-xs font-sans">
            <li><Link to="/browse?category=Books" className="hover:underline">Textbooks & Books</Link></li>
            <li><Link to="/browse?category=Electronics" className="hover:underline">Laptops & Tech</Link></li>
            <li><Link to="/browse?category=Furniture" className="hover:underline">Dorm Furniture</Link></li>
            <li><Link to="/browse?category=Stationery" className="hover:underline">Calculators & Supplies</Link></li>
          </ul>
        </div>

        {/* Campus Notice */}
        <div>
          <h4 className="font-bold text-xs uppercase text-[#1A1A1A] mb-3 border-b border-[#1A1A1A] pb-1">
            Student Market
          </h4>
          <p className="font-sans text-xs text-[#555555] leading-relaxed">
            Version 1.0 — Built with React, Vite & Firebase. Designed exclusively for student peer-to-peer campus exchanges.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-4 border-t border-[#D9CFC7] flex flex-col sm:flex-row items-center justify-between text-xs text-[#666666] font-sans">
        <p>&copy; {new Date().getFullYear()} Student Market. Your campus marketplace.</p>
        <p className="flex items-center gap-1 mt-2 sm:mt-0 font-mono text-[11px]">
          Made with <Heart className="w-3 h-3 text-red-600 fill-red-600 inline" /> for college students
        </p>
      </div>
    </footer>
  );
};
