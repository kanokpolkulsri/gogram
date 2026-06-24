import express from 'express';
import { query } from '../db/index.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Retrieve all categories
router.get('/categories', authenticate, async (req, res) => {
  try {
    const categoriesRes = await query('SELECT * FROM categories ORDER BY id');
    // Map to camelCase expected by the frontend
    const categories = categoriesRes.rows.map(c => ({
      id: c.id,
      title: c.title,
      description: c.description,
      color: c.color,
      iconChar: c.icon_char
    }));
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Server error while fetching categories' });
  }
});

// Retrieve units for a specific category with levels
router.get('/units', authenticate, async (req, res) => {
  const { categoryId } = req.query;
  if (!categoryId) {
    return res.status(400).json({ error: 'categoryId parameter is required' });
  }

  try {
    // 1. Fetch units for category ordered by unit_number
    const unitsRes = await query(
      `SELECT * FROM units WHERE category_id = $1 ORDER BY unit_number`,
      [categoryId]
    );

    const units = [];

    // 2. Fetch levels for each unit and map them
    for (const unit of unitsRes.rows) {
      const levelsRes = await query(
        `SELECT id, label, icon FROM levels WHERE unit_id = $1 ORDER BY 
         CASE id 
           WHEN 'easy' THEN 1 
           WHEN 'medium1' THEN 2 
           WHEN 'medium2' THEN 3 
           WHEN 'hard1' THEN 4 
           WHEN 'hard2' THEN 5 
           ELSE 6 
         END`,
        [unit.id]
      );

      units.push({
        id: unit.id,
        category: unit.category_id,
        unitNumber: unit.unit_number,
        title: unit.title,
        section: `UNIT ${unit.unit_number}`, // Frontend expects a section field
        description: unit.description,
        color: unit.color,
        levels: levelsRes.rows.map(l => ({
          id: l.id,
          label: l.label,
          icon: l.icon
        }))
      });
    }

    res.json(units);
  } catch (error) {
    console.error('Error fetching units:', error);
    res.status(500).json({ error: 'Server error while fetching units' });
  }
});

export default router;
