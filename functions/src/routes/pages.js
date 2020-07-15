const database = require("../database/database.js");

// Deploy
const pages = async (req, res) => {
    var directory = await database.getDirectory();
    if (!(req.query.obj === 'true')) {
        directory = Object.values(directory);
        directory = directory.sort((a, b) => {
            return a.number - b.number;
        });
    }
    res.status(200).send(directory);
}

exports.route = pages;