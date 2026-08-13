import React, { useState } from 'react';
import { createMarketplaceItem } from '../api/marketplace';
import { useAuth } from '../components/AuthContext';

export function SellItemPage({ onNavigate }) {
  const { token } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [pricingType, setPricingType] = useState('Fixed Price');
  const [category, setCategory] = useState('books');
  const [imagePath, setImagePath] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || price === '' || !category) {
      setError('Please fill in the title, price, and category');
      return;
    }

    setLoading(true);
    try {
      await createMarketplaceItem(
        {
          title: title.trim(),
          description: description.trim() || null,
          price: Number(price),
          pricing_type: pricingType,
          category,
          image_path: imagePath.trim() || null,
        },
        token
      );
      onNavigate('marketplace');
    } catch (err) {
      setError(err.message || 'Failed to list item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content" style={{ maxWidth: '600px' }}>
      <div style={{ marginBottom: '24px' }}>
        <button
          onClick={() => onNavigate('marketplace')}
          style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontSize: '14px', fontWeight: 600, padding: 0, marginBottom: '12px' }}
        >
          ← Back to Marketplace
        </button>
        <h1 className="marketplace-title">List an Item for Sale</h1>
        <p className="marketplace-subtitle">List textbooks, calculators, lab kit, or electronics for UVCE peers.</p>
      </div>

      {error && <div className="alert-error">{error}</div>}

      <form onSubmit={handleSubmit} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px' }}>
        <div className="form-group">
          <label className="form-label">Item Title *</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. Higher Engineering Mathematics by B.S. Grewal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Category *</label>
          <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="books">Textbooks & Notes</option>
            <option value="calculator">Scientific Calculators</option>
            <option value="equipment">Lab Equipment & Lab Coats</option>
            <option value="electronics">Electronics & Accessories</option>
            <option value="other">Other Campus Essentials</option>
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label">Price (₹) *</label>
            <input
              type="number"
              min="0"
              className="form-input"
              placeholder="350"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Pricing Type</label>
            <select className="form-select" value={pricingType} onChange={(e) => setPricingType(e.target.value)}>
              <option value="Fixed Price">Fixed Price</option>
              <option value="Negotiable">Negotiable</option>
              <option value="Free / Donate">Free / Donate</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            className="form-textarea"
            rows={4}
            placeholder="Provide details on condition, edition, semester relevance, or pick-up location on campus..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Image URL (Optional)</label>
          <input
            type="url"
            className="form-input"
            placeholder="https://images.unsplash.com/photo-..."
            value={imagePath}
            onChange={(e) => setImagePath(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Posting Listing...' : 'Publish Listing'}
        </button>
      </form>
    </div>
  );
}
