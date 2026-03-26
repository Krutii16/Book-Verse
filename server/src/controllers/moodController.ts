import { Request, Response } from 'express';
import Mood from '../models/Mood';

export const getAllMoods = async (req: Request, res: Response) => {
  try {
    const moods = await Mood.find();
    res.json({ moods });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createMood = async (req: Request, res: Response) => {
  try {
    const { name, description, icon } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name required' });
    }

    const mood = new Mood({ name, description, icon });
    await mood.save();
    res.status(201).json({ message: 'Mood created', mood });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateMood = async (req: Request, res: Response) => {
  try {
    const mood = await Mood.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!mood) {
      return res.status(404).json({ error: 'Mood not found' });
    }
    res.json({ message: 'Mood updated', mood });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteMood = async (req: Request, res: Response) => {
  try {
    const mood = await Mood.findByIdAndDelete(req.params.id);
    if (!mood) {
      return res.status(404).json({ error: 'Mood not found' });
    }
    res.json({ message: 'Mood deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
