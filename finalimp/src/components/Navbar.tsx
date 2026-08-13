import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Menu, Search, X, PlusCircle, BookmarkCheck, LogOut, LogIn, UserPlus } from 'lucide-react';

const navLinks = [
  { label: 'Marketplace', href: '/browse' },
  { label: 'Categories', href: '/#categories' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Sell an Item', href: '/sell' },
];

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Failed to log out', err);
    }
  };

  const handleNavClick = (href: string) => {
    setOpen(false);
    if (href.startsWith('/#')) {
      const elementId = href.replace('/#', '');
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/90 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 transition-transform hover:scale-[1.02]"
          aria-label="CampusMart home"
          id="nav-logo"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-purple-600 text-white shadow-md shadow-purple-600/20">
            <GraduationCap className="size-5" />
          </span>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-zinc-900 leading-none">
              CampusMart
            </span>
            <span className="text-[10px] font-semibold tracking-wider uppercase text-purple-600 leading-tight">
              Student Exchange
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => handleNavClick(link.href)}
              className="rounded-lg px-3.5 py-2 text-xs font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-purple-600 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden items-center gap-2.5 md:flex">
          <button
            type="button"
            onClick={() => navigate('/browse')}
            aria-label="Search Marketplace"
            className="flex size-9 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 hover:text-purple-600 transition-colors cursor-pointer"
          >
            <Search className="size-4" />
          </button>

          {user ? (
            <div className="flex items-center gap-3 pl-2 border-l border-zinc-200">
              <Link
                to="/my-listings"
                id="nav-mylistings-link"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-700 hover:bg-zinc-100 transition-colors"
              >
                <BookmarkCheck className="size-3.5 text-purple-600" />
                My Listings
              </Link>

              <Link
                to="/sell"
                id="nav-sell-link"
                className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all hover:shadow-purple-600/20 active:scale-95"
              >
                <PlusCircle className="size-3.5" />
                Sell Item
              </Link>

              <div className="flex items-center gap-2.5 pl-2">
                <img
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=9333ea&color=ffffff`}
                  alt={user.name}
                  className="size-8 rounded-full border border-purple-200 object-cover shadow-xs"
                />
                <button
                  type="button"
                  onClick={handleLogout}
                  id="nav-logout-btn"
                  title="Logout"
                  className="flex items-center gap-1 text-xs font-semibold text-zinc-500 hover:text-red-600 transition-colors cursor-pointer px-2 py-1 rounded-md hover:bg-red-50"
                >
                  <LogOut className="size-3.5" />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 pl-2 border-l border-zinc-200">
              <Link
                to="/login"
                id="nav-login-link"
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:text-purple-600 hover:bg-zinc-100 rounded-lg transition-colors"
              >
                <LogIn className="size-3.5" />
                Login
              </Link>
              <Link
                to="/signup"
                id="nav-signup-link"
                className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-sm shadow-purple-600/20 transition-all hover:scale-[1.02]"
              >
                <UserPlus className="size-3.5" />
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex size-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 md:hidden hover:bg-zinc-100"
          aria-label={open ? 'Close menu' : 'Open menu'}
          id="mobile-menu-toggle-btn"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-t border-zinc-200 bg-white px-4 py-4 md:hidden space-y-3">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => handleNavClick(link.href)}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-zinc-800 transition-colors hover:bg-purple-50 hover:text-purple-600 text-left cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="pt-3 border-t border-zinc-100">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 bg-purple-50/50 rounded-xl">
                  <img
                    src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=9333ea&color=ffffff`}
                    alt={user.name}
                    className="size-9 rounded-full object-cover border border-purple-300"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-zinc-900 truncate">{user.name}</p>
                    <p className="text-xs text-zinc-500 truncate">{user.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    to="/my-listings"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold border border-zinc-200 rounded-xl text-zinc-700 bg-zinc-50"
                  >
                    <BookmarkCheck className="size-3.5 text-purple-600" />
                    My Listings
                  </Link>

                  <Link
                    to="/sell"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-white bg-purple-600 rounded-xl"
                  >
                    <PlusCircle className="size-3.5" />
                    Sell Item
                  </Link>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                  className="w-full mt-1 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl text-center border border-red-100"
                >
                  Logout Account
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-1 py-2.5 text-xs font-bold border border-zinc-200 text-zinc-800 rounded-xl bg-zinc-50"
                >
                  <LogIn className="size-3.5" />
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-1 py-2.5 text-xs font-bold text-white bg-purple-600 rounded-xl"
                >
                  <UserPlus className="size-3.5" />
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
