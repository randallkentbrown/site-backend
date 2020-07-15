const functions = require('firebase-functions');

const configData = {
    apiKey: functions.config().my.apikey,
    projectId: functions.config().my.projectid
}

const config = {
    apiKey: configData.apiKey,
    authDomain: `${configData.projectId}.firebaseapp.com`,
    databaseURL: `${configData.projectId}.firebaseio.com`,
    storageBucket: `${configData.projectId}.appspot.com`
};

exports.config = config;