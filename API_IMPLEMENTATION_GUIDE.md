# 🔌 BookVerse - Complete API Implementation Guide

---

## 📋 API Overview

Total Endpoints: **50+**

| Category | Count | Status |
|----------|-------|--------|
| Authentication | 4 | Auth endpoints |
| Books | 8 | CRUD + Search |
| Users | 5 | Profile management |
| Orders | 6 | Purchase flow |
| Reviews | 5 | Rating system |
| Cart | 4 | Shopping cart |
| Genres | 4 | Category management |
| Moods | 4 | Mood-based filtering |
| Keywords | 3 | Search keywords |
| Admin | 8 | Admin operations |

---

## 🔐 Authentication Endpoints

### 1. Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "full_name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: 201 Created
{
  "_id": "507f1f77bcf86cd799439011",
  "full_name": "John Doe",
  "email": "john@example.com",
  "created_at": "2024-01-15T10:30:00Z"
}
```

**Backend Implementation:**

Create `backend/controllers/authController.js`:
```javascript
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create new user
    const user = new User({ full_name, email, password });
    await user.save();

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        full_name: user.full_name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
```

### 2. Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "full_name": "John Doe",
    "email": "john@example.com"
  }
}
```

```javascript
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.json({
      token,
      user: {
        id: user._id,
        full_name: user.full_name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

### 3. Logout
```
POST /api/auth/logout
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Logged out successfully"
}
```

### 4. Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>

Response: 200 OK
{
  "id": "507f1f77bcf86cd799439011",
  "full_name": "John Doe",
  "email": "john@example.com",
  "created_at": "2024-01-15T10:30:00Z"
}
```

---

## 📚 Books Endpoints

### 1. Get All Books
```
GET /api/books?page=1&limit=10&sort=-rating

Response: 200 OK
{
  "total": 150,
  "page": 1,
  "pages": 15,
  "books": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "The Art of Living",
      "author": "John Smith",
      "description": "A guide to finding peace",
      "price": 499,
      "rating": 4.5,
      "genre": "507f1f77bcf86cd799439012",
      "cover_image": "/images/books/art-of-living.jpg",
      "isbn": "978-3-16-148410-0"
    }
  ]
}
```

**Backend Implementation:**

Create `backend/controllers/bookController.js`:
```javascript
const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = '-created_at' } = req.query;
    const skip = (page - 1) * limit;

    const books = await Book.find()
      .populate('genre')
      .populate('mood_tags')
      .populate('keywords')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Book.countDocuments();

    res.json({
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      books
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

### 2. Get Single Book
```
GET /api/books/:id

Response: 200 OK
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "The Art of Living",
  "author": "John Smith",
  "description": "A guide to finding peace and purpose in modern life",
  "price": 499,
  "rating": 4.5,
  "language": "English",
  "publication_year": 2022,
  "isbn": "978-3-16-148410-0",
  "cover_image": "/images/books/art-of-living.jpg",
  "genre": { "_id": "...", "name": "Self-Help" },
  "mood_tags": [{ "_id": "...", "name": "Motivated" }],
  "keywords": [{ "_id": "...", "name": "productivity" }],
  "reviews": [...]
}
```

### 3. Search Books
```
GET /api/books/search?q=self-help&type=title

Query Parameters:
- q: search query (required)
- type: title, author, isbn (default: all)

Response: 200 OK
{
  "results": [
    { /* book object */ }
  ],
  "count": 5
}
```

```javascript
exports.searchBooks = async (req, res) => {
  try {
    const { q, type } = req.query;
    let query = {};

    if (type === 'title') {
      query.title = { $regex: q, $options: 'i' };
    } else if (type === 'author') {
      query.author = { $regex: q, $options: 'i' };
    } else if (type === 'isbn') {
      query.isbn = q;
    } else {
      query = {
        $or: [
          { title: { $regex: q, $options: 'i' } },
          { author: { $regex: q, $options: 'i' } },
          { description: { $regex: q, $options: 'i' } }
        ]
      };
    }

    const results = await Book.find(query).populate('genre');
    res.json({ results, count: results.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

### 4. Get Books by Genre
```
GET /api/books/genre/:genreId

Response: 200 OK
{
  "genre": "Self-Help",
  "books": [{ /* book objects */ }],
  "count": 25
}
```

### 5. Get Books by Mood
```
GET /api/books/mood/:moodId

Response: 200 OK
{
  "mood": "Motivated",
  "books": [{ /* book objects */ }],
  "count": 15
}
```

### 6. Filter Books
```
GET /api/books/filter?minPrice=100&maxPrice=500&rating=4&language=English&genre=507f1f77bcf86cd799439012

Response: 200 OK
{
  "books": [{ /* filtered book objects */ }],
  "count": 8
}
```

### 7. Get Bestsellers
```
GET /api/books/bestsellers

Response: 200 OK
{
  "books": [{ /* top-rated books */ }],
  "count": 10
}
```

```javascript
exports.getBestsellers = async (req, res) => {
  try {
    const books = await Book.find()
      .sort({ rating: -1 })
      .limit(10)
      .populate('genre');
    
    res.json({ books, count: books.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

### 8. Create Book (Admin)
```
POST /api/books
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "New Book",
  "author": "Author Name",
  "description": "Description",
  "genre": "507f1f77bcf86cd799439012",
  "mood_tags": ["507f1f77bcf86cd799439013"],
  "keywords": ["507f1f77bcf86cd799439014"],
  "price": 399,
  "language": "English",
  "publication_year": 2024,
  "isbn": "978-3-16-148410-0",
  "cover_image": "/path/to/image.jpg"
}

Response: 201 Created
```

---

## 🛒 Cart Endpoints

### 1. Add to Cart
```
POST /api/cart/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "book_id": "507f1f77bcf86cd799439011",
  "quantity": 2
}

Response: 201 Created
{
  "message": "Book added to cart",
  "cart": {
    "user_id": "...",
    "items": [
      {
        "book_id": "507f1f77bcf86cd799439011",
        "quantity": 2,
        "price": 499
      }
    ],
    "total": 998
  }
}
```

### 2. Get Cart
```
GET /api/cart
Authorization: Bearer <token>

Response: 200 OK
{
  "items": [
    {
      "book_id": "507f1f77bcf86cd799439011",
      "title": "The Art of Living",
      "quantity": 2,
      "price": 499,
      "subtotal": 998
    }
  ],
  "total": 998,
  "count": 1
}
```

### 3. Remove from Cart
```
DELETE /api/cart/:bookId
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Item removed from cart",
  "cart": { /* updated cart */ }
}
```

### 4. Clear Cart
```
DELETE /api/cart
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Cart cleared"
}
```

---

## 💳 Orders Endpoints

### 1. Create Order (Checkout)
```
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "book_id": "507f1f77bcf86cd799439011",
      "quantity": 2,
      "price": 499
    }
  ],
  "total_amount": 998,
  "payment_method": "credit_card",
  "shipping_address": "123 Main St, City, State"
}

Response: 201 Created
{
  "_id": "507f1f77bcf86cd799439015",
  "user_id": "507f1f77bcf86cd799439011",
  "items": [{ /* order items */ }],
  "total_amount": 998,
  "order_date": "2024-01-15T10:30:00Z",
  "status": "pending"
}
```

### 2. Get User Orders
```
GET /api/orders
Authorization: Bearer <token>

Response: 200 OK
{
  "orders": [
    {
      "_id": "507f1f77bcf86cd799439015",
      "total_amount": 998,
      "order_date": "2024-01-15T10:30:00Z",
      "status": "completed",
      "items_count": 1
    }
  ],
  "count": 5
}
```

### 3. Get Order Details
```
GET /api/orders/:orderId
Authorization: Bearer <token>

Response: 200 OK
{
  "_id": "507f1f77bcf86cd799439015",
  "user_id": "...",
  "items": [
    {
      "book_id": { /* book details */ },
      "quantity": 2,
      "price": 499
    }
  ],
  "total_amount": 998,
  "order_date": "2024-01-15T10:30:00Z",
  "payment_status": "completed",
  "shipping_status": "dispatched"
}
```

### 4. Update Order Status (Admin)
```
PUT /api/orders/:orderId/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "shipped",
  "tracking_number": "TR123456789"
}

Response: 200 OK
```

---

## ⭐ Reviews Endpoints

### 1. Add Review
```
POST /api/reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "book_id": "507f1f77bcf86cd799439011",
  "rating": 5,
  "review_text": "Amazing book, highly recommend!"
}

Response: 201 Created
{
  "_id": "507f1f77bcf86cd799439016",
  "book_id": "507f1f77bcf86cd799439011",
  "user_id": "507f1f77bcf86cd799439001",
  "rating": 5,
  "review_text": "Amazing book, highly recommend!",
  "created_at": "2024-01-15T10:30:00Z"
}
```

### 2. Get Book Reviews
```
GET /api/reviews/book/:bookId

Response: 200 OK
{
  "book_id": "507f1f77bcf86cd799439011",
  "average_rating": 4.5,
  "total_reviews": 12,
  "reviews": [
    {
      "_id": "...",
      "user": { "full_name": "John Doe" },
      "rating": 5,
      "review_text": "Amazing!",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### 3. Update Review
```
PUT /api/reviews/:reviewId
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 4,
  "review_text": "Updated review text"
}

Response: 200 OK
```

### 4. Delete Review
```
DELETE /api/reviews/:reviewId
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Review deleted"
}
```

---

## 🏷️ Categories (Genres) Endpoints

### 1. Get All Genres
```
GET /api/genres

Response: 200 OK
{
  "genres": [
    { "_id": "...", "name": "Self-Help" },
    { "_id": "...", "name": "Romance" }
  ],
  "count": 8
}
```

### 2. Create Genre (Admin)
```
POST /api/genres
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Thriller"
}

Response: 201 Created
```

---

## 😊 Moods Endpoints

### 1. Get All Moods
```
GET /api/moods

Response: 200 OK
{
  "moods": [
    { "_id": "...", "name": "Happy", "emoji": "😊" }
  ],
  "count": 8
}
```

### 2. Get Books by Mood
```
GET /api/moods/:moodId/books

Response: 200 OK
{
  "mood": "Happy",
  "books": [{ /* book objects */ }],
  "count": 25
}
```

---

## 👤 Users Endpoints

### 1. Get User Profile
```
GET /api/users/profile
Authorization: Bearer <token>

Response: 200 OK
{
  "_id": "507f1f77bcf86cd799439011",
  "full_name": "John Doe",
  "email": "john@example.com",
  "created_at": "2024-01-15T10:30:00Z"
}
```

### 2. Update Profile
```
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "full_name": "John Doe Updated",
  "phone": "+1234567890"
}

Response: 200 OK
```

### 3. Change Password
```
POST /api/users/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "current_password": "oldPassword123",
  "new_password": "newPassword123"
}

Response: 200 OK
{
  "message": "Password changed successfully"
}
```

---

## 🔧 Error Handling

### Standard Error Response
```json
{
  "error": "Error message",
  "status": 400,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Common HTTP Status Codes
- **200 OK** - Request successful
- **201 Created** - Resource created successfully
- **400 Bad Request** - Invalid input data
- **401 Unauthorized** - Authentication required
- **403 Forbidden** - Access denied
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server error

---

## 🔒 Authentication Middleware

Create `backend/middleware/auth.js`:
```javascript
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
```

---

## 🧪 Testing with curl

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"full_name":"John","email":"john@test.com","password":"pass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"pass123"}'

# Get all books
curl http://localhost:5000/api/books

# Get book with authorization
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/books/507f1f77bcf86cd799439011
```

---

**API Implementation Guide Complete! 🎉**
