 ###  🍽️ Food Book — Frontend (Next.js 16 + TypeScript)

A modern, modular, high-performance frontend application for the Food Book platform — built with Next.js, TypeScript, ShadCN UI, JWT authentication, TailwindCSS, React Hook Form, Zod, and more.

This frontend communicates with a Node.js/Prisma/PostgreSQL backend to display food posts, categories, user profiles, authentication, admin dashboard, and more.

- Food Book is a modern full-stack web application for exploring dishes, restaurants, premium content, posting reviews, rating/voting, and managing content through powerful user and admin dashboards.

The project includes authentication, role-based access, premium subscription, restaurant management, CRUD operations, and secure API integration with clean UI using Next.js + Tailwind.

## Tech Stack & Why I Used Them
1️⃣ Next.js 16 (App Router) : Modern React framework with server components, Built-in routing, caching, and API handling, Super fast and SEO friendly, Perfect for scalable production apps.

2️⃣ TypeScript: Strong type safety, Reduces bugs & improves maintainability, Easier refactoring in a modular codebase. 

3️⃣ ShadCN UI + Radix UI: Accessible UI components, Fully customizable, Clean and consistent design system, Ideal for dashboards & forms,

4️⃣ TailwindCSS:  Utility-first CSS for fast UI building, Perfect consistency across components, Easy theming & responsive design.

5️⃣ React Hook Form: Best form library for React, Smooth validation + high performance, 
Works perfectly with Zod.

6️⃣ Zod (Schema Validation): End-to-end data validation, Ensures form + server validation stays consistent, Reduces bugs caused by invalid input.

7️⃣ JWT Decode: Reads auth tokens on the client, Used for user session handling, Lightweight, secure and fast. 

8️⃣ Framer Motion: Smooth animations, Modern UI transitions, Better UX for feed and dashboard pages.

9️⃣ Recharts: Visual charts for admin dashboard, Great for analytics (posts, users, etc.).

## Project Structure (Modular Architecture)
      latest_food_display/
                           │── app/
                           │   ├── (routes)
                           │   ├── layout.tsx
                           │── components/
                           │   ├── ui/ (ShadCN components)
                           │   ├── share/
                           │   ├── dashboard/
                           │── services/
                           │   ├── postService.ts
                           │   ├── categoryService.ts
                           │   ├── userService.ts
                           │── lib/
                           │── types/
                           │── utils/
                           │── package.json

### Project Overview

-- Food Book is a platform where:

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

### Technology Stack
Frontend	      Next.js, React, Typescript, Tailwind CSS
Backend	          Node.js, Express.js, Typescript.
ORM	              Prisma
Database	      PostgreSQL
Authentication	  JWT


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

Food Book is a full production-ready food discovery system with:
Building modern apps with React, Next.js, TypeScript & Node.js.

👨‍💻 Author
Azir Uddin
Full-Stack Web Developer
Feel free to explore, test, and evaluate the project!