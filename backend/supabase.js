//require('dotenv').config(); // asegúrate de que esto esté aquí
require('dotenv').config({ path: './.env' }); // CORRECTO para tu caso

const { createClient } = require('@supabase/supabase-js');

console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
console.log('SUPABASE_KEY:', process.env.SUPABASE_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
module.exports = supabase;
