import React, { useState } from 'react';
import { AuthProvider, useAuth } from './components/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { SellItemPage } from './pages/SellItemPage';
import { DashboardPage } from './pages/DashboardPage';

function Navigation({ activePage, setActivePage }) {
  const { user, logout } = useAuth();

  return (
    <header className="app-header">
      <div className="logo-container" onClick={() => setActivePage('marketplace')}>
        <div className="logo-badge">Sync</div>
        <div className="logo-title">UVCE Portal</div>
      </div>

      <nav className="nav-links">
        <button
          className={`nav-item ${activePage === 'marketplace' ? 'active' : ''}`}
          onClick={() => setActivePage('marketplace')}
        >
          Marketplace
        </button>

        {user ? (
          <>
            <button
              className={`nav-item ${activePage === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActivePage('dashboard')}
            >
              Dashboard
            </button>
            <button
              className={`nav-item btn-sell ${activePage === 'sell' ? 'active' : ''}`}
              onClick={() => setActivePage('sell')}
            >
              + Sell Item
            </button>
            <button
              className="nav-item"
              onClick={() => {
                logout();
                setActivePage('login');
              }}
              style={{ color: '#dc2626' }}
            >
              Log Out ({user.name.split(' ')[0]})
            </button>
          </>
        ) : (
          <>
            <button
              className={`nav-item ${activePage === 'login' ? 'active' : ''}`}
              onClick={() => setActivePage('login')}
            >
              Log In
            </button>
            <button
              className={`nav-item ${activePage === 'register' ? 'active' : ''}`}
              onClick={() => setActivePage('register')}
              style={{ fontWeight: 600, color: '#2563eb' }}
            >
              Register
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

function MainLayout() {
  const [activePage, setActivePage] = useState('marketplace');
  const { loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: '#64748b' }}>
        Loading Sync-UVCE Portal...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navigation activePage={activePage} setActivePage={setActivePage} />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {activePage === 'marketplace' && <MarketplacePage onNavigate={setActivePage} />}
        {activePage === 'sell' && <SellItemPage onNavigate={setActivePage} />}
        {activePage === 'dashboard' && <DashboardPage onNavigate={setActivePage} />}
        {activePage === 'login' && <LoginPage onNavigate={setActivePage} />}
        {activePage === 'register' && <RegisterPage onNavigate={setActivePage} />}
      </main>

      <footer className="footer">
        © 2026 Sync-UVCE — University Visvesvaraya College of Engineering Student Portal
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}
