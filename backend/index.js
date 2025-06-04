const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const supabase = require('./supabase');
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes); // Ahora /api/login funcionará

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});

app.get('/test-supabase', async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').select('*').limit(1);
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    console.error('Error al conectar con Supabase:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});
