# BookVerse - Quick Reference Guide

## 🚀 Getting Started (Copy & Paste)

### Installation & Running

```bash
# Install all dependencies
npm run install-all

# Seed database (creates sample data)
npm run seed

# Start the app (both frontend & backend)
npm run dev

# Open in browser
http://localhost:4200
```

**That's it!** App will be running in ~2 minutes.

---

## 🔗 Important URLs

| Component | URL | Purpose |
|-----------|-----|---------|
| **Frontend** | http://localhost:4200 | Main application |
| **Backend API** | http://localhost:5000/api | API endpoints |
| **Books API** | http://localhost:5000/api/books | Get all books |

---

## 👤 Test Accounts

**Admin Account** (for admin panel):
```
Email: admin@bookverse.com
Password: admin123
```

**Create Your Own:**
- Go to Register page
- Fill in email and password
- Login and start shopping

---

## 📁 Project Layout

```
bookverse/
├── server/           ← Backend (Express.js)
│   ├── src/
│   │   ├── models/   ← Database schemas
│   │   ├── controllers/ ← API handlers
│   │   └── routes/   ← API endpoints
│   └── .env          ← Config (MongoDB URI, JWT)
│
├── client/           ← Frontend (Angular)
│   ├── src/
│   │   ├── app/
│   │   │   ├── services/ ← API calls
│   │   │   └── features/ ← Pages
│   │   └── environments/ ← Config
│
└── package.json      ← Root commands
```

---

## 💻 Commands Reference

```bash
# Development
npm run dev              # Start both (MAIN COMMAND)
npm run server          # Backend only
npm run client          # Frontend only

# Database
npm run seed            # Reset with sample data

# Production
npm run build           # Build for production
npm run build:server    # Build backend
npm run build:client    # Build frontend

# Installation
npm run install-all     # Install all dependencies
```

---

## 🗂️ Key Files

**Backend:**
- `server/src/server.ts` - Express app starts here
- `server/.env` - Change MongoDB URI or JWT secret
- `server/src/models/` - Database schemas
- `server/src/controllers/` - Business logic

**Frontend:**
- `client/src/main.ts` - Angular app starts here
- `client/src/app/app.routes.ts` - All routes
- `client/src/app/core/services/` - API services
- `client/src/environments/environment.ts` - API URL

---

## 🔌 API Endpoints (Sample)

```bash
# Get all books
curl http://localhost:5000/api/books

# Search books
curl "http://localhost:5000/api/books/search?q=harry"

# Get genres
curl http://localhost:5000/api/books/genres

# Get moods
curl http://localhost:5000/api/books/moods
```

---

## 🛠️ Configuration

### Change Database URI

Edit `server/.env`:
```env
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/bookverse

# OR MongoDB Atlas (cloud)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookverse
```

### Change API Port

Edit `server/.env`:
```env
PORT=5001  # Changes from 5000 to 5001
```

### Change JWT Secret (Important!)

Edit `server/.env`:
```env
JWT_SECRET=your-super-secret-key-here
```

---

## 🚨 Troubleshooting

| Problem | Solution |
|---------|----------|
| MongoDB error | Make sure `mongod` is running |
| Port in use | Change PORT in `server/.env` |
| Dependencies error | Run `npm run install-all` again |
| Frontend blank | Check console, ensure backend running |
| Can't login | Verify email/password, check .env JWT_SECRET |

---

## 📱 Application Features

### User Features
- ✓ Browse 50+ books
- ✓ Search & filter
- ✓ Mood-based discovery
- ✓ Shopping cart
- ✓ Checkout
- ✓ Reviews & ratings
- ✓ User accounts

### Admin Features (Email: admin@bookverse.com)
- ✓ Manage books
- ✓ Manage categories
- ✓ View orders
- ✓ Dashboard stats

---

## 📊 Database Collections

The app uses these MongoDB collections:
- `books` - Book catalog
- `users` - User accounts
- `orders` - Purchases
- `reviews` - Book reviews
- `cart_items` - Shopping carts
- `genres` - Categories
- `moods` - Mood tags
- `keywords` - Search terms

---

## 🔐 Authentication

Login flow:
1. Register with email/password
2. Password hashed on backend
3. Login returns JWT token
4. Token sent with every API request
5. Protected routes verified on server

---

## 📧 Environment Variables

Copy to `server/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/bookverse
JWT_SECRET=your-secret-key
PORT=5000
NODE_ENV=development
```

---

## 🎯 Common Tasks

### Add a New Book

Option 1: Via Admin Panel
- Login as admin
- Go to Admin → Manage Books
- Click "Add Book"
- Fill in details and save

Option 2: Via MongoDB
```javascript
db.books.insertOne({
  title: "New Book",
  author: "Author Name",
  price: 299,
  genre: "Fiction",
  rating: 4.5
})
```

### Change Admin Password

Modify in `server/src/scripts/seed.ts`:
```typescript
const adminPassword = bcryptjs.hashSync('newpassword', 10);
```

Then run `npm run seed`

### Add New Genre

Via Admin Panel or MongoDB:
```javascript
db.genres.insertOne({
  name: "Science Fiction",
  description: "Sci-fi books"
})
```

---

## 📚 Documentation

For more details, read:
- `README.md` - Full documentation
- `RUNNING_INSTRUCTIONS.md` - Setup step-by-step
- `BUILD_SUMMARY.md` - What was built
- `API_IMPLEMENTATION_GUIDE.md` - All API endpoints

---

## 🚀 Deployment

### Deploy Backend (Vercel)
```bash
cd server
vercel
```

### Deploy Frontend (Vercel)
```bash
cd client
vercel
```

### Deploy Database (MongoDB Atlas)
- Create free cluster
- Get connection string
- Update `server/.env`

---

## 💡 Tips & Tricks

- **Clear cart**: Open DevTools → Storage → localStorage → Delete cartItems
- **Reset database**: Run `npm run seed`
- **View MongoDB**: Use MongoDB Compass GUI
- **Test API**: Use Postman or Thunder Client

---

## 🐛 Debug Mode

To see console logs:

Backend: Already logs to console
Frontend: Open DevTools (F12) → Console

---

## Performance

- Books cached for 5 minutes
- Cart stored locally
- Images optimized
- Database indexes enabled

---

## Security

- Passwords hashed with bcryptjs
- JWT tokens for authentication
- CORS enabled
- Input validation
- Protected admin routes

---

## File Size

- Backend code: ~3,000 lines
- Frontend code: ~4,000 lines
- Configuration: ~500 lines
- Total: ~7,500 lines of production-ready code

---

## Support

**Need help?**
1. Check README.md
2. Check RUNNING_INSTRUCTIONS.md
3. Look at error in console
4. Verify MongoDB is running
5. Check .env configuration

---

## Success Checklist

- [ ] npm run install-all completed
- [ ] MongoDB running
- [ ] npm run seed completed
- [ ] npm run dev started both services
- [ ] Browser shows http://localhost:4200
- [ ] Can see books on homepage
- [ ] Can login with admin@bookverse.com / admin123
- [ ] Can add books to cart
- [ ] Admin panel accessible

If all checked: ✓ Application is working!

---

## What's Next?

1. **Explore**: Browse the application
2. **Test**: Try all features
3. **Admin**: Manage books and orders
4. **Customize**: Change colors, add features
5. **Deploy**: Push to production

---

## Quick Commands

```bash
# Single command to run everything
npm run dev

# Reset everything
npm run seed

# Rebuild
npm run build

# Just backend
npm run server

# Just frontend
npm run client
```

---

**Ready? Run `npm run dev` and start building! 🚀📚**
