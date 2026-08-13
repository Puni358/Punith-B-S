import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchUserListings, deleteListing, updateListing } from '../services/listingService';
import { Listing, ListingCategory, ListingCondition } from '../types';
import { Loading } from '../components/Loading';
import { BookmarkCheck, Eye, Edit, Trash2, PlusCircle, X, Check, ShoppingBag, AlertCircle } from 'lucide-react';

const CATEGORIES: ListingCategory[] = [
  'Books',
  'Electronics',
  'Furniture',
  'Stationery',
  'Clothing',
  'Accessories',
  'Other',
];

const CONDITIONS: ListingCondition[] = [
  'New',
  'Like New',
  'Good',
  'Fair',
  'Used',
];

export const MyListings: React.FC = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Modals state
  const [deleteTarget, setDeleteTarget] = useState<Listing | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);

  const [editTarget, setEditTarget] = useState<Listing | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editPrice, setEditPrice] = useState<string>('');
  const [editCategory, setEditCategory] = useState<ListingCategory>('Books');
  const [editCondition, setEditCondition] = useState<ListingCondition>('Good');
  const [editDescription, setEditDescription] = useState('');
  const [updating, setUpdating] = useState<boolean>(false);
  const [editError, setEditError] = useState<string | null>(null);

  const loadMyListings = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const userItems = await fetchUserListings(user.uid);
      setListings(userItems);
    } catch (err) {
      console.error('Failed to load user listings', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMyListings();
  }, [user]);

  const handleDelete = async () => {
    if (!user || !deleteTarget) return;
    setDeleting(true);
    try {
      await deleteListing(deleteTarget.id, user.uid);
      setListings((prev) => prev.filter((item) => item.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      console.error('Delete failed', err);
      alert('Failed to delete listing.');
    } finally {
      setDeleting(false);
    }
  };

  const handleOpenEdit = (item: Listing) => {
    setEditTarget(item);
    setEditTitle(item.title);
    setEditPrice(String(item.price));
    setEditCategory(item.category);
    setEditCondition(item.condition);
    setEditDescription(item.description);
    setEditError(null);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !editTarget) return;
    setEditError(null);

    if (!editTitle.trim() || !editPrice || Number(editPrice) <= 0 || !editDescription.trim()) {
      setEditError('Please fill out all required fields with valid values.');
      return;
    }

    setUpdating(true);
    try {
      await updateListing(
        editTarget.id,
        {
          title: editTitle.trim(),
          price: Number(editPrice),
          category: editCategory,
          condition: editCondition,
          description: editDescription.trim(),
        },
        user.uid
      );

      await loadMyListings();
      setEditTarget(null);
    } catch (err: any) {
      setEditError(err.message || 'Failed to update listing.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <Loading message="Loading your marketplace listings..." />;
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="retro-card p-6 bg-[#F7F3EF] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#C9B59C] border border-[#1A1A1A] px-2.5 py-0.5 font-mono text-xs font-bold uppercase mb-2 shadow-[2px_2px_0_#1A1A1A]">
            <BookmarkCheck className="w-3.5 h-3.5" />
            Seller Dashboard
          </div>
          <h1 className="font-mono text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] uppercase tracking-wide">
            MY LISTINGS
          </h1>
          <p className="font-sans text-xs text-[#555555]">
            Manage, edit, or delete items you have posted for sale.
          </p>
        </div>

        <Link
          to="/sell"
          id="mylistings-add-new-btn"
          className="retro-btn retro-btn-primary px-5 py-2.5 text-xs flex items-center gap-2 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          + SELL AN ITEM
        </Link>
      </div>

      {/* Listings Table / Cards */}
      {listings.length > 0 ? (
        <div className="space-y-4">
          <div className="font-mono text-xs font-bold text-[#1A1A1A]">
            You have {listings.length} active {listings.length === 1 ? 'listing' : 'listings'}:
          </div>

          <div className="grid grid-cols-1 gap-4">
            {listings.map((item) => {
              const formattedPrice = new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0,
              }).format(item.price);

              const dateStr = new Date(item.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });

              return (
                <div
                  key={item.id}
                  className="retro-card p-4 bg-[#F7F3EF] flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.images[0] || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=800'}
                      alt={item.title}
                      className="w-20 h-20 object-cover border-2 border-[#1A1A1A] flex-shrink-0 bg-[#EFE9E3]"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=800';
                      }}
                    />

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[10px] font-bold bg-[#C9B59C] border border-[#1A1A1A] px-1.5 py-0.2">
                          {item.category}
                        </span>
                        <span className="font-mono text-[10px] font-bold bg-[#D9CFC7] border border-[#1A1A1A] px-1.5 py-0.2">
                          {item.condition}
                        </span>
                        <span className="font-sans text-[11px] text-[#666666]">
                          Posted {dateStr}
                        </span>
                      </div>

                      <h3 className="font-mono font-bold text-base text-[#1A1A1A] line-clamp-1">
                        {item.title}
                      </h3>

                      <div className="font-mono font-extrabold text-lg text-[#1A1A1A]">
                        {formattedPrice}
                      </div>
                    </div>
                  </div>

                  {/* Actions: View, Edit, Delete */}
                  <div className="flex items-center gap-2 border-t md:border-t-0 md:border-l border-[#1A1A1A] pt-3 md:pt-0 md:pl-4 flex-shrink-0">
                    <Link
                      to={`/listing/${item.id}`}
                      className="retro-btn px-3 py-1.5 text-xs flex items-center gap-1 bg-[#F7F3EF]"
                      title="View Listing"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View
                    </Link>

                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="retro-btn px-3 py-1.5 text-xs flex items-center gap-1 bg-[#C9B59C]"
                      title="Edit Listing"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      Edit
                    </button>

                    <button
                      onClick={() => setDeleteTarget(item)}
                      className="retro-btn px-3 py-1.5 text-xs flex items-center gap-1 bg-[#FFEDED] text-[#990000]"
                      title="Delete Listing"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="retro-card p-12 text-center bg-[#F7F3EF] space-y-4 max-w-md mx-auto my-8">
          <div className="w-12 h-12 mx-auto bg-[#C9B59C] border-2 border-[#1A1A1A] flex items-center justify-center shadow-[2px_2px_0_#1A1A1A]">
            <ShoppingBag className="w-6 h-6 text-[#1A1A1A]" />
          </div>
          <h3 className="font-mono font-bold text-lg text-[#1A1A1A]">
            You have no active listings.
          </h3>
          <p className="font-sans text-xs text-[#555555]">
            Have textbooks, tech, or dorm furniture you no longer need? Turn them into cash!
          </p>
          <Link
            to="/sell"
            className="retro-btn retro-btn-primary px-5 py-2 text-xs inline-flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            CREATE YOUR FIRST LISTING
          </Link>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-[#1A1A1A]/60 flex items-center justify-center p-4">
          <div className="retro-card p-6 bg-[#F7F3EF] max-w-sm w-full space-y-4">
            <div className="w-10 h-10 bg-[#FFEDED] border-2 border-[#1A1A1A] flex items-center justify-center mx-auto shadow-[2px_2px_0_#990000]">
              <Trash2 className="w-5 h-5 text-[#990000]" />
            </div>

            <div className="text-center space-y-2">
              <h4 className="font-mono font-bold text-base text-[#1A1A1A] uppercase">
                Delete Listing?
              </h4>
              <p className="font-sans text-xs text-[#333333]">
                Are you sure you want to delete <strong>"{deleteTarget.title}"</strong>?
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="retro-btn w-1/2 py-2 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="retro-btn w-1/2 py-2 text-xs bg-[#990000] text-[#FFFFFF]"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editTarget && (
        <div className="fixed inset-0 z-50 bg-[#1A1A1A]/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="retro-card p-6 bg-[#F7F3EF] max-w-md w-full space-y-4 my-8">
            <div className="flex items-center justify-between border-b-2 border-[#1A1A1A] pb-3">
              <h3 className="font-mono font-bold text-lg text-[#1A1A1A] uppercase">
                Edit Listing
              </h3>
              <button
                onClick={() => setEditTarget(null)}
                className="p-1 hover:bg-[#D9CFC7]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {editError && (
              <div className="p-2.5 bg-[#FFEDED] border border-[#1A1A1A] text-xs font-mono text-[#990000]">
                {editError}
              </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-4 font-sans text-xs">
              <div className="space-y-1">
                <label className="block font-mono font-bold uppercase">Title</label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="retro-input w-full p-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-mono font-bold uppercase">Category</label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value as ListingCategory)}
                    className="retro-input w-full p-2 font-mono"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-mono font-bold uppercase">Condition</label>
                  <select
                    value={editCondition}
                    onChange={(e) => setEditCondition(e.target.value as ListingCondition)}
                    className="retro-input w-full p-2 font-mono"
                  >
                    {CONDITIONS.map((cond) => (
                      <option key={cond} value={cond}>{cond}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-mono font-bold uppercase">Price (₹)</label>
                <input
                  type="number"
                  min="0"
                  required
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  className="retro-input w-full p-2 font-mono font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono font-bold uppercase">Description</label>
                <textarea
                  rows={3}
                  required
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="retro-input w-full p-2"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditTarget(null)}
                  disabled={updating}
                  className="retro-btn w-1/2 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="retro-btn retro-btn-primary w-1/2 py-2 font-bold"
                >
                  {updating ? 'Saving...' : 'SAVE CHANGES'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
