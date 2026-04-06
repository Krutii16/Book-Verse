import { Request, Response } from 'express';
import Book from '../models/Book';

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
    }).populate('genre', 'name').populate('moods', 'name');

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
      .populate('genre', 'name').populate('moods', 'name');

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
      genre: genreId
    }).populate('genre', 'name').populate('moods', 'name');

    res.json({ books });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching books by genre' });
  }
};
export const filterBooks = async (req: Request, res: Response) => {
  try {
    const { moods, genre, minPrice, maxPrice } = req.query;

    const filter: any = {};

    if (genre) filter.genre = { $in: Array.isArray(genre) ? genre : [genre] };

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (moods) {
      filter.moods = { $in: [moods] };
    }

    const books = await Book.find(filter)
      .populate('genre', 'name').populate('moods', 'name');

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
      .populate('genre', 'name').populate('moods', 'name');

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
    ).populate('genre', 'name').populate('moods', 'name');

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