export interface Book {
  _id?: string;
  title: string;
  author: string;
  isbn: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  genre: string;
  language: string;
  pages: number;
  publisher: string;
  year: number;
  moods: string[];
  keywords: string[];
  inStock: boolean;
  quantity: number;
  discount?: number;
  bestseller: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  zipcode?: string;
  country?: string;
  isAdmin: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CartItem {
  _id?: string;
  book: Book;
  quantity: number;
  itemTotal: number;
}

export interface Order {
  _id?: string;
  userId: string;
  books: any[];
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  shippingAddress: string;
  paymentMethod: string;
  createdAt?: Date;
  deliveryDate?: Date;
}

export interface Review {
  _id?: string;
  bookId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt?: Date;
}

export interface Genre {
  _id?: string;
  name: string;
  description?: string;
  createdAt?: Date;
}

export interface Mood {
  _id?: string;
  name: string;
  description?: string;
  icon?: string;
  createdAt?: Date;
}
