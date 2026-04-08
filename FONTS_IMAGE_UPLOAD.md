# Fonts & Image Upload Implementation

## ✅ Font Fixes
### Issue: Fonts were not visible in the frontend
### Solution:
- Added Google Fonts import to `frontend/src/index.css`
- Imported: `Segoe UI` and `Poppins` fonts
- Updated root CSS to use these fonts for all elements
- Added specific font-family declarations for headings (h1-h6)
- All paragraph, span, and div elements now use proper fonts

### Files Updated:
- `frontend/src/index.css` - Added Google Fonts import and font declarations

---

## ✅ Image Upload Feature Implementation
### Solution: Complete image upload functionality for donors

### Backend Changes:

#### 1. **Multer Configuration** (`backend/config/multerConfig.js`)
- Created new file for multer setup
- Configured disk storage for file uploads
- Set file size limit: 5MB
- Allowed file types: jpeg, jpg, png, gif, webp
- Files saved to `backend/uploads/` directory

#### 2. **Donation Model Update** (`backend/src/models/Donation.js`)
- Added `imageUrl` field (String, default: null)
- Stores the path to uploaded image

#### 3. **Donation Controller** (`backend/src/controllers/donationController.js`)
- Updated `createDonation` to handle `req.file`
- Generates image URL path: `/uploads/{filename}`
- Stores URL in database

#### 4. **Donation Routes** (`backend/src/routes/donationRoutes.js`)
- Added `upload.single('image')` middleware to POST route
- Handles single file upload with field name 'image'

#### 5. **Backend Index** (`backend/index.js`)
- Added static file serving for uploads directory
- `app.use("/uploads", express.static(path.join(__dirname, "uploads")))`
- Allows clients to access uploaded images via HTTP

#### 6. **Dependencies** (`backend/package.json`)
- Added `multer ^1.4.5-lts.1` for file handling

#### 7. **.gitignore Updates**
- Added `uploads/` to exclude uploaded files from git
- Added `.gitkeep` file to track empty directory

### Frontend Changes:

#### 1. **AddDonation Component** (`frontend/src/pages/AddDonation.jsx`)
- Added image file input with validation
- File size validation: Max 5MB
- File type validation: Only images (jpeg, jpg, png, gif, webp)
- Real-time image preview display
- Remove image button to clear selection
- FormData API for multipart/form-data submission
- Displays error messages for invalid files

#### 2. **AddDonation CSS** (`frontend/src/pages/AddDonation.css`)
- Styled file input with dashed border
- Image preview container with styling
- Remove image button styling
- Responsive design for mobile devices

#### 3. **ViewDonations Component** (`frontend/src/pages/ViewDonations.jsx`)
- Display donation images in cards
- Shows image above donation title
- Fallback for missing images
- Image serves from `http://localhost:5000/uploads/`

#### 4. **ViewDonations CSS** (`frontend/src/pages/ViewDonations.css`)
- Added `.donation-image` container (200px height)
- Image hover zoom effect
- Image cover fit with proper aspect ratio

#### 5. **MyDonations Component** (`frontend/src/pages/MyDonations.jsx`)
- Added image column to donation table
- Shows thumbnail (70x70px) for each donation
- Placeholder "No Image" for donations without images

#### 6. **MyDonations CSS** (`frontend/src/pages/MyDonations.css`)
- Image cell styling with centered alignment
- Thumbnail styling with border radius
- No-image placeholder styling

#### 7. **DonorDashboard Component** (`frontend/src/pages/DonorDashboard.jsx`)
- Display images in recent donations section
- Images shown alongside donation info and status

#### 8. **DonorDashboard CSS** (`frontend/src/pages/DonorDashboard.css`)
- New `.recent-donations` section styling
- `.donation-item` with flexbox layout
- `.donation-item-image` thumbnail styling (80x80px)
- Hover effects and responsive design

### How to Use:

#### Creating a Donation with Photo:
1. Go to "Add a New Donation" page
2. Fill in item details (name, category, quantity, location)
3. Click "Upload Photo (Optional)" field
4. Select an image file (max 5MB, jpeg/jpg/png/gif/webp)
5. See preview of selected image
6. Click "Submit Donation"

#### Viewing Donations with Photos:
1. **View All Donations**: Browse donations grid with photo thumbnails
2. **My Donations**: Table shows image thumbnails (70x70px) for each donation
3. **Dashboard**: Recent donations display images (80x80px) with status

### API Integration:

#### Request (with image):
```bash
curl -X POST http://localhost:5000/api/donations \
  -H "Authorization: Bearer <token>" \
  -F "title=Book" \
  -F "category=books" \
  -F "quantity=1" \
  -F "location=Library" \
  -F "description=Good condition" \
  -F "image=@/path/to/image.jpg"
```

#### Response:
```json
{
  "success": true,
  "message": "Donation item created successfully",
  "donation": {
    "_id": "...",
    "title": "Book",
    "imageUrl": "/uploads/donation-1712000000000-123456789.jpg",
    ...
  }
}
```

### Directory Structure:
```
backend/
├── uploads/
│   ├── .gitkeep
│   └── donation-*.jpg (generated files)
├── config/
│   └── multerConfig.js (NEW)
├── src/
│   ├── controllers/
│   │   └── donationController.js (UPDATED)
│   ├── models/
│   │   └── Donation.js (UPDATED)
│   └── routes/
│       └── donationRoutes.js (UPDATED)
├── index.js (UPDATED)
└── .gitignore (UPDATED)
```

### Test the Implementation:

1. **Start Backend**: `npm start` in backend folder
2. **Start Frontend**: `npm run dev` in frontend folder
3. **Add Donation with Photo**:
   - Register/Login
   - Go to Add Donation
   - Fill form and upload image
   - Submit
4. **View with Photos**:
   - Check View Donations page
   - Check My Donations table
   - Check Dashboard recent donations

### Features:
✅ Font rendering fixed (Segoe UI, Poppins)
✅ Image upload with validation (size, type)
✅ Image preview before submit
✅ Image storage on server
✅ Image display in all donation views
✅ Thumbnail generation
✅ Error handling for invalid images
✅ Mobile responsive design
✅ Git ignored uploads directory

### Next Steps (Optional):
- Add image cropping/resizing
- Add multiple image upload
- Add image gallery view
- Add image compression
- Add image CDN integration
