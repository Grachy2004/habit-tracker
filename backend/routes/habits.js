const express = require('express');
const router = express.Router();
const supabase = require('../supabase');

// Obtener hábitos de un usuario
router.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const { data, error } = await supabase
    .from('habits')
    .select('*')
    .eq('user_id', user_id);
  res.json({ data, error });
});

// Crear un nuevo hábito
router.post('/', async (req, res) => {
  const { user_id, name } = req.body;
  const { data, error } = await supabase
    .from('habits')
    .insert([{ user_id, name }]);
  res.json({ data, error });
});

// Registrar hábito completado
router.post('/complete', async (req, res) => {
  const { user_id, habit_id, date, completed } = req.body;
  const { data, error } = await supabase
    .from('habit_entries')
    .insert([{ user_id, habit_id, date, completed }]);
  res.json({ data, error });
});

module.exports = router;
