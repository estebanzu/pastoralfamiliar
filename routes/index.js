const router = require('express').Router();
const {
    getConfig,
    getCampamentos,
    getCampamentoById,
    getActiveCampamentos,
    getProximosCampamentos,
    getCatequesis,
    getCatequesisById,
    getActiveCatequesis,
    getEscuela,
    getGruposOracion,
    getConsejeria,
    getContactos,
    getPastoral,
    getDestacados
} = require('../utils/config');

router.get('/', (req, res) => {
    const destacados = getDestacados();
    const pastoral = getPastoral();
    res.render('index', { title: 'Inicio', destacados, pastoral });
});

router.get('/contacto', (req, res) => {
    const contactos = getContactos();
    const pastoral = getPastoral();
    res.render('contacto', { title: 'Contacto', contactos, pastoral });
});

router.get('/retiro-de-parejas', (req, res) => {
    const campamentos = getProximosCampamentos();
    const campamento = campamentos[0] || getCampamentos()[0];
    res.render('retiro-de-parejas', { title: 'Campamento de Parejas', campamento });
});

router.get('/escuela-para-padres', (req, res) => {
    const escuela = getEscuela();
    res.render('escuela-para-padres', { title: 'Escuela para Padres', escuela });
});

router.get('/grupos-de-oracion', (req, res) => {
    const grupos = getGruposOracion();
    res.render('grupos-de-oracion', { title: 'Grupos de Oración', grupos });
});

router.get('/inscripcion-retiro', (req, res) => {
    const campamentos = getCampamentos();
    const campamento = campamentos[0];
    res.render('inscripcion-retiro', { title: 'Inscripción Campamento', campamento });
});

router.get('/catequesis-prematrimonial', (req, res) => {
    const catequesis = getCatequesis();
    const prematrimonial = catequesis.find(c => c.id.includes('prematrimonial')) || catequesis[0];
    res.render('catequesis-prematrimonial', { title: 'Catequesis Prematrimonial', catequesis: prematrimonial });
});

router.get('/inscripcion-catequesis', (req, res) => {
    const catequesis = getCatequesis();
    const prematrimonial = catequesis.find(c => c.id.includes('prematrimonial')) || catequesis[0];
    res.render('inscripcion-catequesis', { title: 'Inscripción Catequesis', catequesis: prematrimonial });
});

router.get('/evangelio', (req, res) => {
    res.render('evangelio', { title: 'Evangelio del Día' });
});

router.get('/recursos', (req, res) => {
    res.render('recursos', { title: 'Recursos' });
});

router.get('/consejeria-matrimonial', (req, res) => {
    const consejeria = getConsejeria();
    res.render('consejeria-matrimonial', { title: 'Consejería Matrimonial', consejeria });
});

router.get('/quienes-somos', (req, res) => {
    const pastoral = getPastoral();
    res.render('quienes-somos', { title: 'Quiénes Somos', pastoral });
});

router.get('/misa-en-vivo', (req, res) => {
    res.render('misa-en-vivo', { title: 'Misa en Vivo' });
});

module.exports = router;