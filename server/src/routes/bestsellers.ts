import express from 'express';
import Book from '../models/Book';

const router = express.Router();


//  GET ALL BOOKS
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().populate('genres');
    res.json({ books });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching books' });
  }
});

// Bestsellers (rating >= 4)
router.get('/bestsellers', async (req, res) => {
  try {
    const books = await Book.find({
      rating: { $gte: 4 }
    }).sort({ rating: -1 }); 

    res.json({ books });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching bestsellers' });
  }
});
//  GET UNIQUE GENRES FROM BOOKS
router.get('/genres', async (req, res) => {
  try {
    const books = await Book.find();

    // Extract genres from books
    const genres = books
      .map(book => book.genre)   
      .filter(Boolean);         

    // Remove duplicates
    const uniqueGenres = [...new Set(genres)];

    res.json({ genres: uniqueGenres });

  } catch (error) {
    res.status(500).json({ error: 'Error fetching genres' });
  }
});
//  GET SINGLE BOOK BY ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching book' });
  }
});


//  ADD BOOK
router.post('/', async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();

    res.status(201).json(savedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding book' });
  }
});


// UPDATE BOOK
router.put('/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: 'Error updating book' });
  }
});


//  DELETE BOOK
router.delete('/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting book' });
  }
});




export default router;