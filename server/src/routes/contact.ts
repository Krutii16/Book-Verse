import express from 'express';
import { createContact, getContacts } from '../controllers/contactController';

const router = express.Router();

router.post('/', createContact);     // user sends message
router.get('/', getContacts);        // admin fetches

export default router;