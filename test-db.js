require('dotenv').config();
const supabase = require('./db');

async function testConnection() {
    const { data, error } = await supabase.from('eventos').select('*').limit(1);
    if (error) console.error("❌ Error conectando a Supabase:", error.message);
    else console.log("✅ Conexión exitosa a Supabase. Datos recibidos:", data);
}

testConnection();
