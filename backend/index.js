require('dotenv').config();
const express = require('express');
const cors = require('cors');


const authRoutes = require('./routes/auth');
const supabase = require('./supabase');
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes); // Ahora /api/login funcionará

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
 
//const PORT = process.env.PORT;
const PORT = process.env.PORT || 8080;
///
console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("SUPABASE_KEY:", process.env.SUPABASE_KEY ? "OK" : "Falta");
///
 

// Esto es una variable sin usar (code smell, Sonar Qube lo marcará).
const variableSinUsar = 42;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
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
