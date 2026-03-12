# DaanSetu Frontend - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- A code editor (VS Code recommended)

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

You should see:
```
  VITE v7.3.1  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Step 3: Open in Browser
Click the link or navigate to `http://localhost:5173/`

## 📖 Available Pages

### Public Pages (No Login Required)
- **Home (Landing)**: `/` - Main landing page
- **Login**: `/login` - User sign-in
- **Register**: `/register` - New user registration

### Protected Pages (Requires Login - Backend Integration)
- **Donor Dashboard**: `/donor-dashboard` - Donor's main area
- **Add Donation**: `/add-donation` - Create new donation
- **View Donations**: `/view-donations` - See all donations
- **Org Dashboard**: `/org-dashboard` - Organization's main area
- **Admin Dashboard**: `/admin-dashboard` - Admin panel

## 🛠️ Common Development Tasks

### Running Development Server
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```
Output will be in the `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

### Running Linter
```bash
npm run lint
```

## 📂 File Organization

```
src/
├── components/          # Reusable components
│   ├── Navbar.jsx       # Navigation bar
│   └── Footer.jsx       # Footer
├── pages/               # Page components
│   ├── Landing.jsx      # Home page
│   ├── Login.jsx        # Login page
│   ├── Register.jsx     # Registration page
│   ├── DonorDashboard.jsx
│   ├── AddDonation.jsx
│   ├── ViewDonations.jsx
│   ├── OrgDashboard.jsx
│   └── AdminDashboard.jsx
├── App.jsx              # Main app component
├── App.css              # Global app styles
├── main.jsx             # Entry point
└── index.css            # Global styles
```

## 🎨 Customizing Styles

### Global Styles
Edit `src/index.css` for app-wide changes (fonts, colors, base elements).

### Component Styles
Each component has its own CSS file:
- `src/components/Navbar.css`
- `src/pages/Landing.css`
- etc.

### Responsive Design
All components use media queries (breakpoint: 768px):
```css
@media (max-width: 768px) {
  /* Mobile styles */
}
```

## 🔗 Navigation

### Adding New Routes
Edit `src/App.jsx`:
```jsx
<Route path="/new-page" element={<NewPage />} />
```

### Creating Navigation Links
```jsx
<Link to="/page-name">Link Text</Link>
```

## 📝 Creating New Pages

### Step 1: Create Component
Create `src/pages/NewPage.jsx`:
```jsx
export default function NewPage() {
  return (
    <div className="page-class">
      {/* Content */}
    </div>
  );
}
```

### Step 2: Create Styles
Create `src/pages/NewPage.css` with responsive design.

### Step 3: Add Route
In `src/App.jsx`, import and add route:
```jsx
import NewPage from "./pages/NewPage";

<Route path="/new-page" element={<NewPage />} />
```

## 🎯 UI Components Available

### Buttons
```jsx
<Link to="/page" className="btn btn-primary">Button</Link>
```

### Cards
```jsx
<div className="card">
  <h3>Title</h3>
  <p>Content</p>
</div>
```

### Forms
```jsx
<div className="form-group">
  <label htmlFor="field">Label</label>
  <input id="field" type="text" />
</div>
```

### Status Badge
```jsx
<span className="status-badge status-active">Active</span>
```

## 🐛 Debugging

### Console Logs
```jsx
console.log('Message:', value);
```

### React DevTools
- Install React DevTools browser extension
- Inspect components and state

### Network Requests
- Open DevTools (F12)
- Go to Network tab
- Make requests and inspect

## 🔌 Backend Integration (When Ready)

### Setup API Calls
Install axios (already included):
```bash
npm install axios
```

### Example API Call
```jsx
import axios from 'axios';

const response = await axios.post('/api/endpoint', data);
```

### Environment Variables
Create `.env` file:
```
VITE_API_URL=http://localhost:5000/api
```

Access in components:
```jsx
const apiUrl = import.meta.env.VITE_API_URL;
```

## 📦 Dependencies

Main packages in `package.json`:
- **react**: UI library
- **react-dom**: DOM rendering
- **react-router-dom**: Client-side routing
- **axios**: HTTP client
- **vite**: Build tool

## 🎨 Color Reference

```
Primary Blue: #2563eb
Dark Blue: #1e40af
Success Green: #10b981
Warning Yellow: #fbbf24
Text: #1f2937
Light Gray: #f3f4f6
```

## 📱 Responsive Testing

### Chrome DevTools
1. Press `F12`
2. Click device icon (top-left)
3. Select device or use custom dimensions

### Test Sizes
- Mobile: 375px
- Tablet: 768px
- Desktop: 1440px

## ⚙️ Performance Tips

1. **Lazy Loading Routes** (for future optimization)
2. **Optimize Images**: Use appropriate formats
3. **Code Splitting**: Import components as needed
4. **Minimize Bundle**: Vite handles this automatically

## 🚨 Common Issues

### Port Already in Use
```bash
# Kill process on port 5173
# macOS/Linux
lsof -ti:5173 | xargs kill -9

# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Module Not Found
- Ensure import path is correct
- Check file exists in location
- Reload dev server: `npm run dev`

### Styling Not Applied
- Check CSS file is imported
- Verify class name matches
- Clear browser cache

## 🔍 Code Quality

### ESLint
Run linter to check code quality:
```bash
npm run lint
```

## 📚 Resources

- [React Docs](https://react.dev)
- [React Router Docs](https://reactrouter.com)
- [Vite Docs](https://vitejs.dev)
- [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS)

## ✅ Deployment Checklist

- [ ] Build completes without errors: `npm run build`
- [ ] All pages load correctly
- [ ] Responsive design tested on mobile/tablet
- [ ] Forms work and validate
- [ ] Navigation works on all pages
- [ ] No console errors
- [ ] All images and assets load
- [ ] Page load time acceptable

## 🆘 Need Help?

1. Check console for errors (F12)
2. Verify file paths and imports
3. Check styling guide for component examples
4. Review README for project structure

---

Happy coding! 🚀
