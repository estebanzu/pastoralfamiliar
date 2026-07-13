const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

const CONFIG_PATH = path.join(__dirname, '..', 'config.yaml');

let configCache = null;
let lastModified = null;

function loadConfig() {
    try {
        const fileContent = fs.readFileSync(CONFIG_PATH, 'utf8');
        const stats = fs.statSync(CONFIG_PATH);
        const currentModified = stats.mtimeMs;

        // Only reload if file has changed
        if (configCache && lastModified === currentModified) {
            return configCache;
        }

        configCache = YAML.parse(fileContent);
        lastModified = currentModified;

        console.log('✓ Configuración cargada desde config.yaml');
        return configCache;
    } catch (error) {
        console.error('Error al cargar config.yaml:', error.message);
        return configCache || {};
    }
}

function getConfig() {
    return loadConfig();
}

function getCampamentos() {
    const config = getConfig();
    return config.campamentos || [];
}

function getCampamentoById(id) {
    const campamentos = getCampamentos();
    return campamentos.find(c => c.id === id) || null;
}

function getActiveCampamentos() {
    const campamentos = getCampamentos();
    return campamentos.filter(c => c.estado === 'activo');
}

function getProximosCampamentos() {
    const campamentos = getCampamentos();
    return campamentos.filter(c => c.estado === 'proximamente');
}

function getCatequesis() {
    const config = getConfig();
    return config.catequesis || [];
}

function getCatequesisById(id) {
    const catequesis = getCatequesis();
    return catequesis.find(c => c.id === id) || null;
}

function getActiveCatequesis() {
    const catequesis = getCatequesis();
    return catequesis.filter(c => c.estado === 'activo');
}

function getEscuela() {
    const config = getConfig();
    return config.escuela || [];
}

function getGruposOracion() {
    const config = getConfig();
    return config.gruposOracion || [];
}

function getConsejeria() {
    const config = getConfig();
    return config.consejeria || [];
}

function getContactos() {
    const config = getConfig();
    return config.contactos || {};
}

function getPastoral() {
    const config = getConfig();
    return config.pastoral || {};
}

function getDestacados() {
    const config = getConfig();
    const destacados = [];

    if (config.campamentos) {
        config.campamentos
            .filter(c => c.destacado)
            .forEach(c => destacados.push({ ...c, tipo: 'campamento' }));
    }

    if (config.escuela) {
        config.escuela
            .filter(e => e.destacado)
            .forEach(e => destacados.push({ ...e, tipo: 'escuela' }));
    }

    if (config.gruposOracion) {
        config.gruposOracion
            .filter(g => g.destacado)
            .forEach(g => destacados.push({ ...g, tipo: 'grupo' }));
    }

    if (config.catequesis) {
        config.catequesis
            .filter(c => c.destacado)
            .forEach(c => destacados.push({ ...c, tipo: 'catequesis' }));
    }

    if (config.consejeria) {
        config.consejeria
            .filter(c => c.destacado)
            .forEach(c => destacados.push({ ...c, tipo: 'consejeria' }));
    }

    return destacados;
}

module.exports = {
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
};