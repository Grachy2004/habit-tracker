const express = require('express');
const router = express.Router();
const supabase = require('../supabase'); // ✅ Usa el cliente de supabase.js

// Registro
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email y contraseña requeridos' });
  }

  const { data, error } = await supabase
    .from('users')
    .insert([{ email, password }]);

  if (error) return res.status(400).json({ success: false, error: error.message });
  res.json({ success: true, data });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .eq('password', password)
    .single();

  if (error || !data) {
    return res.status(401).json({ success: false, error: 'Login incorrecto' });
  }

  res.json({ success: true, user: data });
});

module.exports = router;
