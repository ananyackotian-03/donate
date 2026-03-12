# DaanSetu - Donation Platform Frontend

A modern, responsive React-based frontend for a comprehensive donation platform that connects generous donors with organizations in need. Built with **React**, **Vite**, **React Router**, and **CSS3**.

## 🎯 Overview

DaanSetu (दान सेतु - "Donation Bridge") is designed to reduce waste and help communities by facilitating donations. The platform enables:

- **Donors** to post items they wish to donate
- **Organizations** to browse available donations and request items
- **Admins** to manage the platform, approve organizations, and monitor donations

## ✨ Features

### 1. **Landing Page**
- Eye-catching hero section with call-to-action buttons
- Features showcase highlighting the platform's benefits
- Responsive design for all devices
- Direct navigation to Login and Register pages

### 2. **Authentication**
- **Login Page**: Email and password-based sign-in
- **Register Page**: New user registration with role selection (Donor/Organization)
- Clean, modern card-based design
- Form validation and user feedback

### 3. **Donor Dashboard**
- Quick access to donation management features
- View statistics (Total donations, Pending requests, Completed)
- Navigate to Add Donation and View Donations pages

### 4. **Add Donation Page**
- Form to post new donation items
- Fields: Item Name, Category, Quantity, Pickup Location, Description
- Category dropdown with options: Books, Clothing, Electronics, Furniture, Food, Medical Supplies, Other
- Professional form styling with validation

### 5. **View Donations Page**
- Grid display of all user donations
- Donation cards showing: Item name, Category, Quantity, Location, Date, Status
- Status badges: Active, Requested, Completed
- Edit and Delete options for each donation
- Quick access to add new donations

### 6. **Organization Dashboard**
- Browse available donations
- Track and manage donation requests
- View statistics on items requested, received, and pending

### 7. **Admin Dashboard**
- Approve Organizations
- View all donations on the platform
- Manage users and their permissions
- Platform statistics: Total users, Organizations, Donations, Success rate
- Color-coded cards for different admin functions

### 8. **Navbar Component**
- Fixed navigation bar with logo and links
- Responsive design with mobile support
- Quick navigation to Home, Login, Register
- Professional styling with gradient background

### 9. **Footer Component**
- Platform information and links
- Copyright information
- Links to About, Contact, Privacy, and Terms

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.3.1
- **Routing**: React Router DOM 7.13.1
- **Styling**: CSS3 (with responsive design)
- **HTTP Client**: Axios 1.13.6

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Navbar.css
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── Landing.css
│   │   ├── Login.jsx
│   │   ├── Login.css
│   │   ├── Register.jsx
│   │   ├── Register.css
│   │   ├── DonorDashboard.jsx
│   │   ├── DonorDashboard.css
│   │   ├── AddDonation.jsx
│   │   ├── AddDonation.css
│   │   ├── ViewDonations.jsx
│   │   ├── ViewDonations.css
│   │   ├── OrgDashboard.jsx
│   │   ├── OrgDashboard.css
│   │   ├── AdminDashboard.jsx
│   │   └── AdminDashboard.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   ├── index.css
│   └── assets/
├── public/
├── package.json
├── vite.config.js
├── eslint.config.js
└── index.html
```

## 🚀 Getting Started

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

### Running the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port).

### Building for Production

```bash
npm run build
```

The optimized build will be created in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#2563eb` (Links, Primary buttons, Headers)
- **Dark Blue**: `#1e40af` (Hover states, Accents)
- **Success Green**: `#10b981` (Positive actions)
- **Warning Yellow**: `#fbbf24` (Highlights)
- **Gray**: `#6b7280` (Text, Secondary content)
- **Light Gray**: `#f3f4f6` (Backgrounds)

### Typography
- **Font Family**: System fonts for optimal performance
- **Headings**: Bold, larger sizes for hierarchy
- **Body Text**: Regular weight, optimized for readability
- **Line Height**: 1.5-1.8 for comfortable reading

### Components
- **Cards**: Rounded corners (15px), subtle shadows, hover effects
- **Buttons**: Rounded (25-30px), gradient backgrounds, smooth transitions
- **Forms**: Clean inputs with focus states, validation feedback
- **Responsive**: Mobile-first design, breakpoint at 768px

## 📱 Responsive Design

The application is fully responsive with optimizations for:

- **Desktop**: Full layout with multi-column grids
- **Tablet**: Adjusted layouts (768px breakpoint)
- **Mobile**: Single-column layouts, touch-friendly elements

### Key Responsive Features
- Flexible grid layouts using CSS Grid with `auto-fit` and `minmax()`
- Media queries for responsive typography and spacing
- Touch-friendly button and form element sizing
- Mobile-optimized navigation and menu

## 🔄 Navigation Routes

```
/                    → Landing Page
/login              → Login Page
/register           → Register Page
/donor-dashboard    → Donor Dashboard
/add-donation       → Add Donation Form
/view-donations     → View My Donations
/org-dashboard      → Organization Dashboard
/admin-dashboard    → Admin Dashboard
```

## 🎯 Key Features Breakdown

### 1. **Gradient Backgrounds**
- Modern gradient effects on hero sections and cards
- Smooth transitions for visual appeal

### 2. **Interactive Elements**
- Hover effects on cards with lift animation
- Smooth transitions on all interactive elements
- Status badges with color coding

### 3. **Form Handling**
- Comprehensive form inputs with validation
- Clear error states and feedback
- User-friendly placeholders and labels

### 4. **Statistics & Analytics**
- Dashboard stat cards showing key metrics
- Color-coded information for quick scanning

### 5. **Professional Styling**
- Consistent spacing and typography
- Proper contrast for accessibility
- Modern box shadows and borders

## 🌟 Highlights

✅ **Clean Code**: Well-organized, maintainable component structure
✅ **Modern UI/UX**: Professional design with smooth animations
✅ **Fully Responsive**: Works seamlessly on all devices
✅ **Accessible**: Proper semantic HTML and ARIA labels
✅ **Performance**: Optimized with Vite for fast load times
✅ **Extensible**: Easy to integrate with backend APIs

## 📝 CSS Modules & Styling

Each page/component has its own CSS file with:
- Mobile-first responsive design
- Consistent use of CSS Grid and Flexbox
- Smooth transitions and animations
- Professional color scheme

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Code Quality

- ESLint configured for code consistency
- React plugins for best practices
- Clean component structure

## 📦 Build Output

The production build is optimized and generates:
- Minified CSS (20.28 kB gzipped)
- Minified JavaScript (246.24 kB gzipped)
- Optimized HTML
- Asset files

## 🚀 Future Enhancements

- Backend API integration
- User authentication system
- Real-time notifications
- Image upload for donations
- Search and filter functionality
- User reviews and ratings
- Advanced analytics dashboard

## 📄 License

This project is created for educational purposes as a college project demonstration.

## 👥 Contributing

This is a demonstration project. For questions or suggestions, please reach out to the development team.

---

**Built with ❤️ for a better donation ecosystem**
