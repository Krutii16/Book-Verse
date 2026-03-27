import { Request, Response } from 'express';
import Book from '../models/Book';

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const skip = (page - 1) * limit;

    const books = await Book.find()
      .populate('genre', 'name')
      .sort({ createdAt: -1 })
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

export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id).populate('genre', 'name');

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({ book });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getBooksByGenre = async (req: Request, res: Response) => {
  try {
    const genreId = req.params.genreId;

    const books = await Book.find({
      genre: { $in: [genreId] }
    }).populate('genre', 'name');

    res.json({ books });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching books by genre' });
  }
};

export const getBestsellers = async (req: Request, res: Response) => {
  try {
    const books = await Book.find({ bestseller: true }).limit(20);
    res.json({ books });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getFeaturedBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(12);
    res.json({ books });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: 'Error creating book' });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({ message: 'Book updated', book });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({ message: 'Book deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};