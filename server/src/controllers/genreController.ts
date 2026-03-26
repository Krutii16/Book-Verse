import { Request, Response } from 'express';
import Genre from '../models/Genre';

export const getAllGenres = async (req: Request, res: Response) => {
  try {
    const genres = await Genre.find();
    res.json({ genres });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createGenre = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name required' });
    }

    const genre = new Genre({ name, description });
    await genre.save();
    res.status(201).json({ message: 'Genre created', genre });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateGenre = async (req: Request, res: Response) => {
  try {
    const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!genre) {
      return res.status(404).json({ error: 'Genre not found' });
    }
    res.json({ message: 'Genre updated', genre });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteGenre = async (req: Request, res: Response) => {
  try {
    const genre = await Genre.findByIdAndDelete(req.params.id);
    if (!genre) {
      return res.status(404).json({ error: 'Genre not found' });
    }
    res.json({ message: 'Genre deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
