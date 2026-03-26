import { Request, Response } from 'express';
import Book from '../models/Book';

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const skip = (page - 1) * limit;

    const books = await Book.find().skip(skip).limit(limit);
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
    const book = await Book.findById(req.params.id);
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
      genre: genreId
    }).populate('genre', 'name');

    res.json({ books });

  } catch (error) {
    res.status(500).json({ error: 'Error fetching books by genre' });
  }
};
export const searchBooks = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Search query required' });
    }

    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    });

    res.json({ books });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const filterBooks = async (req: Request, res: Response) => {
  try {
    const { genre, minPrice, maxPrice, moods } = req.query;

    const filter: any = {};

    if (genre) filter.genre = genre;

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (moods) {
      filter.moods = { $in: [moods] };
    }

    const books = await Book.find(filter);

    res.json({ books });

  } catch (error: any) {
    res.status(500).json({ error: error.message });
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
    const books = await Book.find().limit(12);
    res.json({ books });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, genre } = req.body;

    const newBook = new Book({
      ...req.body,
      genre // should be array of Genre IDs
    });

    await newBook.save();

    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: 'Error creating book' });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
