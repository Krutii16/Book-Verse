import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { ManageBooksComponent } from './features/admin/admin-dashboard/manage-books.component';
import { ManageCategoriesComponent } from './features/admin/admin-dashboard/manage-categories.component';
import { ManageMoodsComponent } from './features/admin/admin-dashboard/manage-mood.component';
import { ManageContactComponent } from './features/admin/admin-dashboard/manage-contact.component';
import { ManageOrdersComponent } from './features/admin/admin-dashboard/manage-orders.component';
import { MyOrdersComponent } from './features/orders/my-orders.component';
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'books',
    loadComponent: () => import('./features/books/books.component').then(m => m.BooksComponent)
  },
  {
    path: 'books/:id',
    loadComponent: () => import('./features/books/book-detail/book-detail.component').then(m => m.BookDetailComponent)
  },
  {
    path: 'categories',
    loadComponent: () => import('./features/categories/categories.component').then(m => m.CategoriesComponent)
  },
  {
    path: 'bestsellers',
    loadComponent: () => import('./features/bestsellers/bestsellers.component').then(m => m.BestsellersComponent)
  },
  {
    path: 'moods',
    loadComponent: () => import('./features/moods/moods.component').then(m => m.MoodsComponent)
  },
  {
    path: 'my-orders',
    component: MyOrdersComponent
  },
  {
    path: 'personalised',
    loadComponent: () => import('./features/personalised/personalised.component').then(m => m.PersonalisedComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'checkout',
    loadComponent: () => import('./features/checkout/checkout.component').then(m => m.CheckoutComponent),
    canActivate: [AuthGuard]
  },
  {
  path: 'admin/manage-contact',
  component: ManageContactComponent
},
{
  path: 'admin/manage-orders',
  component: ManageOrdersComponent
},

  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/register/register.component').then(m => m.RegisterComponent)
  },
  {
  path: 'admin/categories',
  component: ManageCategoriesComponent
},
{
  path: 'books/genre/:genreId',
  loadComponent: () => import('./features/books/books.component').then(m => m.BooksComponent)
},
{
  path: 'admin/users',
  loadComponent: () => import('./features/admin/admin-dashboard/manage-users.component')
    .then(m => m.ManageUsersComponent)
},
{
  path: 'admin/mood',
  component: ManageMoodsComponent
},
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./features/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
      },
      
      ]
  },
  {
  path: 'admin/books',
  component: ManageBooksComponent,
  canActivate: [AuthGuard]
},
  {
    path: '**',
    redirectTo: ''
  }
];
