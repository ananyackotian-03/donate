# Donation Module Implementation

## Overview
The donation module has been fully implemented with both backend and frontend functionality. Users can create, view, manage, and track donations.

## Backend Endpoints

### Public Endpoints
- **GET /api/donations** - Get all donations with optional filtering
  - Query params: `category`, `status`
  - Example: `/api/donations?category=books&status=AVAILABLE`
  - Response: `{ success: true, count: n, donations: [...] }`

- **GET /api/donations/:id** - Get a specific donation by ID
  - Response: `{ success: true, donation: {...} }`

### Protected Endpoints (Requires Authentication)

- **POST /api/donations** - Create a new donation
  - Headers: `Authorization: Bearer <token>`
  - Body:
    ```json
    {
      "title": "String (required)",
      "category": "String (required)",
      "quantity": "Number (required, >= 1)",
      "location": "String (required)",
      "description": "String (optional)"
    }
    ```
  - Response: `{ success: true, message: "...", donation: {...} }`

- **GET /api/donations/my-donations** - Get user's own donations
  - Headers: `Authorization: Bearer <token>`
  - Response: `{ success: true, count: n, donations: [...] }`

- **PUT /api/donations/:id** - Update a donation
  - Headers: `Authorization: Bearer <token>`
  - Body: Any fields to update
  - Response: `{ success: true, message: "...", donation: {...} }`

- **DELETE /api/donations/:id** - Delete a donation
  - Headers: `Authorization: Bearer <token>`
  - Response: `{ success: true, message: "..." }`

## Donation Schema

```javascript
{
  _id: ObjectId,
  title: String,                          // Item name
  category: String,                       // books, clothing, electronics, etc.
  quantity: Number,                       // Quantity of items
  location: String,                       // Pickup location
  description: String,                    // Item details
  status: String (enum),                  // AVAILABLE, REQUESTED, CONFIRMED, DONATED
  donorId: ObjectId (ref: User),         // Creator of donation
  createdAt: Date,
  updatedAt: Date
}
```

## Categories
- books
- clothing
- electronics
- furniture
- food
- medical
- other

## Status Values
- **AVAILABLE** - Donation is available for request
- **REQUESTED** - Someone has requested this donation
- **CONFIRMED** - Donation has been confirmed for pickup
- **DONATED** - Donation has been completed

## Frontend Pages

### 1. AddDonation
- **Route:** `/add-donation`
- **Components:** Form to create new donation
- **Features:** 
  - Form validation
  - Category selection
  - Quantity and location input
  - Optional description field
  - Success/error handling

### 2. ViewDonations
- **Route:** `/view-donations`
- **Components:** Browse all available donations
- **Features:**
  - Display all donations in grid layout
  - Filter by category
  - Show donor information
  - View donation details
  - Status badges

### 3. MyDonations
- **Route:** `/my-donations`
- **Components:** Manage user's own donations
- **Features:**
  - Table view of user's donations
  - View, Edit, Delete options
  - Status tracking
  - Pagination-ready

### 4. DonorDashboard
- **Route:** `/donor-dashboard`
- **Components:** Main dashboard for donors
- **Features:**
  - Statistics cards (total, available, requested, completed)
  - Quick action links
  - Recent donations preview
  - Real-time stats

## Setup Instructions

### Backend Setup
1. Ensure MongoDB is running on `mongodb://127.0.0.1:27017/daansetu`
2. Install dependencies: `npm install`
3. Start server: `node index.js`
4. Server runs on `http://localhost:5000`

### Frontend Setup
1. Navigate to frontend directory
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Frontend runs on `http://localhost:5173` (Vite default)

## API Testing with cURL

### CreateDonation
```bash
curl -X POST http://localhost:5000/api/donations \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Python Textbook",
    "category": "books",
    "quantity": 1,
    "location": "Central Library",
    "description": "Good condition, 2nd edition"
  }'
```

### Get All Donations
```bash
curl http://localhost:5000/api/donations
```

### Get My Donations
```bash
curl http://localhost:5000/api/donations/my-donations \
  -H "Authorization: Bearer <token>"
```

### Update Donation
```bash
curl -X PUT http://localhost:5000/api/donations/<id> \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"status": "REQUESTED"}'
```

### Delete Donation
```bash
curl -X DELETE http://localhost:5000/api/donations/<id> \
  -H "Authorization: Bearer <token>"
```

## Features Implemented

✅ Create donations with validation
✅ View all donations with filtering
✅ View user's own donations
✅ Update donation status and details
✅ Delete donations
✅ Authorization & authentication
✅ Responsive design
✅ Error handling
✅ Success notifications
✅ Loading states
✅ Status badges
✅ Category filtering
✅ Donation statistics

## Future Enhancements
- Search functionality
- Advanced filtering (by date, donor rating)
- Donation requests system
- Messaging between donors/requestors
- Donation analytics
- Email notifications
- Image uploads for donations
- Ratings and reviews
- Wishlist functionality
