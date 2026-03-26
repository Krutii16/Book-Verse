# 📁 BookVerse - Complete Project Structure

## Full Directory Tree

```
BookVerse/
│
├── backend/                              # Express.js Backend Server
│   ├── server.js                         # Main server entry point
│   ├── package.json                      # Backend dependencies
│   ├── .env                              # Environment variables
│   ├── .gitignore
│   │
│   ├── config/
│   │   ├── database.js                   # MongoDB connection
│   │   └── constants.js                  # App constants
│   │
│   ├── models/                           # Mongoose Schemas
│   │   ├── User.js
│   │   ├── Admin.js
│   │   ├── Book.js
│   │   ├── Genre.js
│   │   ├── Mood.js
│   │   ├── Keyword.js
│   │   ├── Order.js
│   │   ├── OrderItem.js
│   │   ├── Review.js
│   │   └── Cart.js
│   │
│   ├── controllers/                      # Business Logic
│   │   ├── authController.js             # Login/Register
│   │   ├── bookController.js             # Book operations
│   │   ├── userController.js             # User profile
│   │   ├── orderController.js            # Order management
│   │   ├── reviewController.js           # Reviews
│   │   ├── cartController.js             # Shopping cart
│   │   ├── genreController.js            # Genre operations
│   │   ├── moodController.js             # Mood operations
│   │   └── adminController.js            # Admin operations
│   │
│   ├── routes/                           # API Endpoints
│   │   ├── auth.js                       # /api/auth
│   │   ├── books.js                      # /api/books
│   │   ├── users.js                      # /api/users
│   │   ├── orders.js                     # /api/orders
│   │   ├── reviews.js                    # /api/reviews
│   │   ├── cart.js                       # /api/cart
│   │   ├── genres.js                     # /api/genres
│   │   ├── moods.js                      # /api/moods
│   │   ├── keywords.js                   # /api/keywords
│   │   ├── admin.js                      # /api/admin
│   │   └── index.js                      # Route aggregator
│   │
│   ├── middleware/                       # Custom Middleware
│   │   ├── auth.js                       # JWT verification
│   │   ├── admin.js                      # Admin check
│   │   ├── errorHandler.js               # Global error handler
│   │   ├── validation.js                 # Input validation
│   │   └── cors.js                       # CORS config
│   │
│   ├── utils/                            # Utility Functions
│   │   ├── validators.js                 # Validation functions
│   │   ├── errorMessages.js              # Error message constants
│   │   ├── logger.js                     # Logging utility
│   │   └── helpers.js                    # Helper functions
│   │
│   ├── uploads/                          # File uploads
│   │   ├── books/
│   │   │   └── covers/                   # Book cover images
│   │   └── users/
│   │       └── profiles/                 # User profile pictures
│   │
│   └── node_modules/
│
│
├── bookverse-frontend/                   # Angular Frontend
│   ├── angular.json
│   ├── package.json
│   ├── tsconfig.json
│   ├── .gitignore
│   │
│   ├── src/
│   │   ├── main.ts                       # Angular bootstrap
│   │   ├── index.html                    # Main HTML
│   │   ├── styles.css                    # Global styles (Bootstrap reference)
│   │   │
│   │   ├── app/
│   │   │   ├── app.component.ts          # Root component
│   │   │   ├── app.component.html
│   │   │   ├── app.component.css
│   │   │   ├── app.module.ts             # Root module
│   │   │   │
│   │   │   ├── layout/                   # Layout components
│   │   │   │   ├── header/
│   │   │   │   │   ├── header.component.ts
│   │   │   │   │   ├── header.component.html
│   │   │   │   │   └── header.component.css
│   │   │   │   └── footer/
│   │   │   │       ├── footer.component.ts
│   │   │   │       ├── footer.component.html
│   │   │   │       └── footer.component.css
│   │   │   │
│   │   │   ├── pages/                    # Page components
│   │   │   │   ├── home/
│   │   │   │   │   ├── home.component.ts
│   │   │   │   │   ├── home.component.html
│   │   │   │   │   └── home.component.css
│   │   │   │   ├── categories/
│   │   │   │   │   ├── categories.component.ts
│   │   │   │   │   ├── categories.component.html
│   │   │   │   │   └── categories.component.css
│   │   │   │   ├── books/
│   │   │   │   │   ├── books.component.ts
│   │   │   │   │   ├── books.component.html
│   │   │   │   │   └── books.component.css
│   │   │   │   ├── book-detail/
│   │   │   │   │   ├── book-detail.component.ts
│   │   │   │   │   ├── book-detail.component.html
│   │   │   │   │   └── book-detail.component.css
│   │   │   │   ├── moods/
│   │   │   │   │   ├── moods.component.ts
│   │   │   │   │   ├── moods.component.html
│   │   │   │   │   └── moods.component.css
│   │   │   │   ├── personalised/
│   │   │   │   │   ├── personalised.component.ts
│   │   │   │   │   ├── personalised.component.html
│   │   │   │   │   └── personalised.component.css
│   │   │   │   ├── cart/
│   │   │   │   │   ├── cart.component.ts
│   │   │   │   │   ├── cart.component.html
│   │   │   │   │   └── cart.component.css
│   │   │   │   ├── checkout/
│   │   │   │   │   ├── checkout.component.ts
│   │   │   │   │   ├── checkout.component.html
│   │   │   │   │   └── checkout.component.css
│   │   │   │   ├── auth/
│   │   │   │   │   ├── login/
│   │   │   │   │   │   ├── login.component.ts
│   │   │   │   │   │   ├── login.component.html
│   │   │   │   │   │   └── login.component.css
│   │   │   │   │   ├── register/
│   │   │   │   │   │   ├── register.component.ts
│   │   │   │   │   │   ├── register.component.html
│   │   │   │   │   │   └── register.component.css
│   │   │   │   │   └── logout/
│   │   │   │   │       └── logout.component.ts
│   │   │   │   ├── contact-us/
│   │   │   │   │   ├── contact-us.component.ts
│   │   │   │   │   ├── contact-us.component.html
│   │   │   │   │   └── contact-us.component.css
│   │   │   │   └── admin/
│   │   │   │       ├── admin-dashboard/
│   │   │   │       │   ├── admin-dashboard.component.ts
│   │   │   │       │   ├── admin-dashboard.component.html
│   │   │   │       │   └── admin-dashboard.component.css
│   │   │   │       ├── manage-books/
│   │   │   │       │   ├── manage-books.component.ts
│   │   │   │       │   ├── manage-books.component.html
│   │   │   │       │   └── manage-books.component.css
│   │   │   │       ├── manage-genres/
│   │   │   │       ├── manage-moods/
│   │   │   │       └── manage-users/
│   │   │   │
│   │   │   ├── services/                 # Angular Services
│   │   │   │   ├── book.service.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── user.service.ts
│   │   │   │   ├── cart.service.ts
│   │   │   │   ├── order.service.ts
│   │   │   │   ├── review.service.ts
│   │   │   │   ├── genre.service.ts
│   │   │   │   ├── mood.service.ts
│   │   │   │   └── admin.service.ts
│   │   │   │
│   │   │   ├── guards/                   # Route Guards
│   │   │   │   ├── auth.guard.ts         # Protect authenticated routes
│   │   │   │   └── admin.guard.ts        # Protect admin routes
│   │   │   │
│   │   │   ├── interceptors/             # HTTP Interceptors
│   │   │   │   ├── auth.interceptor.ts   # Add JWT to requests
│   │   │   │   └── error.interceptor.ts  # Handle errors
│   │   │   │
│   │   │   ├── models/                   # TypeScript Models/Interfaces
│   │   │   │   ├── book.model.ts
│   │   │   │   ├── user.model.ts
│   │   │   │   ├── order.model.ts
│   │   │   │   ├── review.model.ts
│   │   │   │   └── genre.model.ts
│   │   │   │
│   │   │   ├── shared/                   # Shared Components
│   │   │   │   ├── book-card/
│   │   │   │   │   ├── book-card.component.ts
│   │   │   │   │   ├── book-card.component.html
│   │   │   │   │   └── book-card.component.css
│   │   │   │   ├── search-bar/
│   │   │   │   ├── filter-section/
│   │   │   │   ├── pagination/
│   │   │   │   ├── loading-spinner/
│   │   │   │   └── error-message/
│   │   │   │
│   │   │   └── routing/
│   │   │       └── app-routing.module.ts # Route definitions
│   │   │
│   │   ├── assets/                       # Static Assets
│   │   │   ├── images/
│   │   │   │   ├── logo.png
│   │   │   │   ├── books/                # Book cover images
│   │   │   │   ├── moods/                # Mood icons/images
│   │   │   │   └── categories/           # Category images
│   │   │   └── fonts/
│   │   │
│   │   ├── environments/                 # Environment configs
│   │   │   ├── environment.ts            # Development
│   │   │   └── environment.prod.ts       # Production
│   │   │
│   │   └── styles/
│   │       ├── _variables.css            # CSS variables
│   │       ├── _mixins.scss              # SCSS mixins
│   │       ├── _typography.css
│   │       ├── _layout.css
│   │       └── _components.css
│   │
│   └── node_modules/
│
├── docs/                                 # Documentation
│   ├── API_ENDPOINTS.md
│   ├── DATABASE_SCHEMA.md
│   ├── COMPONENT_STRUCTURE.md
│   └── DEPLOYMENT.md
│
├── SETUP_GUIDE.md                        # Main setup guide
├── MONGODB_SETUP.md                      # MongoDB configuration
├── QUICK_START.md                        # Quick start guide
├── PROJECT_STRUCTURE.md                  # This file
├── README.md                             # Project overview
└── .gitignore                            # Git ignore file
```

---

## 📝 File Templates

### Backend Model Template

Create `backend/models/Template.js`:
```javascript
const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  field1: { type: String, required: true },
  field2: { type: Number, default: 0 },
  field3: { type: mongoose.Schema.Types.ObjectId, ref: 'RefModel' },
  createdAt: { type: Date, default: Date.now }
});

// Add indexes for frequently queried fields
templateSchema.index({ field1: 1 });

module.exports = mongoose.model('Template', templateSchema);
```

### Backend Route Template

Create `backend/routes/template.js`:
```javascript
const express = require('express');
const router = express.Router();
const TemplateController = require('../controllers/templateController');
const { authenticate, authorize } = require('../middleware/auth');

// GET all
router.get('/', TemplateController.getAll);

// GET by ID
router.get('/:id', TemplateController.getById);

// CREATE (requires auth)
router.post('/', authenticate, TemplateController.create);

// UPDATE (requires auth)
router.put('/:id', authenticate, TemplateController.update);

// DELETE (requires admin)
router.delete('/:id', authenticate, authorize('admin'), TemplateController.delete);

module.exports = router;
```

### Backend Controller Template

Create `backend/controllers/templateController.js`:
```javascript
const Template = require('../models/Template');

exports.getAll = async (req, res) => {
  try {
    const items = await Template.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await Template.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const item = new Template(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await Template.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await Template.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

### Angular Service Template

Create `src/app/services/template.service.ts`:
```typescript
import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private apiUrl = `${environment.apiUrl}/templates`;
  private http: AxiosInstance = axios;

  constructor() { }

  getAll() {
    return this.http.get(this.apiUrl);
  }

  getById(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  create(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  update(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
```

### Angular Component Template

Create `src/app/pages/template/template.component.ts`:
```typescript
import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../../services/template.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  items: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private templateService: TemplateService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.templateService.getAll()
      .then(response => {
        this.items = response.data;
        this.loading = false;
      })
      .catch(error => {
        this.error = error.message;
        this.loading = false;
      });
  }
}
```

---

## 🗄️ MongoDB Collections Map

```
bookverse/
├── users (user accounts)
├── admins (admin accounts)
├── books (book catalog)
├── genres (book categories)
├── moods (mood tags)
├── keywords (search keywords)
├── orders (purchase orders)
├── order_items (items in orders)
├── reviews (book reviews)
└── carts (shopping carts)
```

---

## 🔗 Relationships

```
User
  ├── Orders (1:Many)
  ├── Reviews (1:Many)
  └── Cart (1:1)

Book
  ├── Genre (Many:1)
  ├── Moods (Many:Many)
  ├── Keywords (Many:Many)
  ├── Orders (1:Many)
  ├── Reviews (1:Many)
  └── Cart Items (1:Many)

Order
  ├── User (Many:1)
  ├── OrderItems (1:Many)
  └── OrderItems.Book (Many:1)

Review
  ├── Book (Many:1)
  └── User (Many:1)
```

---

## 📦 Key Files to Create First

### Phase 1: Core Setup (Week 1)
1. `backend/server.js`
2. `backend/config/database.js`
3. `backend/models/*` (all models)
4. `backend/.env`
5. `bookverse-frontend/src/environments/environment.ts`

### Phase 2: Backend API (Week 2)
1. `backend/controllers/*`
2. `backend/routes/*`
3. `backend/middleware/*`

### Phase 3: Frontend UI (Week 3-4)
1. Angular components
2. Services
3. Routing module

### Phase 4: Authentication (Week 4)
1. Auth middleware
2. Auth routes
3. Auth guard

### Phase 5: Advanced Features (Week 5-6)
1. Cart system
2. Checkout/Payment
3. Admin panel
4. Reviews

---

## 🎯 Development Workflow

1. **Define Model** → Create in `models/`
2. **Create Route** → Add to `routes/`
3. **Write Controller** → Add to `controllers/`
4. **Expose API** → Register in `server.js`
5. **Create Service** → Add to Angular `services/`
6. **Build Component** → Add to Angular `pages/`
7. **Add Routing** → Update `app-routing.module.ts`
8. **Test** → Use Postman/curl for API, browser for UI

---

**This structure follows industry best practices and ensures scalability! 🚀**
