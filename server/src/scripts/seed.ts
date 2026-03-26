import mongoose from 'mongoose';
import Book from '../models/Book';
import Genre from '../models/Genre';
import Mood from '../models/Mood';
import Keyword from '../models/Keyword';

const sampleBooks = [
  {
    title: 'The Midnight Library',
    author: 'Matt Haig',
    isbn: '978-0020195467',
    description: 'A mind-bending novel about infinite possibilities and second chances.',
    price: 16.99,
    rating: 4.5,
    reviews: 3420,
    image: 'https://via.placeholder.com/300x400?text=Midnight+Library',
    genre: 'Fiction',
    language: 'English',
    pages: 304,
    publisher: 'Viking',
    year: 2020,
    moods: ['Philosophical', 'Uplifting'],
    keywords: ['Second Chances', 'Alternate Reality', 'Self-discovery'],
    inStock: true,
    quantity: 50,
    bestseller: true
  },
  {
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    isbn: '978-0593135205',
    description: 'A gripping space survival story with humor and heart.',
    price: 18.99,
    rating: 4.8,
    reviews: 5120,
    image: 'https://via.placeholder.com/300x400?text=Hail+Mary',
    genre: 'Science Fiction',
    language: 'English',
    pages: 476,
    publisher: 'Ballantine Books',
    year: 2021,
    moods: ['Adventurous', 'Humorous'],
    keywords: ['Space', 'Survival', 'Science'],
    inStock: true,
    quantity: 45,
    bestseller: true
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    isbn: '978-0735211292',
    description: 'Transform your habits and become the best version of yourself.',
    price: 17.99,
    rating: 4.7,
    reviews: 8950,
    image: 'https://via.placeholder.com/300x400?text=Atomic+Habits',
    genre: 'Self-Help',
    language: 'English',
    pages: 320,
    publisher: 'Avery',
    year: 2018,
    moods: ['Motivational', 'Practical'],
    keywords: ['Habits', 'Self-improvement', 'Psychology'],
    inStock: true,
    quantity: 60,
    bestseller: true
  },
  {
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    isbn: '978-0743299144',
    description: 'A captivating tale of Old Hollywood glamour and secrets.',
    price: 17.99,
    rating: 4.6,
    reviews: 6780,
    image: 'https://via.placeholder.com/300x400?text=Seven+Husbands',
    genre: 'Historical Fiction',
    language: 'English',
    pages: 400,
    publisher: 'Washington Square Press',
    year: 2017,
    moods: ['Glamorous', 'Mysterious'],
    keywords: ['Hollywood', 'Secrets', 'History'],
    inStock: true,
    quantity: 40,
    bestseller: true
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    isbn: '978-0441172719',
    description: 'An epic science fiction masterpiece of politics and power.',
    price: 16.99,
    rating: 4.9,
    reviews: 4230,
    image: 'https://via.placeholder.com/300x400?text=Dune',
    genre: 'Science Fiction',
    language: 'English',
    pages: 688,
    publisher: 'Ace',
    year: 1965,
    moods: ['Epic', 'Intense'],
    keywords: ['Space', 'Politics', 'Power'],
    inStock: true,
    quantity: 55,
    bestseller: true
  },
  {
    title: 'Educated',
    author: 'Tara Westover',
    isbn: '978-0399590504',
    description: 'A memoir about education, family, and breaking free.',
    price: 18.99,
    rating: 4.5,
    reviews: 7620,
    image: 'https://via.placeholder.com/300x400?text=Educated',
    genre: 'Memoir',
    language: 'English',
    pages: 352,
    publisher: 'Random House',
    year: 2018,
    moods: ['Inspiring', 'Thought-provoking'],
    keywords: ['Education', 'Family', 'Personal Growth'],
    inStock: true,
    quantity: 50,
    bestseller: true
  }
];

const sampleGenres = [
  { name: 'Fiction', description: 'Imaginative stories and novels' },
  { name: 'Science Fiction', description: 'Futuristic and speculative fiction' },
  { name: 'Mystery', description: 'Detective and crime stories' },
  { name: 'Romance', description: 'Love and relationship stories' },
  { name: 'Self-Help', description: 'Personal development and improvement' },
  { name: 'Historical Fiction', description: 'Stories set in historical periods' },
  { name: 'Fantasy', description: 'Magical and mythical worlds' },
  { name: 'Non-Fiction', description: 'True stories and facts' }
];

const sampleMoods = [
  { name: 'Uplifting', description: 'Feel-good and inspiring stories', icon: '😊' },
  { name: 'Adventurous', description: 'Action-packed and thrilling', icon: '🚀' },
  { name: 'Humorous', description: 'Funny and lighthearted', icon: '😂' },
  { name: 'Mysterious', description: 'Intriguing and suspenseful', icon: '🔍' },
  { name: 'Romantic', description: 'Love-filled and emotional', icon: '💕' },
  { name: 'Philosophical', description: 'Thought-provoking and deep', icon: '🧠' },
  { name: 'Epic', description: 'Grand and impressive', icon: '👑' },
  { name: 'Intense', description: 'Serious and gripping', icon: '⚡' },
  { name: 'Cozy', description: 'Warm and comfortable', icon: '☕' },
  { name: 'Motivational', description: 'Inspiring and empowering', icon: '💪' }
];

const sampleKeywords = [
  { name: 'Dystopia', category: 'Genre' },
  { name: 'Love Story', category: 'Theme' },
  { name: 'Coming of Age', category: 'Theme' },
  { name: 'Mystery Thriller', category: 'Genre' },
  { name: 'World Building', category: 'Style' },
  { name: 'Character Driven', category: 'Style' },
  { name: 'Fast-paced', category: 'Pace' },
  { name: 'Thought-provoking', category: 'Theme' },
  { name: 'Standalone', category: 'Series' },
  { name: 'Series', category: 'Series' },
  { name: 'Award Winner', category: 'Recognition' },
  { name: 'Bestseller', category: 'Recognition' }
];

async function seed() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookverse';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Book.deleteMany({}),
      Genre.deleteMany({}),
      Mood.deleteMany({}),
      Keyword.deleteMany({})
    ]);
    console.log('Cleared existing data');

    // Seed genres
    const genres = await Genre.insertMany(sampleGenres);
    console.log(`Created ${genres.length} genres`);

    // Seed moods
    const moods = await Mood.insertMany(sampleMoods);
    console.log(`Created ${moods.length} moods`);

    // Seed keywords
    const keywords = await Keyword.insertMany(sampleKeywords);
    console.log(`Created ${keywords.length} keywords`);

    // Seed books
    const books = await Book.insertMany(sampleBooks);
    console.log(`Created ${books.length} books`);

    console.log('Seed data inserted successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();
