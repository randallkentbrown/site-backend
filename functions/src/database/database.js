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
    resumeURI: null
};

// handler for changes to the database elements (JSON children)
siteDataTunnel.on('value', snap => { siteData.data = snap.val(); });
databaseElements.resumeURI().on('value', snap => { data.resumeURI = snap.val(); });

// TODO: Refactor this to easily extend new database entries!

const fetchSiteData = async () => {
    const dataOnce = await siteDataTunnel.once('value');
    if (dataOnce.exists()) {
        siteData.data = dataOnce.val();
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
        await fetchSiteData();
        siteData.loaded = true;
    }
    if (siteData.data) {
        if (siteData.data.pages) {
            return siteData.data.pages;
        }
        return siteData.data;
    }
    return [];
}

const getResumeURI = async () => {
    if (data.resumeURI === null) {
        await fetchResumeURI();
    }
    return data.resumeURI;
}

exports.getDirectory = getPages;
exports.getResumeURI = getResumeURI;
exports.getPages = getPages;