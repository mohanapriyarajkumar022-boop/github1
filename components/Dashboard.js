import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [dateRange, setDateRange] = useState({
    fromDate: '01-07-2025',
    toDate: '05-07-2025'
  });
  const [selectedWebsite, setSelectedWebsite] = useState('All Websites');
  const [revenueData, setRevenueData] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user info from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleDateChange = (field, value) => {
    setDateRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleShowRevenue = () => {
    // Simulate loading revenue data
    setRevenueData({
      selectedRange: `${dateRange.fromDate} - ${dateRange.toDate}`,
      duration: '5 days',
      website: selectedWebsite
    });
  };

  const handleLogoutClick = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>CONCEPT</h2>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'Dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('Dashboard')}
          >
            📊 Dashboard
          </button>
          <button 
            className={`nav-item ${activeTab === 'Calendar' ? 'active' : ''}`}
            onClick={() => setActiveTab('Calendar')}
          >
            📅 Calendar
          </button>
          <button 
            className={`nav-item ${activeTab === 'Setting' ? 'active' : ''}`}
            onClick={() => setActiveTab('Setting')}
          >
            ⚙️ setting
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-button" onClick={handleLogoutClick}>
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="dashboard-header">
          <h1>📊 Sales Dashboard</h1>
          <p>Track your website revenue and analyze sales performance</p>
          {user && (
            <div className="user-info">
              Welcome back, {user.username}!
            </div>
          )}
        </header>

        {activeTab === 'Dashboard' && (
          <div className="dashboard-content">
            {/* Filter Options */}
            <div className="filter-section">
              <h3>📅 Filter Options</h3>
              
              <div className="filter-row">
                <div className="filter-group">
                  <label>📅 From Date</label>
                  <input
                    type="text"
                    value={dateRange.fromDate}
                    onChange={(e) => handleDateChange('fromDate', e.target.value)}
                    placeholder="DD-MM-YYYY"
                  />
                </div>
                
                <div className="filter-group">
                  <label>📅 To Date</label>
                  <input
                    type="text"
                    value={dateRange.toDate}
                    onChange={(e) => handleDateChange('toDate', e.target.value)}
                    placeholder="DD-MM-YYYY"
                  />
                </div>
                
                <div className="filter-group">
                  <label>🌐 Select Website</label>
                  <select
                    value={selectedWebsite}
                    onChange={(e) => setSelectedWebsite(e.target.value)}
                  >
                    <option value="All Websites">All Websites</option>
                    <option value="Website 1">Website 1</option>
                    <option value="Website 2">Website 2</option>
                    <option value="Website 3">Website 3</option>
                  </select>
                </div>
                
                <button className="show-revenue-btn" onClick={handleShowRevenue}>
                  📈 Show Revenue
                </button>
              </div>

              {revenueData && (
                <div className="selected-range-info">
                  <div className="range-info">
                    <strong>Selected Range:</strong> {revenueData.selectedRange}
                  </div>
                  <div className="duration-info">
                    <strong>Duration:</strong> {revenueData.duration}
                  </div>
                </div>
              )}
            </div>

            {/* Analytics Section */}
            <div className="analytics-section">
              {revenueData ? (
                <div className="revenue-display">
                  <div className="chart-placeholder">
                    📊
                  </div>
                  <h3>Revenue Analytics</h3>
                  <p>Showing data for {revenueData.selectedRange}</p>
                  <div className="analytics-tabs">
                    <span className="tab">📈 Revenue Analytics</span>
                    <span className="tab">📊 Product Performance</span>
                    <span className="tab">📋 Order Tracking</span>
                  </div>
                </div>
              ) : (
                <div className="ready-to-analyze">
                  <div className="chart-icon">📊</div>
                  <h3>Ready to Analyze Revenue</h3>
                  <p>Select your date range and website, then click "Show Revenue" to view comprehensive sales insights</p>
                  <div className="analytics-tabs">
                    <span className="tab">📈 Revenue Analytics</span>
                    <span className="tab">📊 Product Performance</span>
                    <span className="tab">📋 Order Tracking</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'Calendar' && (
          <div className="calendar-content">
            <h2>📅 Calendar</h2>
            <p>Calendar functionality would be implemented here.</p>
          </div>
        )}

        {activeTab === 'Setting' && (
          <div className="settings-content">
            <h2>⚙️ Settings</h2>
            <p>Application settings would be implemented here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;