# BookVerse - Download & Setup Guide

## Option 1: Download ZIP from v0 (Recommended)

### On v0.app:
1. Click the **three dots menu** (top right of Version Block)
2. Select **"Download ZIP"**
3. Extract the ZIP file to your desired location

## Option 2: Create ZIP Manually

### Windows:
```bash
# Run the batch file
create-zip.bat

# Or manually compress the folder
# Right-click on the project folder > Send to > Compressed (zipped) folder
```

### Mac/Linux:
```bash
# Run the shell script
bash create-zip.sh

# Or manual command
zip -r BookVerse.zip server/ client/ package.json .env.example README.md RUNNING_INSTRUCTIONS.md -x "*/node_modules/*" "*/.angular/*" "*/dist/*"
```

---

## Setup Instructions (After Downloading)

### Step 1: Extract ZIP
```bash
unzip BookVerse.zip
cd BookVerse
```

### Step 2: Install Dependencies
```bash
npm run install-all
```

This installs:
- Root dependencies (concurrently)
- Server dependencies (Express, MongoDB, JWT, etc.)
- Client dependencies (Angular, RxJS, Tailwind, etc.)

### Step 3: Setup MongoDB

**Option A: Local MongoDB**
```bash
# Start MongoDB service
# Windows: net start MongoDB
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Update `server/.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookverse
```

### Step 4: Configure Environment

Copy `.env.example` to `server/.env` and update:
```bash
cp .env.example server/.env

# Edit server/.env with your values
MONGODB_URI=mongodb://localhost:27017/bookverse
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### Step 5: Seed Database

```bash
npm run seed
```

This creates:
- 50+ sample books
- 8 genres
- 10+ moods
- 20+ keywords

### Step 6: Start Application

```bash
npm run dev
```

This starts:
- Backend API on http://localhost:5000
- Frontend app on http://localhost:4200

---

## Access the Application

### Frontend (Angular)
- **URL:** http://localhost:4200
- **Home page:** Browse all books

### Backend API (Express)
- **URL:** http://localhost:5000
- **API Docs:** See QUICK_REFERENCE.md for all endpoints

---

## Test Accounts

### Admin Account
- **Email:** admin@bookverse.com
- **Password:** admin123
- **Access:** Admin dashboard at /admin

### Regular User Account
- **Email:** user@bookverse.com
- **Password:** user123
- **Access:** Browse books, add to cart, checkout

### Create New Account
- Click "Register" on login page
- Fill in details
- Start shopping!

---

## Project Structure

```
BookVerse/
├── server/                 # Express.js Backend API
│   ├── src/
│   │   ├── controllers/   # Business logic
│   │   ├── models/        # MongoDB schemas
│   │   ├── routes/        # API endpoints
│   │   ├── middleware/    # Auth, validation
│   │   └── server.ts      # Entry point
│   └── .env              # Configuration
│
├── client/               # Angular Frontend SPA
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/     # Services, guards
│   │   │   ├── shared/   # Shared components
│   │   │   └── features/ # Pages
│   │   ├── styles.scss   # Global styles
│   │   └── main.ts       # Entry point
│   └── package.json
│
└── package.json          # Root commands
```

---

## Useful Commands

```bash
# Start everything (both backend and frontend)
npm run dev

# Start backend only
npm run server

# Start frontend only  
npm run client

# Seed database with sample data
npm run seed

# Build for production
npm run build

# Build only backend
npm run build:server

# Build only frontend
npm run build:client

# Reinstall all dependencies
npm run install-all
```

---

## Features Included

✓ User Authentication (Login/Register)
✓ Browse 50+ Books
✓ Advanced Search & Filtering
✓ Genre/Category Browsing
✓ Mood-Based Recommendations
✓ Shopping Cart Management
✓ Checkout Process
✓ Order Management
✓ Book Reviews & Ratings
✓ Admin Dashboard
✓ Manage Books, Genres, Moods
✓ Responsive Design (Mobile/Tablet/Desktop)
✓ Production-Ready Code

---

## Troubleshooting

### Port Already in Use
```bash
# Change port in server/.env
PORT=5001

# Or kill process using the port
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill
```

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in .env
- Verify database name matches

### Dependencies Installation Fails
```bash
# Clear npm cache
npm cache clean --force

# Reinstall everything
rm -rf node_modules server/node_modules client/node_modules
npm run install-all
```

### Port 4200 Already in Use (Angular)
```bash
# Kill Angular process or use different port
ng serve --port 4300
```

---

## Next Steps

1. **Customize:** Update colors, fonts, and branding in `client/src/styles.scss`
2. **Add Features:** Extend components and services as needed
3. **Deploy:** Follow deployment guides for your hosting platform
4. **Database:** Connect to MongoDB Atlas for cloud database
5. **Production:** Build and optimize for production deployment

---

## Support & Documentation

- **README.md** - Project overview
- **RUNNING_INSTRUCTIONS.md** - Detailed setup
- **QUICK_REFERENCE.md** - Command reference
- **BUILD_SUMMARY.md** - What was built
- **COMPLETION_REPORT.md** - Full technical details

---

## License

MIT License - Free to use and modify

Enjoy your BookVerse application! 📚
