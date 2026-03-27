# BookVerse - Full Stack E-Commerce Book Platform

A complete e-commerce platform for book lovers built with Angular (frontend) and Express.js (backend), powered by MongoDB. Single repository monorepo with integrated frontend and backend.

## 🌟 Features

### For Users
- 📖 **Browse Books** - Explore by categories, bestsellers, ratings
- 🎯 **Smart Search** - Search by title, author, ISBN, or keywords
- 😊 **Mood-Based Books** - Find books based on your current mood
- 🔍 **Personalized Recommendations** - Get book suggestions based on topics/problems
- ⭐ **Ratings & Reviews** - Read and write book reviews with ratings
- 🛒 **Shopping Cart** - Add/remove books and manage cart
- 💳 **Checkout** - Complete purchase with order tracking
- 👤 **User Accounts** - Register, login, manage profile and order history

### For Admins
- 📚 **Manage Books** - Add, edit, delete books with detailed information
- 🏷️ **Manage Genres** - Create and organize book categories
- 😊 **Manage Moods** - Configure mood-based filtering
- 🔑 **Manage Keywords** - Add search keywords for better discoverability
- 👥 **Manage Users** - View and manage user accounts
- 📊 **View Orders** - Track all orders and user purchases
- 👨‍💼 **Admin Controls** - Full dashboard for platform management

---

## Tech Stack

**Frontend:**
- Angular 21+ with TypeScript
- RxJS for reactive programming
- Tailwind CSS + SCSS
- Angular Router & Reactive Forms

**Backend:**
- Node.js 18+
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

---

## Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- npm or yarn

### Installation (5 minutes)

1. **Install Dependencies**
```bash
npm run install-all
```

2. **Setup MongoDB**
```bash
# Local MongoDB: Make sure it's running
mongod

# Or use MongoDB Atlas (cloud)
# Update .env with connection string
```

3. **Seed Database**
```bash
npm run seed
```

4. **Start Application**
```bash
npm run dev

# Frontend: http://localhost:4200
# Backend: http://localhost:5000
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| **QUICK_START.md** | Get up and running in 15 minutes |
| **SETUP_GUIDE.md** | Comprehensive setup instructions |
| **MONGODB_SETUP.md** | MongoDB installation & configuration |
| **PROJECT_STRUCTURE.md** | Complete directory structure & templates |
| **API_IMPLEMENTATION_GUIDE.md** | All API endpoints with examples |

---

## Project Structure

```
bookverse/
├── server/                     # Express.js Backend
│   ├── src/
│   │   ├── config/            # DB & env config
│   │   ├── controllers/       # Route handlers
│   │   ├── models/            # Mongoose schemas
│   │   ├── routes/            # API routes
│   │   ├── middleware/        # Auth, errors
│   │   ├── utils/             # JWT, validators
│   │   ├── scripts/           # Database seed
│   │   └── server.ts          # Main entry
│   ├── .env                   # Server config
│   └── package.json
│
├── client/                    # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/         # Services, guards
│   │   │   ├── shared/       # Shared components
│   │   │   ├── features/     # Feature pages
│   │   │   └── app.routes.ts # Routing
│   │   ├── styles.scss       # Global styles
│   │   ├── environments/     # Env config
│   │   └── main.ts
│   ├── angular.json
│   └── package.json
│
├── package.json              # Root scripts
├── .env.example             # Example env
└── README.md
```

---

## 🗄️ Database Schema

### Collections

1. **users** - User accounts
2. **admins** - Admin accounts
3. **books** - Book catalog
4. **genres** - Book categories
5. **moods** - Mood tags for recommendations
6. **keywords** - Search keywords
7. **orders** - Purchase orders
8. **reviews** - Book reviews and ratings
9. **carts** - Shopping carts

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register          - Register new user
POST   /api/auth/login             - User login
POST   /api/auth/logout            - User logout
GET    /api/auth/me                - Get current user
```

### Books
```
GET    /api/books                  - Get all books
GET    /api/books/:id              - Get book details
GET    /api/books/search           - Search books
GET    /api/books/genre/:id        - Get books by genre
GET    /api/books/bestsellers      - Get bestselling books
POST   /api/books                  - Create book (admin)
PUT    /api/books/:id              - Update book (admin)
DELETE /api/books/:id              - Delete book (admin)
```

### Shopping Cart
```
POST   /api/cart/add               - Add book to cart
GET    /api/cart                   - Get cart items
DELETE /api/cart/:bookId           - Remove from cart
DELETE /api/cart                   - Clear cart
```

### Orders
```
POST   /api/orders                 - Create order
GET    /api/orders                 - Get user orders
GET    /api/orders/:id             - Get order details
PUT    /api/orders/:id/status      - Update order (admin)
```

### Reviews
```
POST   /api/reviews                - Add review
GET    /api/reviews/book/:bookId   - Get book reviews
PUT    /api/reviews/:id            - Update review
DELETE /api/reviews/:id            - Delete review
```

### Categories
```
GET    /api/genres                 - Get all genres
POST   /api/genres                 - Create genre (admin)
GET    /api/moods                  - Get all moods
POST   /api/moods                  - Create mood (admin)
```

### Admin
```
GET    /api/admin/dashboard        - Admin dashboard
GET    /api/admin/users            - Manage users
GET    /api/admin/orders           - View all orders
POST   /api/admin/books            - Add books
```

---

## 🔐 Environment Variables

### Backend (.env)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/bookverse

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d

# Session
SESSION_SECRET=your_session_secret_here

# File Upload
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
```

### Frontend (environment.ts)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'
};
```

---

## 🛠️ Development Workflow

### Backend Development
```bash
cd backend
npm run dev              # Start with nodemon (auto-reload)
npm start               # Start production
npm install             # Install dependencies
```

### Frontend Development
```bash
cd bookverse-frontend
ng serve                # Start dev server
ng serve --port 4300   # Use different port
ng build                # Build for production
ng generate component   # Generate new component
```

### Database Management
```bash
mongosh                 # Open MongoDB shell
show dbs               # List databases
use bookverse          # Switch database
show collections       # List collections
db.books.find()        # View documents
```

---

## 🧪 Testing APIs

### Using curl
```bash
# Get all books
curl http://localhost:5000/api/books

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"full_name":"John","email":"john@test.com","password":"pass"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"pass"}'
```

### Using Postman
1. Import API collection
2. Set base URL: `http://localhost:5000/api`
3. Add Authorization header with JWT token
4. Test endpoints

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
mongosh

# Start MongoDB service
# Windows: net start MongoDB
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### Port Already in Use
```bash
# Find process on port 5000
# Windows: netstat -ano | findstr :5000
# macOS/Linux: lsof -i :5000

# Kill the process and restart
```

### CORS Errors
- Ensure CORS is configured in backend
- Check frontend API URL matches backend URL
- Verify credentials are set correctly

### Authentication Issues
- Check JWT token is being sent in Authorization header
- Verify JWT_SECRET matches in .env
- Check token expiration time

---

## 📖 Pages & Features

### User Pages
1. **Home** - Welcome page with hero slider, search, categories
2. **All Books** - Browse all books with filters and sorting
3. **Categories** - View books by genre
4. **Bestsellers** - Top-rated books
5. **Mood Based** - Select mood to see matching books
6. **Personalised** - Search by topic/problem
7. **Book Detail** - View full book information and reviews
8. **Cart** - Manage shopping cart
9. **Checkout** - Complete purchase
10. **My Orders** - View order history
11. **Login/Register** - Authentication
12. **Profile** - User account management
13. **Contact Us** - Contact information and form

### Admin Pages
1. **Admin Dashboard** - Overview and statistics
2. **Manage Books** - Add/Edit/Delete books
3. **Manage Genres** - Category management
4. **Manage Moods** - Mood configuration
5. **Manage Keywords** - Search keywords
6. **Manage Users** - User management
7. **View Orders** - Order tracking

---

## 🎯 Implementation Phases

### Phase 1: Setup & Database (Week 1)
- [ ] MongoDB installation and setup
- [ ] Backend server initialization
- [ ] Frontend project creation
- [ ] Database schema and collections

### Phase 2: Backend API (Week 2)
- [ ] User authentication system
- [ ] Book management endpoints
- [ ] Cart and order system
- [ ] Review system

### Phase 3: Frontend UI (Week 3-4)
- [ ] Home page with slider
- [ ] Book browsing and search
- [ ] Category and filter pages
- [ ] Shopping cart and checkout

### Phase 4: Advanced Features (Week 5-6)
- [ ] Mood-based recommendations
- [ ] Topic-based search
- [ ] Admin dashboard
- [ ] Order tracking

### Phase 5: Polish & Deploy (Week 7)
- [ ] Testing and bug fixes
- [ ] Performance optimization
- [ ] Production deployment
- [ ] Documentation

---

## 📚 Additional Resources

### Learning Resources
- [Express.js Docs](https://expressjs.com)
- [Angular Docs](https://angular.io)
- [MongoDB Docs](https://docs.mongodb.com)
- [RESTful API Design](https://restfulapi.net)

### Tools
- **Postman** - API testing
- **MongoDB Compass** - Database GUI
- **VS Code** - Code editor
- **Git** - Version control

---

## 🚀 Deployment

### Deploy Backend
```bash
# Use services like:
# - Heroku
# - AWS
# - DigitalOcean
# - Render

# Push to production with environment variables
```

### Deploy Frontend
```bash
# Build Angular app
ng build --configuration production

# Deploy to:
# - Netlify
# - Vercel
# - AWS S3
# - Firebase
```

---

## 📞 Support

For issues or questions:
1. Check the documentation files
2. Review API implementation guide
3. Check MongoDB setup guide
4. Review project structure for code templates

---

## 📄 License

This project is for educational purposes.

---

## 👥 Team

**Developer:** Your Name

---

## 🎉 Getting Started

1. **Start here:** Read `QUICK_START.md` (15 minutes)
2. **Then read:** `SETUP_GUIDE.md` for detailed instructions
3. **MongoDB:** Follow `MONGODB_SETUP.md`
4. **API:** Reference `API_IMPLEMENTATION_GUIDE.md`
5. **Structure:** Check `PROJECT_STRUCTURE.md` for file templates

---

**Ready to build? Let's get started! 🚀📚**
