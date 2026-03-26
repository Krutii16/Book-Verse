export interface IBook {
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

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  city?: string;
  zipcode?: string;
  country?: string;
  isAdmin: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IOrder {
  _id?: string;
  userId: string;
  books: Array<{
    bookId: string;
    quantity: number;
    price: number;
  }>;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  shippingAddress: string;
  paymentMethod: string;
  orderDate?: Date;
  deliveryDate?: Date;
}

export interface IReview {
  _id?: string;
  bookId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt?: Date;
}

export interface ICartItem {
  _id?: string;
  userId: string;
  bookId: string;
  quantity: number;
  addedAt?: Date;
}

export interface IGenre {
  _id?: string;
  name: string;
  description?: string;
  createdAt?: Date;
}

export interface IMood {
  _id?: string;
  name: string;
  description?: string;
  icon?: string;
  createdAt?: Date;
}

export interface IKeyword {
  _id?: string;
  name: string;
  category?: string;
  createdAt?: Date;
}

export interface IAdmin {
  _id?: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'super-admin';
  createdAt?: Date;
}
