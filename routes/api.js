const router = require('express').Router();
const {
    getConfig,
    getCampamentos,
    getActiveCampamentos,
    getProximosCampamentos,
    getCatequesis,
    getActiveCatequesis,
    getEscuela,
    getGruposOracion,
    getConsejeria,
    getContactos,
    getPastoral,
    getDestacados
} = require('../utils/config');

router.get('/config', (req, res) => {
    try {
        const config = getConfig();
        res.json(config);
    } catch (error) {
        res.status(500).json({ error: 'Error al cargar configuración' });
    }
});

router.get('/campamentos', (req, res) => {
    try {
        const campamentos = getCampamentos();
        res.json({ items: campamentos });
    } catch (error) {
        res.status(500).json({ error: 'Error al cargar campamentos', items: [] });
    }
});

router.get('/campamentos/activos', (req, res) => {
    try {
        const campamentos = getActiveCampamentos();
        res.json({ items: campamentos });
    } catch (error) {
        res.status(500).json({ error: 'Error al cargar campamentos', items: [] });
    }
});

router.get('/campamentos/proximos', (req, res) => {
    try {
        const campamentos = getProximosCampamentos();
        res.json({ items: campamentos });
    } catch (error) {
        res.status(500).json({ error: 'Error al cargar campamentos', items: [] });
    }
});

router.get('/catequesis', (req, res) => {
    try {
        const catequesis = getCatequesis();
        res.json({ items: catequesis });
    } catch (error) {
        res.status(500).json({ error: 'Error al cargar catequesis', items: [] });
    }
});

router.get('/catequesis/activas', (req, res) => {
    try {
        const catequesis = getActiveCatequesis();
        res.json({ items: catequesis });
    } catch (error) {
        res.status(500).json({ error: 'Error al cargar catequesis', items: [] });
    }
});

router.get('/contactos', (req, res) => {
    try {
        const contactos = getContactos();
        res.json(contactos);
    } catch (error) {
        res.status(500).json({ error: 'Error al cargar contactos' });
    }
});

router.get('/destacados', (req, res) => {
    try {
        const destacados = getDestacados();
        res.json({ items: destacados });
    } catch (error) {
        res.status(500).json({ error: 'Error al cargar destacados', items: [] });
    }
});

module.exports = router;