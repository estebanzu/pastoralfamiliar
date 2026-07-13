const router = require('express').Router();
const supabase = require('../db');

router.post('/', async (req, res) => {
    const { nombre, mensaje } = req.body;
    const { error } = await supabase.from('feedback').insert([{ nombre, mensaje }]);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ ok: true });
});

module.exports = router;
