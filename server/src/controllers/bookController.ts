import { Request, Response } from 'express';
import Book from '../models/Book';
import Mood from '../models/Mood';
import Genre from "../models/Genre";
/**
 * Get all books with pagination
 */
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const skip = (page - 1) * limit;

    const books = await Book.find()
      .populate('genre', 'name')
      .populate('moods', 'name')
      .skip(skip)
      .limit(limit);

    const total = await Book.countDocuments();

    res.json({
      books,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const searchBooks = async (req: any, res: any) => {
  try {
    const query = req.query.query;

    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } }
      ]
    })
      .populate('genre', 'name')
      .populate('moods', 'name');

    res.json({ books });
  } catch (error) {
    res.status(500).json({ error: 'Search failed' });
  }
};

/**
 * Get book by ID
 */
export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('genre', 'name')
      .populate('moods', 'name');

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({ book });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get books by genre
 */
export const getBooksByGenre = async (req: Request, res: Response) => {
  try {
    const genreId = req.params.genreId;

    const books = await Book.find({
      genre: { $in: [genreId] }
    })
      .populate('genre', 'name')
      .populate('moods', 'name');

    res.json({ books });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching books by genre' });
  }
};

/**
 * Filter books 
 */
export const filterBooks = async (req: Request, res: Response) => {
  try {
    const { moods, minPrice, maxPrice } = req.query;
    const genre = req.query.genre as string | string[];
    const filter: any = {};

   if (genre) {
  const genreValues: string[] = Array.isArray(genre)
    ? genre
    : typeof genre === 'string'
      ? genre.split(',') // ✅ IMPORTANT FIX
      : [];

  const isObjectId = (val: string) =>
    /^[0-9a-fA-F]{24}$/.test(val);

  let genreIds: any[] = [];

  if (isObjectId(genreValues[0])) {
    genreIds = genreValues;
  } else {
    const genreDocs = await Genre.find({
      name: { $in: genreValues }
    });

    genreIds = genreDocs.map(g => g._id);
  }

  filter.genre = { $in: genreIds };
}
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

   if (moods) {
  const moodValues = Array.isArray(moods)
    ? moods.map(m => String(m))
    : [String(moods)];

  const isObjectId = (val: string) => /^[0-9a-fA-F]{24}$/.test(val);

  let moodIds: any[] = [];

  if (isObjectId(moodValues[0])) {
    moodIds = moodValues;
  } else {
    const moodDocs = await Mood.find({
      name: { $in: moodValues }
    });

    moodIds = moodDocs.map(m => m._id);
  }

  filter.moods = { $in: moodIds };
}

    const books = await Book.find(filter)
      .populate('genre', 'name')
      .populate('moods', 'name');

    res.json({ books });

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Featured books
 */
export const getFeaturedBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find()
      .sort({ createdAt: -1 })
      .limit(12)
      .populate('genre', 'name')
      .populate('moods', 'name');

    res.json({ books });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching featured books' });
  }
};

/**
 * Bestseller books
 */
export const getBestsellers = async (req: Request, res: Response) => {
  try {
    const books = await Book.find({ bestseller: true })
      .limit(20)
      .populate('genre', 'name')
      .populate('moods', 'name');

    res.json({ books });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching bestsellers' });
  }
};

/**
 * Create book
 */
export const createBook = async (req: Request, res: Response) => {
  try {
    let { genre } = req.body;

    if (!Array.isArray(genre)) {
      genre = [genre];
    }

    const newBook = new Book({
      ...req.body,
      genre
    });

    await newBook.save();

    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding book' });
  }
};

/**
 * Update book
 */
export const updateBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate('genre', 'name')
      .populate('moods', 'name');

    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Error updating book' });
  }
};

/**
 * Delete book
 */
export const deleteBook = async (req: Request, res: Response) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting book' });
  }
};