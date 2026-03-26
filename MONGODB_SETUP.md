# 🗄️ MongoDB Complete Setup Guide for BookVerse

## Table of Contents
1. [Installation](#installation)
2. [Connection Setup](#connection-setup)
3. [Database Schema](#database-schema)
4. [Data Import](#data-import)
5. [Verification](#verification)

---

## Installation

### Windows

1. **Download MongoDB Community**
   - Visit: https://www.mongodb.com/try/download/community
   - Select Windows, MSI Package
   - Download the latest version

2. **Run Installer**
   - Double-click the `.msi` file
   - Follow the installation wizard
   - **Important:** Check "Install MongoDB as a Service"
   - Choose installation path (default: `C:\Program Files\MongoDB`)

3. **Start MongoDB Service**
   - Open Services (services.msc)
   - Find "MongoDB Server"
   - Right-click → Start
   - Or use PowerShell:
     ```powershell
     net start MongoDB
     ```

4. **Verify Installation**
   ```bash
   mongosh
   # Should connect to localhost:27017
   ```

---

### macOS (Homebrew - Recommended)

```bash
# 1. Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Add MongoDB tap
brew tap mongodb/brew

# 3. Install MongoDB
brew install mongodb-community

# 4. Start MongoDB service
brew services start mongodb-community

# 5. Verify installation
mongosh
```

---

### Linux (Ubuntu/Debian)

```bash
# 1. Import GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# 2. Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# 3. Update package list
sudo apt-get update

# 4. Install MongoDB
sudo apt-get install -y mongodb-org

# 5. Start MongoDB service
sudo systemctl start mongod
sudo systemctl enable mongod

# 6. Verify installation
mongosh
```

---

### Docker (Alternative - Recommended for Production)

```bash
# 1. Pull MongoDB image
docker pull mongo

# 2. Run MongoDB container
docker run -d -p 27017:27017 --name bookverse-mongo \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=admin123 \
  mongo

# 3. Connect to MongoDB in container
docker exec -it bookverse-mongo mongosh -u admin -p admin123

# 4. Stop container
docker stop bookverse-mongo

# 5. Restart container
docker start bookverse-mongo
```

---

## Connection Setup

### Local Connection String
```
mongodb://localhost:27017/bookverse
```

### MongoDB Atlas (Cloud)

1. **Create Account**
   - Go to: https://www.mongodb.com/cloud/atlas
   - Click "Start Free"
   - Sign up or log in

2. **Create Cluster**
   - Click "Create"
   - Choose Free tier
   - Select region (closest to you)
   - Click "Create Cluster"

3. **Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Add your IP or "0.0.0.0/0" for all IPs

4. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `bookverse_user`
   - Password: Generate secure password
   - Create User

5. **Get Connection String**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<username>`, `<password>`, and `<dbname>`

**Example Connection String:**
```
mongodb+srv://bookverse_user:your_password@cluster0.mongodb.net/bookverse?retryWrites=true&w=majority
```

---

## Database Schema

### Create Database & Collections

**Using mongosh (MongoDB Shell):**

```bash
# Connect to MongoDB
mongosh

# Create/switch to bookverse database
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
db.createCollection("carts")

# Verify collections created
show collections
```

### Create Indexes (Performance Optimization)

```javascript
// Users Collection
db.users.createIndex({ "email": 1 }, { unique: true })
db.users.createIndex({ "created_at": 1 })

// Admins Collection
db.admins.createIndex({ "username": 1 }, { unique: true })
db.admins.createIndex({ "email": 1 }, { unique: true })

// Books Collection
db.books.createIndex({ "title": 1 })
db.books.createIndex({ "author": 1 })
db.books.createIndex({ "genre": 1 })
db.books.createIndex({ "mood_tags": 1 })
db.books.createIndex({ "keywords": 1 })
db.books.createIndex({ "created_at": -1 })
db.books.createIndex({ "rating": -1 })

// Orders Collection
db.orders.createIndex({ "user_id": 1 })
db.orders.createIndex({ "book_id": 1 })
db.orders.createIndex({ "order_date": -1 })

// Reviews Collection
db.reviews.createIndex({ "book_id": 1 })
db.reviews.createIndex({ "user_id": 1 })
db.reviews.createIndex({ "book_id": 1, "user_id": 1 })
db.reviews.createIndex({ "created_at": -1 })

// Carts Collection
db.carts.createIndex({ "user_id": 1 }, { unique: true })
```

---

## Data Import

### Genres

```javascript
use bookverse

db.genres.insertMany([
  { name: "Self-Help", description: "Books for personal development" },
  { name: "Romance", description: "Romantic fiction" },
  { name: "Business", description: "Business and entrepreneurship" },
  { name: "Mystery & Thriller", description: "Mystery and thriller novels" },
  { name: "Fiction & Sci-Fi", description: "Science fiction and fantasy" },
  { name: "Manga & Comics", description: "Manga and comic books" },
  { name: "Kids", description: "Children's books" },
  { name: "Biography", description: "Biographies and memoirs" }
])

# Verify
db.genres.find()
```

### Moods

```javascript
db.moods.insertMany([
  { name: "Happy", emoji: "😊" },
  { name: "Calm", emoji: "😌" },
  { name: "Curious", emoji: "🤔" },
  { name: "Motivated", emoji: "💪" },
  { name: "Romantic", emoji: "💕" },
  { name: "Stressed", emoji: "😰" },
  { name: "Adventurous", emoji: "🚀" },
  { name: "Thoughtful", emoji: "🧠" }
])

# Verify
db.moods.find()
```

### Keywords

```javascript
db.keywords.insertMany([
  { name: "stress relief" },
  { name: "productivity" },
  { name: "love story" },
  { name: "mystery" },
  { name: "fantasy" },
  { name: "science fiction" },
  { name: "self-improvement" },
  { name: "action" },
  { name: "adventure" },
  { name: "romance" },
  { name: "motivation" },
  { name: "learning" }
])

# Verify
db.keywords.find()
```

### Sample Books

```javascript
// First, get IDs of genres, moods, and keywords
var selfHelpGenre = db.genres.findOne({ name: "Self-Help" })._id
var happyMood = db.moods.findOne({ name: "Happy" })._id
var motivatedMood = db.moods.findOne({ name: "Motivated" })._id
var stressKeyword = db.keywords.findOne({ name: "stress relief" })._id
var productivityKeyword = db.keywords.findOne({ name: "productivity" })._id

// Insert sample books
db.books.insertMany([
  {
    title: "The Art of Living",
    author: "John Smith",
    description: "A comprehensive guide to finding peace and purpose in modern life",
    genre: selfHelpGenre,
    mood_tags: [happyMood, motivatedMood],
    keywords: [stressKeyword, productivityKeyword],
    price: 499,
    rating: 4.5,
    language: "English",
    publication_year: 2022,
    isbn: "978-3-16-148410-0",
    cover_image: "/images/books/art-of-living.jpg",
    created_at: new Date()
  },
  {
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    description: "The timeless classic on personal success and wealth",
    genre: selfHelpGenre,
    mood_tags: [motivatedMood],
    keywords: [productivityKeyword],
    price: 399,
    rating: 4.8,
    language: "English",
    publication_year: 1937,
    isbn: "978-1-11-110314-4",
    cover_image: "/images/books/think-grow-rich.jpg",
    created_at: new Date()
  }
])

# Verify
db.books.find()
db.books.find().pretty()
```

### Admin User

```javascript
// Note: In production, hash the password using bcrypt
// For testing only - NEVER store plain text passwords

db.admins.insertOne({
  username: "admin",
  password: "admin123", // MUST be hashed in production
  email: "admin@bookverse.com",
  role: "admin",
  created_at: new Date()
})

# Verify
db.admins.findOne({ username: "admin" })
```

---

## Verification

### Check Database

```javascript
# Show databases
show dbs

# Show current database
db

# Show collections
show collections

# Count documents in each collection
db.books.countDocuments()
db.users.countDocuments()
db.genres.countDocuments()
db.moods.countDocuments()
db.keywords.countDocuments()

# View indexes
db.books.getIndexes()
```

### Test Queries

```javascript
# Find all books
db.books.find()

# Find books by author
db.books.find({ author: "Napoleon Hill" })

# Find books by price range
db.books.find({ price: { $gte: 300, $lte: 500 } })

# Find books with rating >= 4
db.books.find({ rating: { $gte: 4 } })

# Count documents
db.books.find().count()

# Sort by rating (descending)
db.books.find().sort({ rating: -1 })

# Find with text search
db.books.find({ $text: { $search: "stress" } })

# Update book
db.books.updateOne(
  { title: "The Art of Living" },
  { $set: { price: 599 } }
)

# Delete book
db.books.deleteOne({ title: "Old Book" })
```

---

## Connection in Node.js (Express)

### Install Dependencies

```bash
npm install mongoose
```

### Create Connection File

Create `backend/config/database.js`:

```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

### Use in Server

```javascript
// In server.js
require('dotenv').config();
const connectDB = require('./config/database');

connectDB();

const app = require('express')();

// Your routes...
```

---

## Environment Variables

Create `backend/.env`:

```env
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/bookverse

# Or MongoDB Atlas
# MONGODB_URI=mongodb+srv://bookverse_user:your_password@cluster0.mongodb.net/bookverse?retryWrites=true&w=majority

PORT=5000
NODE_ENV=development
```

---

## Backup & Restore

### Backup Database

```bash
# Backup to file
mongodump --db bookverse --out ./backups

# Backup to gzip
mongodump --db bookverse --archive=bookverse-backup.archive --gzip
```

### Restore Database

```bash
# Restore from directory
mongorestore ./backups

# Restore from archive
mongorestore --archive=bookverse-backup.archive --gzip
```

---

## MongoDB Compass (GUI Tool)

### Installation & Usage

1. **Download** from: https://www.mongodb.com/products/compass
2. **Connect:**
   - Connection String: `mongodb://localhost:27017`
   - Or: `mongodb+srv://user:password@cluster.mongodb.net`
3. **Browse Data:** Visual interface to view/edit collections
4. **Export/Import:** Tools to backup and restore data

---

## Common Commands Reference

```javascript
// Database Operations
use bookverse                           # Switch database
db                                      # Show current database
show dbs                                # Show all databases
db.dropDatabase()                       # Delete database

// Collection Operations
db.createCollection("name")             # Create collection
db.collection.drop()                    # Delete collection
show collections                        # Show all collections

// Document Operations
db.collection.find()                    # Find all documents
db.collection.findOne()                 # Find first document
db.collection.insertOne({})             # Insert one document
db.collection.insertMany([])            # Insert multiple
db.collection.updateOne({}, {$set:{}})  # Update one
db.collection.deleteOne({})             # Delete one
db.collection.deleteMany({})            # Delete multiple

// Aggregation
db.collection.aggregate([])             # Aggregate pipeline
db.collection.count()                   # Count documents

// Index Operations
db.collection.createIndex()             # Create index
db.collection.getIndexes()              # Show indexes
db.collection.dropIndex()               # Drop index
```

---

## Troubleshooting

### Connection Refused
**Error:** `Error: connect ECONNREFUSED 127.0.0.1:27017`
- **Solution:** Check if MongoDB is running
  ```bash
  # Windows
  net start MongoDB
  
  # macOS
  brew services start mongodb-community
  
  # Linux
  sudo systemctl start mongod
  ```

### Port Already in Use
**Error:** `Error: listen EADDRINUSE: address already in use :::27017`
- **Solution:** MongoDB already running or port in use
  ```bash
  # Find process on port 27017
  lsof -i :27017
  kill -9 <PID>
  ```

### Authentication Failed
**Error:** `Authentication failed`
- **Solution:** Check credentials in connection string
  ```
  # Format: mongodb+srv://username:password@host/dbname
  # Ensure special characters are URL encoded
  ```

---

## Security Best Practices

1. **Never use root/admin user** for applications
2. **Create separate user** for each application
3. **Use strong passwords** (16+ characters)
4. **Enable authentication** in production
5. **Use network access controls** (IP whitelist)
6. **Enable encryption** at rest and in transit
7. **Regular backups** of important data
8. **Monitor access logs**

---

**MongoDB Setup Complete! 🎉**
