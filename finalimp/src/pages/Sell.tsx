import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createListing } from '../services/listingService';
import { ListingCategory, ListingCondition, ListingFormData } from '../types';
import { PlusCircle, Upload, X, AlertCircle, CheckCircle2, Loader2, ImagePlus } from 'lucide-react';

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

export const Sell: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ListingCategory>('Books');
  const [price, setPrice] = useState<string>('');
  const [condition, setCondition] = useState<ListingCondition>('Good');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<(File | string)[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles: File[] = Array.from(e.target.files);
      const newImages = [...images, ...selectedFiles];
      setImages(newImages);

      // Create previews
      const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!user) {
      setError('You must be logged in to create a listing.');
      return;
    }

    if (!title.trim()) {
      setError('Item title is required.');
      return;
    }

    if (!price || Number(price) <= 0) {
      setError('Please specify a valid price.');
      return;
    }

    if (!description.trim()) {
      setError('Item description is required.');
      return;
    }

    setSubmitting(true);
    try {
      const formData: ListingFormData = {
        title: title.trim(),
        description: description.trim(),
        price: Number(price),
        category,
        condition,
        images,
      };

      const newListing = await createListing(formData, {
        uid: user.uid,
        name: user.name,
        photoURL: user.photoURL,
      });

      setSuccessMsg('Listing created successfully! Redirecting to marketplace...');
      setTimeout(() => {
        navigate(`/listing/${newListing.id}`);
      }, 700);
    } catch (err: any) {
      setError(err.message || 'Failed to create listing. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6 space-y-6 pb-12">
      <div className="retro-card p-6 sm:p-8 bg-[#F7F3EF] space-y-6">
        <div className="border-b-2 border-[#1A1A1A] pb-4">
          <div className="inline-flex items-center gap-2 bg-[#C9B59C] border border-[#1A1A1A] px-2.5 py-1 font-mono text-xs font-bold uppercase mb-2 shadow-[2px_2px_0_#1A1A1A]">
            <PlusCircle className="w-3.5 h-3.5" />
            New Listing
          </div>
          <h1 className="font-mono text-2xl sm:text-3xl font-black text-[#1A1A1A] uppercase tracking-wide">
            SELL AN ITEM
          </h1>
          <p className="font-sans text-xs text-[#555555] mt-1">
            List an item for sale to fellow students on campus.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-[#FFEDED] border-2 border-[#1A1A1A] flex items-start gap-2.5 text-xs font-mono text-[#990000] shadow-[2px_2px_0_#1A1A1A]">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div className="flex-1 font-sans font-semibold">{error}</div>
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-[#EFFFF2] border-2 border-[#1A1A1A] flex items-start gap-2.5 text-xs font-mono text-[#006622] shadow-[2px_2px_0_#1A1A1A]">
            <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div className="flex-1 font-sans font-semibold">{successMsg}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 font-sans">
          {/* Item Title */}
          <div className="space-y-1.5">
            <label className="block font-mono text-xs font-bold uppercase text-[#1A1A1A]" htmlFor="sell-title">
              Item Title *
            </label>
            <input
              id="sell-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Engineering Mathematics 10th Ed"
              className="retro-input w-full px-3.5 py-2.5 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category */}
            <div className="space-y-1.5">
              <label className="block font-mono text-xs font-bold uppercase text-[#1A1A1A]" htmlFor="sell-category">
                Category *
              </label>
              <select
                id="sell-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as ListingCategory)}
                className="retro-input w-full px-3.5 py-2.5 text-sm font-mono cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Condition */}
            <div className="space-y-1.5">
              <label className="block font-mono text-xs font-bold uppercase text-[#1A1A1A]" htmlFor="sell-condition">
                Condition *
              </label>
              <select
                id="sell-condition"
                value={condition}
                onChange={(e) => setCondition(e.target.value as ListingCondition)}
                className="retro-input w-full px-3.5 py-2.5 text-sm font-mono cursor-pointer"
              >
                {CONDITIONS.map((cond) => (
                  <option key={cond} value={cond}>
                    {cond}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price */}
          <div className="space-y-1.5">
            <label className="block font-mono text-xs font-bold uppercase text-[#1A1A1A]" htmlFor="sell-price">
              Price (₹) *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 font-mono font-bold text-sm text-[#1A1A1A]">
                ₹
              </span>
              <input
                id="sell-price"
                type="number"
                min="0"
                step="1"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="350"
                className="retro-input w-full px-3.5 py-2.5 text-sm pl-8 font-mono font-bold"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block font-mono text-xs font-bold uppercase text-[#1A1A1A]" htmlFor="sell-description">
              Description *
            </label>
            <textarea
              id="sell-description"
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Include details about the condition, edition, usage, or pickup location on campus..."
              className="retro-input w-full px-3.5 py-2.5 text-sm leading-relaxed"
            />
          </div>

          {/* Upload Photos */}
          <div className="space-y-2">
            <label className="block font-mono text-xs font-bold uppercase text-[#1A1A1A]">
              Upload Photos
            </label>

            <div className="border-2 border-dashed border-[#1A1A1A] p-6 text-center bg-[#EFE9E3] space-y-3 relative hover:bg-[#D9CFC7] transition-colors">
              <ImagePlus className="w-8 h-8 text-[#1A1A1A] mx-auto" />
              <div className="font-mono text-xs font-bold text-[#1A1A1A]">
                Click or drag photos here to attach
              </div>
              <p className="font-sans text-[11px] text-[#666666]">
                Upload clean photos of your item (PNG, JPG, WEBP)
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                id="sell-image-upload-input"
              />
            </div>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 pt-2">
                {imagePreviews.map((previewUrl, idx) => (
                  <div key={idx} className="relative aspect-square border-2 border-[#1A1A1A] bg-[#EFE9E3] overflow-hidden group">
                    <img src={previewUrl} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 bg-[#990000] text-white p-1 border border-[#1A1A1A] shadow-[1px_1px_0_#1A1A1A] hover:bg-black"
                      title="Remove image"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-[#1A1A1A]">
            <button
              type="submit"
              disabled={submitting}
              id="sell-create-listing-btn"
              className="retro-btn retro-btn-primary w-full py-3.5 text-sm uppercase font-bold flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating Listing...
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" />
                  CREATE LISTING
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
