const firebase = require('firebase');
require('firebase/database');
const config = require("./config.js").config;

firebase.initializeApp(config);

const database = firebase.database();

const queries = {
    directory: () => { return database.ref().child('directory'); },
    writer: () => { return database.ref().child('status'); }
}

const data = {
    directory: null
};

queries.directory().on('value', snap => { data.directory = snap.val(); });

const fetchDirectory = async () => {
    const directoryOnce = await queries.directory().once('value');
    if(directoryOnce.exists()) {
        data.directory = directoryOnce.val();
    }
}

const getDirectory = async () => {
    if (data.directory === null) {
        await fetchDirectory();
    }
    return data.directory;
};

exports.getDirectory = getDirectory;