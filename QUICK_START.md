# 🚀 BookVerse - Quick Start Guide

> Get the BookVerse application up and running in 15 minutes!

---

## 📋 Pre-requisites (2 minutes)

Install these first:

```bash
# 1. Node.js (includes npm)
# Download from https://nodejs.org/ (LTS version)

# 2. MongoDB
# Download from https://www.mongodb.com/try/download/community
# Or use: brew install mongodb-community (macOS)
# Or use: sudo apt-get install mongodb (Linux)

# 3. Angular CLI
npm install -g @angular/cli

# 4. Verify installations
node --version
npm --version
ng version
mongosh --version
```

---

## ⚡ Step 1: MongoDB Setup (2 minutes)

### Start MongoDB

**Windows:**
```bash
# Service should auto-start
# Or manually:
net start MongoDB
```

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

**Verify:**
```bash
mongosh
# Type: exit
```

---

## 🏗️ Step 2: Create Project Structure (3 minutes)

```bash
# Create main project directory
mkdir BookVerse
cd BookVerse

# Create subdirectories
mkdir backend
mkdir bookverse-frontend

# Create .env template
touch backend/.env
```

---

## ⚙️ Step 3: Backend Setup (5 minutes)

### Initialize Backend

```bash
cd backend

# Create package.json
npm init -y

# Install dependencies
npm install express mongoose cors dotenv bcryptjs jsonwebtoken multer express-session
npm install --save-dev nodemon
```

### Create .env File

Create `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/bookverse
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_key_change_this
SESSION_SECRET=your_session_secret_here
```

### Create server.js

Create `backend/server.js`:
```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.log('❌ MongoDB error:', err));

// Basic Route
app.get('/api/health', (req, res) => {
  res.json({ status: '✅ Server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

### Update package.json Scripts

In `backend/package.json`, find `"scripts"` and replace with:
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

### Test Backend

```bash
npm run dev
# You should see:
# ✅ MongoDB connected
# 🚀 Server running on http://localhost:5000

# Test in browser: http://localhost:5000/api/health
# You should see: { "status": "✅ Server is running" }

# Keep this running in this terminal!
```

---

## 🎨 Step 4: Frontend Setup (3 minutes)

### Open New Terminal & Create Angular Project

```bash
cd ..  # Go back to BookVerse directory
ng new bookverse-frontend
# Select: No (for routing - we'll add later)
# Select: CSS

cd bookverse-frontend
```

### Install Dependencies

```bash
npm install bootstrap axios
```

### Update package.json

Add Bootstrap CSS import to `src/styles.css`:
```css
@import "~bootstrap/dist/css/bootstrap.min.css";
```

### Create Environment File

Create `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'
};
```

### Test Frontend

```bash
ng serve
# Open browser: http://localhost:4200
# You should see the Angular welcome page

# Keep this running in another terminal!
```

---

## 📱 Step 5: MongoDB Setup - Collections (3 minutes)

### Open New Terminal & Create Database

```bash
mongosh

# Copy and paste all these commands:

use bookverse

// Create collections
db.createCollection("books")
db.createCollection("genres")
db.createCollection("moods")
db.createCollection("keywords")
db.createCollection("users")
db.createCollection("admins")
db.createCollection("orders")
db.createCollection("reviews")

// Insert genres
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

// Insert moods
db.moods.insertMany([
  { name: "Happy" },
  { name: "Calm" },
  { name: "Curious" },
  { name: "Motivated" },
  { name: "Romantic" }
])

// Verify
show collections
db.genres.find()
db.moods.find()

// Type: exit
```

---

## 🎯 Success! You're Running BookVerse

You should now have:

- ✅ **MongoDB** running on `localhost:27017`
- ✅ **Backend** running on `http://localhost:5000`
- ✅ **Frontend** running on `http://localhost:4200`

---

## 📂 Your Project Structure

```
BookVerse/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── node_modules/
│
└── bookverse-frontend/
    ├── src/
    │   ├── app/
    │   ├── styles.css
    │   ├── main.ts
    │   └── environments/environment.ts
    ├── angular.json
    ├── package.json
    └── node_modules/
```

---

## 🛠️ Next Steps

### 1. Create Backend Models

Create `backend/models/Book.js`:
```javascript
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre' },
  rating: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', bookSchema);
```

### 2. Create Backend API Routes

Create `backend/routes/books.js`:
```javascript
const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single book
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create book
router.post('/', async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
```

### 3. Add Routes to Server

In `backend/server.js`, add before listening:
```javascript
const bookRoutes = require('./routes/books');
app.use('/api/books', bookRoutes);
```

### 4. Create Angular Service

Create `src/app/services/book.service.ts`:
```typescript
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:5000/api/books';

  constructor() { }

  getAllBooks() {
    return axios.get(this.apiUrl);
  }

  getBookById(id: string) {
    return axios.get(`${this.apiUrl}/${id}`);
  }

  addBook(book: any) {
    return axios.post(this.apiUrl, book);
  }
}
```

---

## 🧪 Testing APIs

### Using curl or Postman

```bash
# Get all books
curl http://localhost:5000/api/books

# Get health check
curl http://localhost:5000/api/health

# Create a book (from backend directory with server running)
curl -X POST http://localhost:5000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Book",
    "author": "Test Author",
    "price": 499,
    "rating": 4.5
  }'
```

---

## 🐛 Troubleshooting

### MongoDB won't start
```bash
# Check if MongoDB is installed
mongosh --version

# Start MongoDB service
# Windows: net start MongoDB
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### Backend won't start
```bash
# Check if port 5000 is free
# Windows: netstat -ano | findstr :5000
# macOS/Linux: lsof -i :5000

# Make sure all dependencies are installed
cd backend
npm install
npm run dev
```

### Frontend won't start
```bash
# Check if port 4200 is free
# Reinstall dependencies
cd bookverse-frontend
npm install
ng serve
```

### Can't connect to MongoDB from Node
```bash
# Check .env file has correct URI
# Make sure MongoDB is running
mongosh
```

---

## 📚 Full Documentation

- **Detailed Setup:** See `SETUP_GUIDE.md`
- **MongoDB Guide:** See `MONGODB_SETUP.md`
- **Project Spec:** See original HTML file

---

## 💡 Key Commands Reference

```bash
# Backend
cd backend
npm run dev                    # Start development server
npm install <package-name>    # Install package
npm start                      # Run production

# Frontend
cd bookverse-frontend
ng serve                       # Start dev server
ng build                       # Build for production
ng generate component name     # Create component
npm install <package-name>    # Install package

# MongoDB
mongosh                        # Connect to MongoDB
show dbs                       # Show databases
use bookverse                  # Switch to database
show collections              # Show collections
db.collection.find()          # Find documents
```

---

## 🎓 Learning Path

1. ✅ **Week 1:** Get all services running (MongoDB, Backend, Frontend)
2. ✅ **Week 2:** Create all database models and test API endpoints
3. ✅ **Week 3:** Build Angular components and connect to backend
4. ✅ **Week 4:** Add authentication and user sessions
5. ✅ **Week 5:** Implement cart and checkout
6. ✅ **Week 6:** Add admin panel
7. ✅ **Week 7:** Deploy to production

---

## 🚀 Ready to Build?

You have everything you need! Start coding:

```bash
# Terminal 1: MongoDB
mongosh

# Terminal 2: Backend
cd backend && npm run dev

# Terminal 3: Frontend
cd bookverse-frontend && ng serve

# Terminal 4: Your editor
# Start building! 🎉
```

---

**Happy Coding! 📚✨**

For detailed instructions, see `SETUP_GUIDE.md` and `MONGODB_SETUP.md`
