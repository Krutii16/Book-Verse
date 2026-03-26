import { Request, Response } from 'express';
import Keyword from '../models/Keyword';

export const getAllKeywords = async (req: Request, res: Response) => {
  try {
    const keywords = await Keyword.find();
    res.json({ keywords });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createKeyword = async (req: Request, res: Response) => {
  try {
    const { name, category } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name required' });
    }

    const keyword = new Keyword({ name, category });
    await keyword.save();
    res.status(201).json({ message: 'Keyword created', keyword });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateKeyword = async (req: Request, res: Response) => {
  try {
    const keyword = await Keyword.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!keyword) {
      return res.status(404).json({ error: 'Keyword not found' });
    }
    res.json({ message: 'Keyword updated', keyword });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteKeyword = async (req: Request, res: Response) => {
  try {
    const keyword = await Keyword.findByIdAndDelete(req.params.id);
    if (!keyword) {
      return res.status(404).json({ error: 'Keyword not found' });
    }
    res.json({ message: 'Keyword deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
