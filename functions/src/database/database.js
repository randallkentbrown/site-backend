const firebase = require('firebase');
require('firebase/database');
const config = require("./config.js").config;

firebase.initializeApp(config);

const database = firebase.database();

const queries = {
    directory: () => { return database.ref().child('directory'); },
    resumeURI: () => { return database.ref().child('resumeURI'); },
    writer: () => { return database.ref().child('status'); }
}

const data = {
    directory: null,
    resumeURI: null
};

queries.directory().on('value', snap => { data.directory = snap.val(); });
queries.resumeURI().on('value', snap => { data.resumeURI = snap.val(); });

// TODO: Refactor this to easily extend new database entries!

const fetchDirectory = async () => {
    const directoryOnce = await queries.directory().once('value');
    if(directoryOnce.exists()) {
        data.directory = directoryOnce.val();
    }
}

const fetchResumeURI = async () => {
    const resumeURIOnce = await queries.resumeURI().once('value');
    if (resumeURIOnce.exists()) {
        data.resumeURI = resumeURIOnce.val();
    }
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