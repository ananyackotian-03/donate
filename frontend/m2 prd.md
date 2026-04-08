📄 ✅ MODULE 2 (M2) – FINAL PRD (EXECUTION READY)
🔷 Module Name

Organization, Notifications & Analytics Module

🎯 1. OBJECTIVE

To enable:

Organization onboarding and management
Event-driven notification system
Data-driven insights via analytics

👉 This module supports transparency + system usability.

🧩 2. FEATURE BREAKDOWN
🏢 2.1 ORGANIZATION MANAGEMENT
✔ Features
Organization Registration
Organization Verification System
Organization Profile Management
Team Member Management
Organization Dashboard (KPIs)
✔ Functional Requirements
System shall allow organization registration
System shall store:
orgName
email
registrationNumber
description
System shall set default:
verificationStatus = PENDING
System shall allow admin verification:
VERIFIED / REJECTED
System shall associate organization with admin user
System shall allow adding/removing team members
System shall provide dashboard metrics:
totalDonations
totalAmount
activeCampaigns
✔ APIs
POST /api/organizations → Register organization
GET /api/organizations → List organizations
GET /api/organizations/:id → Organization details
GET /api/organizations/:id/dashboard → KPI metrics
🔔 2.2 NOTIFICATION SYSTEM
✔ Features
Event-triggered notifications
In-app notification center
Notification read/unread tracking
Notification preference control (basic)
✔ Trigger Events
Donation created
Donation status updated
Organization verified
Donation request received
✔ Functional Requirements
System shall generate notification on trigger events
System shall store:
userId
message
type
readStatus
System shall allow users to:
view notifications
mark as read
System shall display notifications in reverse chronological order
✔ APIs
GET /api/notifications → Get user notifications
PUT /api/notifications/:id/read → Mark as read
📊 2.3 ANALYTICS & INSIGHTS
✔ Features
Donation statistics aggregation
Organization performance metrics
Visual analytics (charts)
Smart filtering (replaces AI)
✔ Smart Filtering (AI Replacement)

Instead of AI recommendations:

Trending campaigns → sort by collectedAmount
Recent campaigns → sort by createdAt
Category-based filtering → filter by category

👉 Provides intelligent experience without AI complexity

✔ Functional Requirements
System shall aggregate donation data
System shall compute:
total donations count
total funds collected
active campaigns
System shall support filtering:
by category
by status
System shall support sorting:
by popularity (collectedAmount)
by recency (createdAt)
✔ APIs
GET /api/analytics/overview
→ Returns:
totalDonations
totalAmount
activeCampaigns
GET /api/donations?sort=trending
GET /api/donations?sort=recent
GET /api/donations?category=xyz
🗄️ 3. DATABASE DESIGN (M2 ONLY)
📁 Organizations Collection
orgName (String)
email (String, unique)
registrationNumber (String, unique)
verificationStatus (PENDING, VERIFIED, REJECTED)
adminId (ObjectId)
teamMembers (Array)
createdAt
📁 Notifications Collection
userId (ObjectId)
message (String)
type (String)
read (Boolean)
createdAt
⚙️ 4. NON-FUNCTIONAL REQUIREMENTS
API response time < 500ms
Secure access using JWT
Input validation on all endpoints
Rate limiting enabled
Proper error handling
🚫 5. EXCLUDED FEATURES (STRICT)
❌ AI recommendation engine
❌ OpenAI API integration
❌ Real-time WebSockets (optional, not required)
✅ 6. SUCCESS CRITERIA

M2 is complete when:

Organization system fully functional
Notifications working correctly
Analytics dashboard shows accurate data
Filtering & sorting works smoothly
All APIs tested and integrated
