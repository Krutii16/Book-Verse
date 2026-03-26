import express from 'express';
import User from '../models/User';

const router = express.Router();


// ✅ GET ALL USERS
router.get('/', async (req, res) => {
  try {
    const users = await User.find();

    res.json({ users });

  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});


// ✅ GET SINGLE USER
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });

  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
});


// ✅ DELETE USER
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });

  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});


export default router;