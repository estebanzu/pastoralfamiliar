require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const ejsLayouts = require('express-ejs-layouts');
const supabase = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(ejsLayouts);
app.set('layout', 'layout');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware de analíticas
app.use(async (req, res, next) => {
    try {
        await supabase.from('visit_logs').insert([{ ruta: req.originalUrl }]);
    } catch (e) {}
    next();
});

// Rutas
app.use('/', require('./routes/index'));
app.use('/api/feedback', require('./routes/feedback'));
app.use('/api/rss', require('./routes/rss'));
app.use('/api', require('./routes/api'));

if (require.main === module) {
    app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
}

module.exports = app;
