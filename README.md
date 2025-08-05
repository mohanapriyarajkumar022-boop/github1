# Sales Dashboard Application

This React application demonstrates the connection between a **Login Page** and a **Sales Dashboard** with authentication flow.

## 🔗 How the Two Pages Are Connected

### Main App Component (`App.js`)
The connection between the Login and Dashboard pages is handled by the main `App.js` component using **React Router** and **authentication state management**.

### Key Connection Features:

#### 1. **Authentication State Management**
```javascript
const [isAuthenticated, setIsAuthenticated] = useState(false);
```
- Tracks whether the user is logged in
- Determines which page to show

#### 2. **Route Protection**
```javascript
<Route 
  path="/login" 
  element={
    isAuthenticated ? 
      <Navigate to="/dashboard" replace /> : 
      <Login onLogin={handleLogin} />
  } 
/>
<Route 
  path="/dashboard" 
  element={
    isAuthenticated ? 
      <Dashboard onLogout={handleLogout} /> : 
      <Navigate to="/login" replace />
  } 
/>
```

#### 3. **Login Handler**
```javascript
const handleLogin = (credentials) => {
  if (credentials.username && credentials.password) {
    // Store authentication token
    localStorage.setItem('authToken', mockToken);
    localStorage.setItem('user', JSON.stringify({
      username: credentials.username,
      loginTime: new Date().toISOString()
    }));
    setIsAuthenticated(true);
    return { success: true };
  }
  return { success: false, error: 'Invalid credentials' };
};
```

#### 4. **Logout Handler**
```javascript
const handleLogout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  setIsAuthenticated(false);
};
```

## 🔄 Authentication Flow

1. **Initial Load**: App checks `localStorage` for existing auth token
2. **Login Process**: 
   - User enters credentials on Login page
   - `handleLogin` validates and stores auth data
   - User is redirected to Dashboard
3. **Dashboard Access**: 
   - Protected route checks authentication
   - Shows Dashboard if authenticated, redirects to Login if not
4. **Logout Process**:
   - User clicks logout in Dashboard
   - `handleLogout` clears auth data
   - User is redirected to Login page

## 📁 File Structure

```
/workspace/
├── App.js                 # Main app with routing and auth logic
├── App.css               # Global styles
├── components/
│   ├── Login.js          # Login page component
│   ├── Login.css         # Login page styles
│   ├── Dashboard.js      # Dashboard component
│   └── Dashboard.css     # Dashboard styles
├── src/
│   └── index.js          # React app entry point
├── public/
│   └── index.html        # HTML template
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## 🚀 How to Run

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm start
   ```

3. **Access the Application**:
   - Open http://localhost:3000
   - You'll be redirected to the login page
   - Enter any username and password to login
   - You'll be redirected to the dashboard

## 🔑 Login Credentials

For testing purposes, any username and password combination will work. The app simulates authentication by checking that both fields are filled.

## 🎨 Features

### Login Page
- Geometric background design
- Form validation
- Password show/hide toggle
- Error handling
- Responsive design

### Dashboard Page
- Sidebar navigation (Dashboard, Calendar, Settings)
- Date range filters
- Website selection
- Revenue analytics simulation
- User welcome message
- Logout functionality
- Responsive design

## 🔧 Technical Details

- **React 18.2.0**
- **React Router DOM 6.8.1** for routing
- **Local Storage** for session persistence
- **CSS3** for styling with responsive design
- **Protected Routes** for authentication
- **State Management** with React hooks