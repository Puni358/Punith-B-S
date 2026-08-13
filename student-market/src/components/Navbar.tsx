import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Store, PlusCircle, BookmarkCheck, LogOut, LogIn, UserPlus, Menu, X, ShoppingBag } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Failed to log out', err);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-[#F7F3EF] border-b-2 border-[#1A1A1A] shadow-[0_4px_0_#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 text-lg sm:text-xl font-extrabold tracking-tight font-mono text-[#1A1A1A] hover:opacity-90 transition-opacity"
          id="nav-logo"
        >
          <div className="w-8 h-8 bg-[#1A1A1A] text-[#F7F3EF] flex items-center justify-center font-bold border-2 border-[#1A1A1A] shadow-[2px_2px_0_#C9B59C]">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <span className="uppercase tracking-wider">STUDENT MARKET</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 font-mono font-bold text-sm">
          <Link
            to="/browse"
            id="nav-browse-link"
            className={`px-3 py-1.5 border-2 transition-all ${
              isActive('/browse')
                ? 'bg-[#1A1A1A] text-[#F7F3EF] border-[#1A1A1A] shadow-[2px_2px_0_#C9B59C]'
                : 'border-transparent hover:border-[#1A1A1A] hover:bg-[#EFE9E3]'
            }`}
          >
            Browse
          </Link>

          {user ? (
            <>
              <Link
                to="/sell"
                id="nav-sell-link"
                className={`px-3 py-1.5 border-2 flex items-center gap-1.5 transition-all ${
                  isActive('/sell')
                    ? 'bg-[#1A1A1A] text-[#F7F3EF] border-[#1A1A1A] shadow-[2px_2px_0_#C9B59C]'
                    : 'bg-[#C9B59C] border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A] hover:translate-x-[-1px] hover:translate-y-[-1px]'
                }`}
              >
                <PlusCircle className="w-4 h-4" />
                Sell
              </Link>

              <Link
                to="/my-listings"
                id="nav-mylistings-link"
                className={`px-3 py-1.5 border-2 flex items-center gap-1.5 transition-all ${
                  isActive('/my-listings')
                    ? 'bg-[#1A1A1A] text-[#F7F3EF] border-[#1A1A1A] shadow-[2px_2px_0_#C9B59C]'
                    : 'border-transparent hover:border-[#1A1A1A] hover:bg-[#EFE9E3]'
                }`}
              >
                <BookmarkCheck className="w-4 h-4" />
                My Listings
              </Link>

              <div className="h-6 w-[2px] bg-[#1A1A1A] mx-1" />

              {/* User Avatar + Profile */}
              <div className="flex items-center gap-3">
                <img
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=1A1A1A&color=F7F3EF`}
                  alt={user.name}
                  className="w-8 h-8 rounded-none border-2 border-[#1A1A1A] object-cover shadow-[2px_2px_0_#1A1A1A]"
                />
                <span className="font-sans font-semibold text-sm max-w-[120px] truncate" title={user.name}>
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  id="nav-logout-btn"
                  className="retro-btn px-2.5 py-1 text-xs flex items-center gap-1 hover:bg-[#D9CFC7]"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                id="nav-login-link"
                className="retro-btn px-3 py-1.5 text-xs flex items-center gap-1 bg-[#F7F3EF]"
              >
                <LogIn className="w-3.5 h-3.5" />
                Login
              </Link>
              <Link
                to="/signup"
                id="nav-signup-link"
                className="retro-btn retro-btn-primary px-3 py-1.5 text-xs flex items-center gap-1"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Sign Up
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden retro-btn p-2 text-[#1A1A1A]"
          aria-label="Toggle menu"
          id="mobile-menu-toggle-btn"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-[#1A1A1A] bg-[#F7F3EF] px-4 pt-3 pb-6 space-y-3 font-mono font-bold text-sm">
          <Link
            to="/browse"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 border-2 border-[#1A1A1A] bg-[#EFE9E3]"
          >
            Browse
          </Link>

          {user ? (
            <>
              <Link
                to="/sell"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-3 border-2 border-[#1A1A1A] bg-[#C9B59C]"
              >
                + Sell Something
              </Link>

              <Link
                to="/my-listings"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-3 border-2 border-[#1A1A1A] bg-[#EFE9E3]"
              >
                My Listings
              </Link>

              <div className="pt-2 border-t-2 border-[#1A1A1A] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=1A1A1A&color=F7F3EF`}
                    alt={user.name}
                    className="w-7 h-7 border border-[#1A1A1A]"
                  />
                  <span className="font-sans font-medium text-xs">{user.name}</span>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="retro-btn px-3 py-1 text-xs"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="pt-2 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="retro-btn text-center py-2 text-sm"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="retro-btn retro-btn-primary text-center py-2 text-sm"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
