import React from 'react';
import { useAuth } from '../components/AuthContext';

export function DashboardPage({ onNavigate }) {
  const { user } = useAuth();

  return (
    <div className="main-content">
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '32px', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#0f172a' }}>
          Welcome back, {user ? user.name : 'UVCE Student'} 👋
        </h1>
        <p style={{ color: '#475569', marginTop: '6px', fontSize: '15px' }}>
          University Visvesvaraya College of Engineering (UVCE) — Student Portal
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '24px' }}>
          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '16px', borderRadius: '12px' }}>
            <div style={{ fontSize: '13px', color: '#2563eb', fontWeight: 600 }}>ACCOUNT STATUS</div>
            <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: '#1e3a8a' }}>
              {user?.is_verified ? 'Verified Student ✓' : 'Pending Verification'}
            </div>
            <div style={{ fontSize: '13px', color: '#475569', marginTop: '4px' }}>{user?.email}</div>
          </div>

          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '16px', borderRadius: '12px' }}>
            <div style={{ fontSize: '13px', color: '#166534', fontWeight: 600 }}>ROLE</div>
            <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: '#14532d', textTransform: 'capitalize' }}>
              {user?.role || 'Student'}
            </div>
            <div style={{ fontSize: '13px', color: '#475569', marginTop: '4px' }}>Active UVCE Peer</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#0f172a' }}>Marketplace Quick Links</h3>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '6px' }}>
            Buy and sell secondhand textbooks, lab supplies, and scientific calculators.
          </p>
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button
              onClick={() => onNavigate('marketplace')}
              className="btn-primary"
              style={{ flex: 1 }}
            >
              Browse Items
            </button>
            <button
              onClick={() => onNavigate('sell')}
              className="btn-primary btn-sell"
              style={{ flex: 1 }}
            >
              Sell an Item
            </button>
          </div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#0f172a' }}>Campus Announcements</h3>
          <ul style={{ marginTop: '12px', listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '8px 0', borderBottom: '1px solid #f1f5f9', fontSize: '14px', color: '#334155' }}>
              📢 <strong>UVCE Library Notice:</strong> Return 3rd Semester reference books by Friday.
            </li>
            <li style={{ padding: '8px 0', borderBottom: '1px solid #f1f5f9', fontSize: '14px', color: '#334155' }}>
              🔬 <strong>Chemistry Lab:</strong> Lab coat mandatory for 1st-year practical exams.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
