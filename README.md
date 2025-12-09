 ###  🍽️ Food Book — Full-Stack Food Review & Restaurant Listing Platform

Food Book is a modern full-stack web application for exploring dishes, restaurants, premium content, posting reviews, rating/voting, and managing content through powerful user and admin dashboards.

The project includes authentication, role-based access, premium subscription, restaurant management, CRUD operations, and secure API integration with clean UI using Next.js + Tailwind.

### 🔗 🔵 Live Deployments & Resources
Type	                           Link
Frontend Deployment:  	https://latest-food-display.vercel.app

Backend Deployment: 	https://latest-food-backend.vercel.app

Client GitHub Repository:	https://github.com/azir9200/latest_food_display

Server GitHub Repository:	https://github.com/azir9200/latest_food_backend

Video Explanation (YouTube):	https://youtu.be/8p3lqtS2BKk

### Admin Test Credentials (for Examiner / Recruiter)

Use these credentials to test Admin Dashboard:

Email: admin99@gmail.com
Password: 123456

### Project Overview

## Food Book is a platform where:

=> Users can browse dishes, restaurants, and categories

=> Users can post food items with images and descriptions

=> Users can rate, vote, and comment

=> Premium users get access to locked premium content

=> Admin can manage users, posts, categories, and restaurants

=>  Payment gateway helps users upgrade to premium

=> Full soft delete system implemented

### 🧩 Main Features
   ## User Features

✔ Browse all posts
✔ View categories
✔ View restaurants
✔ Comment, vote, and rate posts
✔ User dashboard
✔ Update profile
✔ Soft delete account

###  💎 Premium Features

✔ Access premium-only posts
✔ Premium dashboard
✔ After payment, auto premium upgrade

##  🛠️ Admin Features

✔ Full CRUD for Users, Posts, Restaurants, Categories
✔ Approve/Reject posts
✔ Soft delete support
✔ Dashboard analytics
✔ Manage premium users

# 🗂️ Frontend Route Structure
Public Routes

/ – Home page

/allpost – All Food Posts

/about

/restaurant

/faq

/contact

/premium – Premium landing

/login, /register

### 🔒 Protected Routes
Route	                      Access
/allpost/create	              User Only
/restaurant/create	          User Only
/premium/dashboard	          Premium Only
/dashboard	                  User Only
/admin/dashboard	          Admin Only
🔐 Authentication

## JWT-based login system

# Middleware protection in backend

# Next.js route guards

### Technology Stack
Category	     Technologies
Frontend	      Next.js, React, Tailwind CSS
Backend	          Node.js, Express.js
ORM	              Prisma
Database	      PostgreSQL
Authentication	  JWT
Payment Gateway	   SSLCommerz
## Deployment	Vercel, Railway / Render
Others	Axios, Zod, Cloudinary, Cookie-Parser
###  🧪 How to Run Locally (Frontend + Backend)
1️⃣ Clone the Repositories
# Client:
git clone https://github.com/azir9200/latest_food_display
cd latest_food_display
npm install

# Server:
git clone https://github.com/azir9200/latest_food_backend
cd latest_food_backend
npm install

# ⚙️ Environment Variables
Client .env.local
NEXT_PUBLIC_BASE_API=https://latest-food-backend.vercel.app
NEXT_PUBLIC_CLOUD_NAME=your-cloudinary-name
NEXT_PUBLIC_UPLOAD_PRESET=your-upload-preset

# Server .env
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret
JWT_EXPIRES_IN=30d
CLOUDINARY_CLOUD_NAME=your-cloud
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret
SSL_STORE_ID=your-id
SSL_STORE_PASSWORD=your-key
FRONTEND_URL=https://latest-food-display.vercel.app

▶️ Start Development Servers
Frontend:
npm run dev

Backend:
npm run dev

🗃️ Database Schema Features (Prisma)

Soft delete:
isDeleted field for Post, User, Restaurant

Enum-based approval system

Ratings/Votes with unique constraints

Subscription model with payment tracking

⚠️ Error Handling

The project includes:

✔ Global Express.js error handler
✔ Zod validation
✔ Centralized API responses
✔ Toast notifications on frontend
✔ Graceful handling of Axios errors

🧑‍🏫 How Recruiters/Examiners Can Test
####  1️⃣ Login as Admin

####   Use:  admin99@gmail.com    password:  123456

2️⃣ Explore:

Admin Dashboard

Manage Posts

Approve/Reject Posts

See deleted items (soft delete)

Manage restaurants & categories

Manage premium users

3️⃣ Test User Features

Register new user

Create posts

Comment

Vote/Rate

Visit Premium page

Try upgrading

4️⃣ Test Soft Delete

Soft delete user/post/restaurant

They no longer appear in main list

But remain in deleted items list

📝 Conclusion

Food Book is a full production-ready food discovery system with:

Authentication

Authorization

Premium subscription

Soft delete

Restaurant management

Admin control

Beautiful UI

Feel free to explore, test, and evaluate the project!