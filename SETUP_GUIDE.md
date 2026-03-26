# BookVerse - Complete Setup & Running Guide

## 📚 Project Overview
BookVerse is a full-stack e-commerce platform for selling books online. Built with:
- **Frontend:** Angular
- **Backend API:** Express.js + Next.js
- **Database:** MongoDB
- **Architecture:** MERN Stack with Angular frontend

---

## 🛠️ Prerequisites

Before starting, ensure you have installed:
1. **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** (local or cloud) - [Download](https://www.mongodb.com/try/download/community)
3. **npm** or **yarn** package manager
4. **Angular CLI** - Install with: `npm install -g @angular/cli`
5. **Git** (optional, for version control)

---

## 📁 Project Structure

```
bookverse/
│
├── frontend/                 # Angular Application
│   ├── src/
│   │   ├── app/
│   │   ├── assets/
│   │   ├── styles/
│   │   └── index.html
│   ├── angular.json
│   └── package.json
│
├── backend/                  # Express.js API Server
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   ├── .env
│   └── server.js
│
├── api/                      # Next.js API Routes (Optional)
│   ├── pages/
│   │   └── api/
│   ├── .env.local
│   └── package.json
│
└── README.md
```

---

## 🗄️ MongoDB Setup

### Step 1: Local MongoDB Installation

**On Windows:**
1. Download MongoDB Community from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the setup wizard
3. MongoDB will run as a service on `localhost:27017`

**On macOS (using Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**On Linux (Ubuntu/Debian):**
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

### Step 2: MongoDB Cloud (Alternative)

For cloud-based MongoDB:
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/bookverse`

### Step 3: Create Database & Collections

Use MongoDB Compass or MongoDB Shell to set up:

**Command Line (MongoDB Shell):**
```bash
mongosh
use bookverse

# Create collections
db.createCollection("books")
db.createCollection("genres")
db.createCollection("moods")
db.createCollection("keywords")
db.createCollection("users")
db.createCollection("admins")
db.createCollection("orders")
db.createCollection("reviews")
```

### Step 4: Add Indexes (For Performance)

```bash
# Users collection
db.users.createIndex({ "email": 1 }, { unique: true })

# Reviews collection
db.reviews.createIndex({ "book_id": 1, "user_id": 1 })
db.reviews.createIndex({ "book_id": 1 })

# Orders collection
db.orders.createIndex({ "user_id": 1 })
db.orders.createIndex({ "book_id": 1 })

# Books collection
db.books.createIndex({ "title": 1 })
db.books.createIndex({ "author": 1 })
```

### Step 5: Sample Data Import

**Insert Genres:**
```bash
db.genres.insertMany([
  { name: "Self-Help" },
  { name: "Romance" },
  { name: "Business" },
  { name: "Mystery & Thriller" },
  { name: "Fiction & Sci-Fi" },
  { name: "Manga & Comics" },
  { name: "Kids" },
  { name: "Biography" }
])
```

**Insert Moods:**
```bash
db.moods.insertMany([
  { name: "Happy" },
  { name: "Calm" },
  { name: "Curious" },
  { name: "Motivated" },
  { name: "Romantic" },
  { name: "Stressed" },
  { name: "Adventurous" }
])
```

**Insert Keywords:**
```bash
db.keywords.insertMany([
  { name: "stress relief" },
  { name: "productivity" },
  { name: "love story" },
  { name: "mystery" },
  { name: "fantasy" },
  { name: "science fiction" }
])
```

**Insert Sample Book:**
```bash
db.books.insertOne({
  title: "The Art of Living",
  author: "John Smith",
  description: "A guide to finding peace and purpose",
  genre_id: ObjectId("..."), # Reference to genres collection
  mood_tags: [ObjectId("...")], # Arrays of mood IDs
  keywords: [ObjectId("...")], # Arrays of keyword IDs
  price: 499,
  rating: 4.5,
  language: "English",
  publication_year: 2022,
  isbn: "978-3-16-148410-0",
  cover_image: "/images/book1.jpg",
  created_at: new Date()
})
```

---

## ⚙️ Backend Setup (Express.js)

### Step 1: Initialize Backend

```bash
cd backend
npm init -y
npm install express mongoose cors dotenv bcryptjs jsonwebtoken multer express-session
npm install --save-dev nodemon
```

### Step 2: Create .env File

Create `backend/.env`:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/bookverse
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookverse

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_super_secret_jwt_key_here_change_this
JWT_EXPIRE=7d

# Session
SESSION_SECRET=your_session_secret_here

# File Upload
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880

# Email (Optional for future)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### Step 3: Create Server File

Create `backend/server.js`:
```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, // Set to true in production with HTTPS
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  }
}));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Basic Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Import Routes (you'll create these next)
// app.use('/api/books', require('./routes/books'));
// app.use('/api/users', require('./routes/users'));
// etc.

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Step 4: Create Models

Create `backend/models/Book.js`:
```javascript
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: String,
  genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre' },
  mood_tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mood' }],
  keywords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Keyword' }],
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  language: String,
  publication_year: Number,
  isbn: String,
  cover_image: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', bookSchema);
```

Create `backend/models/User.js`:
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

Create `backend/models/Order.js`:
```javascript
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  total_amount: { type: Number, required: true },
  order_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
```

Create `backend/models/Review.js`:
```javascript
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  review_text: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
```

### Step 5: Update package.json scripts

In `backend/package.json`, update scripts:
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

### Step 6: Run Backend

```bash
cd backend
npm run dev
# Server should start on http://localhost:5000
```

---

## 🎨 Frontend Setup (Angular)

### Step 1: Create Angular Project

```bash
ng new bookverse-frontend
cd bookverse-frontend
```

### Step 2: Install Dependencies

```bash
npm install axios @angular/common @angular/forms bootstrap
npm install bootstrap
```

### Step 3: Configure Environment

Create `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'
};

export const environment_prod = {
  production: true,
  apiUrl: 'https://your-production-url/api'
};
```

### Step 4: Create Services

Create `src/app/services/book.service.ts`:
```typescript
import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = environment.apiUrl;

  constructor() { }

  getAllBooks() {
    return axios.get(`${this.apiUrl}/books`);
  }

  getBookById(id: string) {
    return axios.get(`${this.apiUrl}/books/${id}`);
  }

  searchBooks(query: string) {
    return axios.get(`${this.apiUrl}/books/search?q=${query}`);
  }

  getCategories() {
    return axios.get(`${this.apiUrl}/genres`);
  }

  getMoods() {
    return axios.get(`${this.apiUrl}/moods`);
  }
}
```

Create `src/app/services/auth.service.ts`:
```typescript
import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor() { }

  register(userData: any) {
    return axios.post(`${this.apiUrl}/auth/register`, userData);
  }

  login(email: string, password: string) {
    return axios.post(`${this.apiUrl}/auth/login`, { email, password });
  }

  logout() {
    return axios.post(`${this.apiUrl}/auth/logout`);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
```

### Step 5: Create Components

```bash
ng generate component components/home
ng generate component components/categories
ng generate component components/book-detail
ng generate component components/cart
ng generate component components/checkout
ng generate component components/header
ng generate component components/footer
```

### Step 6: Run Angular Frontend

```bash
cd bookverse-frontend
ng serve
# Frontend will run on http://localhost:4200
```

---

## 🚀 Running the Complete Application

### Terminal 1: MongoDB
```bash
# If local MongoDB
mongosh
# or
sudo systemctl start mongodb
```

### Terminal 2: Express Backend
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

### Terminal 3: Angular Frontend
```bash
cd bookverse-frontend
ng serve
# Runs on http://localhost:4200
```

---

## 📋 Environment Variables Checklist

### Backend (.env)
- [ ] `MONGODB_URI` - MongoDB connection string
- [ ] `PORT` - Server port (default 5000)
- [ ] `JWT_SECRET` - JWT encryption key
- [ ] `SESSION_SECRET` - Session encryption key
- [ ] `NODE_ENV` - development/production

### Frontend (environment.ts)
- [ ] `apiUrl` - Backend API URL

---

## 🔌 API Endpoints (To be implemented)

### Books
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get single book
- `GET /api/books/search?q=query` - Search books
- `GET /api/books/genre/:genreId` - Get books by genre
- `POST /api/books` - Create book (Admin only)

### Users
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/users/:id` - Get user profile

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/:userId` - Get user orders
- `GET /api/orders/:id` - Get order details

### Reviews
- `POST /api/reviews` - Add review
- `GET /api/reviews/:bookId` - Get book reviews

---

## 📝 Common Issues & Solutions

### MongoDB Connection Error
**Error:** `connect ECONNREFUSED 127.0.0.1:27017`
- **Solution:** Ensure MongoDB is running: `sudo systemctl start mongodb`

### Port Already in Use
**Error:** `listen EADDRINUSE: address already in use :::5000`
- **Solution:** 
  ```bash
  # Find process on port 5000
  lsof -i :5000
  # Kill the process
  kill -9 <PID>
  ```

### CORS Issues
**Error:** `Access to XMLHttpRequest blocked by CORS`
- **Solution:** Ensure CORS is configured in `server.js`:
  ```javascript
  app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
  }));
  ```

### Session Not Persisting
**Error:** User logged out after refresh
- **Solution:** Store user token in localStorage and validate on app init

---

## 🔐 Security Checklist

- [ ] Use HTTPS in production
- [ ] Hash passwords with bcrypt
- [ ] Implement JWT for API authentication
- [ ] Validate all user inputs
- [ ] Use environment variables for secrets
- [ ] Implement CORS properly
- [ ] Add rate limiting for APIs
- [ ] Sanitize MongoDB queries (prevent injection)
- [ ] Use secure session cookies

---

## 📚 File Paths Reference

```
backend/
├── server.js                    # Main server file
├── models/
│   ├── Book.js
│   ├── User.js
│   ├── Order.js
│   ├── Review.js
│   ├── Genre.js
│   ├── Mood.js
│   └── Keyword.js
├── routes/
│   ├── books.js
│   ├── users.js
│   ├── orders.js
│   ├── reviews.js
│   ├── auth.js
│   └── admin.js
├── controllers/
│   ├── bookController.js
│   ├── userController.js
│   └── orderController.js
├── middleware/
│   ├── auth.js                 # JWT verification
│   ├── admin.js                # Admin check
│   └── errorHandler.js
├── config/
│   └── database.js
└── .env

bookverse-frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── home/
│   │   │   ├── categories/
│   │   │   ├── header/
│   │   │   └── footer/
│   │   ├── services/
│   │   │   ├── book.service.ts
│   │   │   ├── auth.service.ts
│   │   │   └── cart.service.ts
│   │   ├── app.component.ts
│   │   └── app.module.ts
│   ├── assets/
│   ├── styles/
│   └── environments/
└── angular.json
```

---

## 🎯 Next Steps

1. Clone/create the project structure
2. Set up MongoDB database
3. Create backend models and routes
4. Implement authentication
5. Build Angular components
6. Integrate frontend with backend
7. Test all functionality
8. Deploy to production

---

## 📞 Support

For issues:
1. Check MongoDB connection
2. Verify environment variables
3. Check CORS configuration
4. Review browser console for errors
5. Check backend logs with `npm run dev`

---

**Happy Coding! 🚀📚**
