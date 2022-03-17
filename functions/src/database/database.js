const firebase = require('firebase');
require('firebase/database');
const config = require("./config.js").config;

firebase.initializeApp(config);

const database = firebase.database();

const siteDataTunnel = database.ref().child('siteData');
const siteData = {
    data: null,
    loaded: false
};

const databaseElements = {
    directory: () => { return siteDataTunnel.child('pages'); },
    resumeURI: () => { return siteDataTunnel.child('resume'); },
    writer: () => { return database.ref().child('status'); }
}

const data = {
    directory: null,
    resumeURI: null
};

// handler for changes to the database elements (JSON children)
siteDataTunnel.on('value', snap => { siteData = snap.val(); });
databaseElements.directory().on('value', snap => { data.directory = snap.val(); });
databaseElements.resumeURI().on('value', snap => { data.resumeURI = snap.val(); });

// TODO: Refactor this to easily extend new database entries!

const fetchSiteData = async () => {
    const dataOnce = await siteData.once('value');
    if (dataOnce.exists()) {
        siteData.data = dataOnce.val();
    }
}

const fetchDirectory = async () => {
    const directoryOnce = await databaseElements.directory().once('value');
    if(directoryOnce.exists()) {
        data.directory = directoryOnce.val();
    }
}

const fetchResumeURI = async () => {
    const resumeURIOnce = await databaseElements.resumeURI().once('value');
    if (resumeURIOnce.exists()) {
        data.resumeURI = resumeURIOnce.val();
    }
}

const getPages = async () => {
    if (!siteData.loaded) {
        siteData.loaded = true;
        await fetchSiteData();
    }
    if (siteData.data) {
        if (!siteData.data.pages) {
            return siteData.data;
        }
        return siteData.data.pages;
    }
    return null;
}

const getDirectory = async () => {
    if (data.directory === null) {
        await fetchDirectory();
    }
    return data.directory;
};

const getResumeURI = async () => {
    if (data.resumeURI === null) {
        await fetchResumeURI();
    }
    return data.resumeURI;
}

exports.getDirectory = getDirectory;
exports.getResumeURI = getResumeURI;
exports.getPages = getPages;