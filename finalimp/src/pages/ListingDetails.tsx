import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchListingById, deleteListing } from '../services/listingService';
import { Listing } from '../types';
import { useAuth } from '../context/AuthContext';
import { Loading } from '../components/Loading';
import { 
  Calendar, 
  Tag, 
  User, 
  ArrowLeft, 
  MessageSquare, 
  Trash2, 
  Edit3, 
  Info,
  ShieldCheck,
  Share2,
  Check
} from 'lucide-react';

export const ListingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [contactNoticeOpen, setContactNoticeOpen] = useState<boolean>(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const loadItem = async () => {
      if (!id) return;
      try {
        const item = await fetchListingById(id);
        if (isMounted) {
          setListing(item);
        }
      } catch (err) {
        console.error('Failed to load listing', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadItem();
    return () => { isMounted = false; };
  }, [id]);

  if (loading) {
    return <Loading message="Loading listing details..." />;
  }

  if (!listing) {
    return (
      <div className="retro-card p-12 text-center bg-[#F7F3EF] space-y-4 max-w-md mx-auto my-12">
        <h2 className="font-mono font-bold text-xl text-[#1A1A1A]">
          Listing Not Found
        </h2>
        <p className="font-sans text-xs text-[#555555]">
          The item you are looking for may have been removed or deleted by the seller.
        </p>
        <Link to="/browse" className="retro-btn retro-btn-primary px-4 py-2 text-xs inline-block">
          &larr; Back to Marketplace
        </Link>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(listing.price);

  const dateFormatted = new Date(listing.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const isOwner = user && user.uid === listing.sellerId;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDelete = async () => {
    if (!user || !listing || !id) return;
    setDeleting(true);
    try {
      await deleteListing(id, user.uid);
      navigate('/my-listings');
    } catch (err) {
      console.error('Delete failed', err);
      alert('Failed to delete listing');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Back Button */}
      <div>
        <Link
          to="/browse"
          className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#1A1A1A] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Marketplace
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: Image Gallery */}
        <div className="md:col-span-7 space-y-3">
          <div className="retro-card aspect-[4/3] bg-[#EFE9E3] overflow-hidden relative">
            <img
              src={listing.images[selectedImageIndex] || listing.images[0]}
              alt={listing.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=800';
              }}
            />
            <div className="absolute top-3 left-3 bg-[#C9B59C] border border-[#1A1A1A] px-2.5 py-1 font-mono text-xs font-bold shadow-[2px_2px_0_#1A1A1A]">
              Condition: {listing.condition}
            </div>
          </div>

          {/* Additional Image Thumbnails if available */}
          {listing.images && listing.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {listing.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-16 h-16 border-2 overflow-hidden flex-shrink-0 transition-all ${
                    selectedImageIndex === idx 
                      ? 'border-[#1A1A1A] shadow-[2px_2px_0_#C9B59C]' 
                      : 'border-[#1A1A1A]/40 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Information & Actions */}
        <div className="md:col-span-5 space-y-6">
          <div className="retro-card p-6 bg-[#F7F3EF] space-y-4">
            {/* Category */}
            <div className="inline-block bg-[#D9CFC7] border border-[#1A1A1A] px-2.5 py-0.5 font-mono text-xs font-bold uppercase shadow-[2px_2px_0_#1A1A1A]">
              {listing.category}
            </div>

            {/* Title */}
            <h1 className="font-mono text-2xl font-black text-[#1A1A1A] leading-snug">
              {listing.title}
            </h1>

            {/* Price */}
            <div className="font-mono text-3xl font-extrabold text-[#1A1A1A]">
              {formattedPrice}
            </div>

            <div className="border-t border-[#1A1A1A] pt-4 space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs text-[#555555]">
                <Calendar className="w-3.5 h-3.5" />
                Posted on {dateFormatted}
              </div>
            </div>

            {/* Seller Card */}
            <div className="p-3 bg-[#EFE9E3] border-2 border-[#1A1A1A] flex items-center justify-between gap-3 shadow-[2px_2px_0_#1A1A1A]">
              <div className="flex items-center gap-3">
                <img
                  src={listing.sellerPhotoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(listing.sellerName)}&background=1A1A1A&color=F7F3EF`}
                  alt={listing.sellerName}
                  className="w-10 h-10 border border-[#1A1A1A] object-cover"
                />
                <div>
                  <div className="font-mono text-[11px] uppercase font-bold text-[#666666]">
                    Seller
                  </div>
                  <div className="font-sans font-bold text-sm text-[#1A1A1A]">
                    {listing.sellerName}
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-1 font-mono text-[10px] bg-[#C9B59C] px-2 py-0.5 border border-[#1A1A1A]">
                <ShieldCheck className="w-3 h-3" />
                Student
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-3">
              {isOwner ? (
                <div className="space-y-2">
                  <div className="p-2 bg-[#FFF8E7] border border-[#1A1A1A] font-mono text-xs font-bold text-[#1A1A1A]">
                    ★ This is your listing
                  </div>
                  <button
                    onClick={() => setDeleteConfirmOpen(true)}
                    className="retro-btn w-full py-2.5 text-xs bg-[#FFEDED] text-[#990000] flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Listing
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setContactNoticeOpen(true)}
                  id="contact-seller-btn"
                  className="retro-btn retro-btn-primary w-full py-3 text-sm flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  CONTACT SELLER
                </button>
              )}

              <button
                onClick={handleShare}
                className="retro-btn w-full py-2 text-xs flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-700" />
                    Link Copied!
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    Share Listing
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Item Description Section */}
      <div className="retro-card p-6 sm:p-8 bg-[#F7F3EF] space-y-4">
        <h3 className="font-mono text-lg font-bold uppercase text-[#1A1A1A] border-b-2 border-[#1A1A1A] pb-2">
          Item Description
        </h3>
        <p className="font-sans text-sm sm:text-base text-[#1A1A1A] whitespace-pre-line leading-relaxed">
          {listing.description}
        </p>
      </div>

      {/* Contact Seller Placeholder Modal */}
      {contactNoticeOpen && (
        <div className="fixed inset-0 z-50 bg-[#1A1A1A]/60 flex items-center justify-center p-4">
          <div className="retro-card p-6 bg-[#F7F3EF] max-w-sm w-full space-y-4 animate-in fade-in">
            <div className="w-10 h-10 bg-[#C9B59C] border-2 border-[#1A1A1A] flex items-center justify-center mx-auto shadow-[2px_2px_0_#1A1A1A]">
              <MessageSquare className="w-5 h-5 text-[#1A1A1A]" />
            </div>

            <div className="text-center space-y-2">
              <h4 className="font-mono font-bold text-base text-[#1A1A1A] uppercase">
                Contact Seller
              </h4>
              <p className="font-sans text-xs text-[#333333] leading-relaxed">
                Direct in-app messaging between students will be available in a future version.
              </p>
              <div className="p-3 bg-[#EFE9E3] border border-[#1A1A1A] font-mono text-xs text-[#1A1A1A]">
                Seller: <strong>{listing.sellerName}</strong>
              </div>
            </div>

            <button
              onClick={() => setContactNoticeOpen(false)}
              className="retro-btn retro-btn-primary w-full py-2 text-xs"
            >
              GOT IT
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-[#1A1A1A]/60 flex items-center justify-center p-4">
          <div className="retro-card p-6 bg-[#F7F3EF] max-w-sm w-full space-y-4">
            <div className="w-10 h-10 bg-[#FFEDED] border-2 border-[#1A1A1A] flex items-center justify-center mx-auto shadow-[2px_2px_0_#990000]">
              <Trash2 className="w-5 h-5 text-[#990000]" />
            </div>

            <div className="text-center space-y-2">
              <h4 className="font-mono font-bold text-base text-[#1A1A1A] uppercase">
                Confirm Deletion
              </h4>
              <p className="font-sans text-xs text-[#333333]">
                Are you sure you want to delete <strong>"{listing.title}"</strong>? This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setDeleteConfirmOpen(false)}
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
    </div>
  );
};
