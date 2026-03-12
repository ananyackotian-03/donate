# DaanSetu Frontend - Component Documentation

## Component Overview

This document describes all components and pages used in the DaanSetu frontend application.

---

## 🔧 Reusable Components

### 1. Navbar Component
**Location**: `src/components/Navbar.jsx`

**Features**:
- Fixed top navigation bar
- Logo with emoji icon
- Links to Home, Login, Register
- Responsive mobile-friendly design
- Hover effects on navigation links

**Props**: None

**Usage**:
```jsx
import Navbar from './components/Navbar';
<Navbar />
```

**Styling**: `src/components/Navbar.css`
- Fixed positioning at top
- Blue gradient background
- Yellow register button

---

### 2. Footer Component
**Location**: `src/components/Footer.jsx`

**Features**:
- Platform branding
- Quick links (About, Contact, Privacy, Terms)
- Copyright information with dynamic year
- Responsive layout

**Props**: None

**Usage**:
```jsx
import Footer from './components/Footer';
<Footer />
```

**Styling**: `src/components/Footer.css`
- Dark blue background
- Link hover effects
- Grid layout for responsive design

---

## 📄 Page Components

### 3. Landing Page
**Location**: `src/pages/Landing.jsx`

**Sections**:
1. **Hero Section**
   - Large headline
   - Subtitle text
   - CTA buttons (Get Started, Login)

2. **Features Section**
   - 3-column grid layout
   - Feature cards with icons
   - Descriptions

3. **Call-to-Action Section**
   - Secondary CTA buttons

**Key Props**: None (uses React Router Link for navigation)

**Styling**: `src/pages/Landing.css`
- Gradient backgrounds
- Card hover animations
- Responsive grid layout

---

### 4. Login Page
**Location**: `src/pages/Login.jsx`

**State Management**:
```jsx
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
```

**Form Fields**:
- Email (type: email)
- Password (type: password)

**Features**:
- Centered card layout
- Form validation
- Links to Register and Home
- Smooth transitions

**Styling**: `src/pages/Login.css`
- Centered card design
- Light gray background
- Professional form styling

---

### 5. Register Page
**Location**: `src/pages/Register.jsx`

**State Management**:
```jsx
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [role, setRole] = useState('donor');
```

**Form Fields**:
- Full Name (type: text)
- Email (type: email)
- Password (type: password)
- Role (select: Donor/Organization)

**Features**:
- Role selection dropdown
- Form validation
- Clean card design
- Links to Login and Home

**Styling**: `src/pages/Register.css`
- Similar to Login page
- Green submit button
- Responsive design

---

### 6. DonorDashboard Page
**Location**: `src/pages/DonorDashboard.jsx`

**Components**:
1. Dashboard Header
   - Title and welcome message

2. Dashboard Grid
   - Add Donation card (links to `/add-donation`)
   - View My Donations card (links to `/view-donations`)

3. Statistics Section
   - Total Donations stat card
   - Pending Requests stat card
   - Completed stat card

**Navigation**:
- Links to sub-pages using React Router

**Styling**: `src/pages/DonorDashboard.css`
- Card hover effects
- Grid layout
- Stats cards with accent color

---

### 7. AddDonation Page
**Location**: `src/pages/AddDonation.jsx`

**State Management**:
```jsx
const [itemName, setItemName] = useState('');
const [category, setCategory] = useState('books');
const [quantity, setQuantity] = useState('');
const [location, setLocation] = useState('');
```

**Form Fields**:
- Item Name (text input)
- Category (select dropdown):
  - Books
  - Clothing
  - Electronics
  - Furniture
  - Food & Groceries
  - Medical Supplies
  - Other
- Quantity (number input)
- Pickup Location (text input)
- Item Description (textarea)

**Features**:
- Form validation
- Back button to dashboard
- Professional form layout
- Submit handler with console logging

**Styling**: `src/pages/AddDonation.css`
- Card-based form
- Two-column layout for quantity and location
- Green submit button

---

### 8. ViewDonations Page
**Location**: `src/pages/ViewDonations.jsx`

**Data Structure**:
```jsx
donations = [{
  id: 1,
  itemName: string,
  category: string,
  quantity: number,
  location: string,
  status: 'Active' | 'Requested' | 'Completed',
  dateAdded: string
}]
```

**Features**:
- Grid display of donation cards
- Status badges with color coding
- Donation information display
- Edit and Delete buttons
- Add New Donation button
- Back link to dashboard

**Helper Function**:
```jsx
getStatusColor(status) // Returns CSS class based on status
```

**Styling**: `src/pages/ViewDonations.css`
- Card grid layout
- Color-coded status badges
- Responsive two-column buttons
- Hover effects on cards

---

### 9. OrgDashboard Page
**Location**: `src/pages/OrgDashboard.jsx`

**Components**:
1. Dashboard Header
2. Dashboard Grid
   - Browse Donations card (links to `/browse-donations`)
   - My Requests card (links to `/my-requests`)
3. Statistics Section
   - Items Requested stat
   - Items Received stat
   - Pending stat

**Styling**: `src/pages/OrgDashboard.css`
- Similar structure to Donor Dashboard
- Green accent color
- Statistics with green highlight

---

### 10. AdminDashboard Page
**Location**: `src/pages/AdminDashboard.jsx`

**Components**:
1. Admin Header
2. Admin Grid (3 cards)
   - Approve Organizations (blue)
   - View All Donations (orange)
   - Manage Users (red)
3. Statistics Section (4 stats)
   - Total Users
   - Organizations
   - Total Donations
   - Success Rate

**Styling**: `src/pages/AdminDashboard.css`
- Multi-card layout
- Color-coded cards
- Purple accent for admin theme
- 4-column stats grid

---

## 🎨 UI Patterns

### Card Component Pattern
```jsx
<div className="dashboard-card">
  <div className="card-icon">📝</div>
  <h2>Title</h2>
  <p>Description</p>
  <div className="card-arrow">→</div>
</div>
```

### Form Group Pattern
```jsx
<div className="form-group">
  <label htmlFor="field">Label Text</label>
  <input
    type="text"
    id="field"
    placeholder="Placeholder"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    required
  />
</div>
```

### Statistics Card Pattern
```jsx
<div className="stat-card">
  <div className="stat-number">5</div>
  <div className="stat-label">Label</div>
</div>
```

---

## 🔌 State Management

Current implementation uses React hooks:

- `useState` for local component state
- Props for parent-to-child communication
- React Router for navigation between pages

### Example:
```jsx
const [formData, setFormData] = useState({
  name: '',
  email: '',
  role: 'donor'
});
```

---

## 🚀 Routing Structure

**App.jsx routes**:
```jsx
<Routes>
  <Route path="/" element={<Landing />} />
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />
  <Route path="/donor-dashboard" element={<DonorDashboard />} />
  <Route path="/add-donation" element={<AddDonation />} />
  <Route path="/view-donations" element={<ViewDonations />} />
  <Route path="/org-dashboard" element={<OrgDashboard />} />
  <Route path="/admin-dashboard" element={<AdminDashboard />} />
</Routes>
```

---

## 📱 Responsive Behavior

All components include mobile responsiveness:

### Breakpoints:
- **768px**: Tablet to mobile transition
- **1024px**: Desktop to tablet transition (optional)

### Mobile Optimizations:
- Single column layouts on mobile
- Larger touch targets
- Adjusted font sizes
- Reduced padding/margins

### Example:
```css
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .text {
    font-size: 1rem;
  }
}
```

---

## 🎯 Component Communication

### Between Components:
```jsx
// Parent to Child
<ChildComponent data={data} onChange={handler} />

// Using React Router
<Link to="/page-name">Link Text</Link>
```

### Navigation Examples:
```jsx
// Using React Router Link
import { Link } from 'react-router-dom';
<Link to="/donor-dashboard">Go to Dashboard</Link>

// Programmatic navigation (when backend integration needed)
// Can use useNavigate hook in future
```

---

## 🔧 Common Modifications

### Adding a New Page:
1. Create file in `src/pages/NewPage.jsx`
2. Create CSS file `src/pages/NewPage.css`
3. Import in `App.jsx`
4. Add route to Routes

### Adding Form Fields:
```jsx
const [newField, setNewField] = useState('');

// In form:
<input
  value={newField}
  onChange={(e) => setNewField(e.target.value)}
/>
```

### Changing Colors:
- Edit `src/index.css` for global changes
- Edit component CSS files for component-specific changes

---

## 📊 Component Hierarchy

```
App
├── Navbar
├── main
│   ├── Landing
│   ├── Login
│   ├── Register
│   ├── DonorDashboard
│   ├── AddDonation
│   ├── ViewDonations
│   ├── OrgDashboard
│   └── AdminDashboard
└── Footer
```

---

## ⚙️ Future Enhancements

1. **Component State Management**: Consider Redux or Context API for complex state
2. **API Integration**: Axios for backend communication
3. **Form Validation**: Implement more robust validation
4. **Error Handling**: Add error boundaries and error pages
5. **Loading States**: Add loading spinners during API calls
6. **Authentication**: Implement JWT-based auth
7. **Protected Routes**: Create route guards for authenticated pages

---

## 🧪 Testing Components

### Manual Testing Checklist:
- [ ] Component renders without errors
- [ ] All interactive elements work
- [ ] Responsive design at 375px, 768px, 1440px
- [ ] Forms validate and submit
- [ ] Navigation links work
- [ ] Styling matches design
- [ ] No console errors

---

## 📚 Dependencies Used in Components

- **React**: Core library
- **react-router-dom**: Link component for navigation
- **CSS3**: All styling

---

## 🎓 Best Practices

1. **Always use semantic HTML**: Use proper heading levels, labels with inputs, etc.
2. **Accessible forms**: Include proper labels and ARIA attributes
3. **Responsive first**: Mobile styles, then desktop enhancements
4. **Component reusability**: Create generic components when possible
5. **DRY (Don't Repeat Yourself)**: Extract common patterns to shared components

---

For more details, refer to:
- [FRONTEND_README.md](./FRONTEND_README.md) - Project overview
- [STYLING_GUIDE.md](./STYLING_GUIDE.md) - Design system
- [QUICK_START.md](./QUICK_START.md) - Development setup

