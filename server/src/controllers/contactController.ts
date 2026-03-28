import { Request, Response } from 'express';
import { Contact } from '../models/contact';

// Save contact message
export const createContact = async (req: Request, res: Response) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving message' });
  }
};

// Get all messages (Admin)
export const getContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
};