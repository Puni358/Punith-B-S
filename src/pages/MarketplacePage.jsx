import React, { useState, useEffect } from 'react';
import { getMarketplaceItems, deleteMarketplaceItem, extendMarketplaceItemExpiry } from '../api/marketplace';
import { useAuth } from '../components/AuthContext';

export function MarketplacePage({ onNavigate }) {
  const { user, token } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [actionMessage, setActionMessage] = useState('');

  const loadItems = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getMarketplaceItems({ category, search });
      setItems(data);
    } catch (err) {
      setError(err.message || 'Failed to load marketplace items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, [category, search]);

  const handleDelete = async (id) => {
    if (!token) return;
    if (!window.confirm('Are you sure you want to delete this listing?')) return;

    try {
      await deleteMarketplaceItem(id, token);
      setActionMessage('Item deleted successfully.');
      loadItems();
    } catch (err) {
      alert(err.message || 'Failed to delete item');
    }
  };

  const handleExtend = async (id) => {
    if (!token) return;

    try {
      await extendMarketplaceItemExpiry(id, token);
      setActionMessage('Listing extended by 5 days!');
      loadItems();
    } catch (err) {
      alert(err.message || 'Failed to extend listing');
    }
  };

  return (
    <div className="main-content">
      <div className="marketplace-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="marketplace-title">Student Marketplace</h1>
          <p className="marketplace-subtitle">Buy, sell, or trade textbooks, lab gear, and calculators with fellow UVCE students.</p>
        </div>
        {user && (
          <button className="btn-primary btn-sell" style={{ width: 'auto', marginTop: 0 }} onClick={() => onNavigate('sell')}>
            + List an Item
          </button>
        )}
      </div>

      {actionMessage && <div className="alert-success" style={{ marginBottom: '20px' }}>{actionMessage}</div>}
      {error && <div className="alert-error" style={{ marginBottom: '20px' }}>{error}</div>}

      <div className="filter-bar">
        <input
          type="text"
          className="form-input search-input"
          placeholder="Search items by title or keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="form-select category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="books">Textbooks</option>
          <option value="calculator">Calculators</option>
          <option value="equipment">Lab Equipment</option>
          <option value="electronics">Electronics</option>
          <option value="other">Other</option>
        </select>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#64748b' }}>Loading marketplace listings...</div>
      ) : items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#64748b', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h3>No marketplace items found</h3>
          <p style={{ marginTop: '8px', fontSize: '14px' }}>Try adjusting your search or category filter.</p>
        </div>
      ) : (
        <div className="items-grid">
          {items.map((item) => (
            <div key={item.id} className="item-card">
              {item.image || item.image_path ? (
                <img src={item.image || item.image_path} alt={item.title} className="item-image" />
              ) : (
                <div className="item-image" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '14px' }}>
                  No Image Provided
                </div>
              )}
              <div className="item-body">
                <span className="item-category">{item.category}</span>
                <h3 className="item-title">{item.title}</h3>
                <p className="item-desc">{item.description || 'No description provided.'}</p>
                
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px' }}>
                  Seller: <strong>{item.sellerName || item.seller_name || 'UVCE Student'}</strong>
                </div>

                <div className="item-footer">
                  <div>
                    <div className="item-price">₹{item.price}</div>
                    <div className="item-type">{item.pricingType || item.pricing_type}</div>
                  </div>

                  {user && user.id === item.seller_id ? (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleExtend(item.id)}
                        style={{ padding: '4px 8px', fontSize: '12px', background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', borderRadius: '4px', cursor: 'pointer' }}
                        title="Extend validity by 5 days"
                      >
                        Extend
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        style={{ padding: '4px 8px', fontSize: '12px', background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => alert(`Contact seller at student portal support or via email.`)}
                      style={{ padding: '6px 12px', fontSize: '13px', background: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
                    >
                      Interested
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
