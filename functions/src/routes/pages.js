const database = require("../database/database.js");
const processor = require("../util/page_prio.js").processPages;

// Deploy
const pages = async (req, res) => {
    var directory = await database.getDirectory();
    if (!(req.query.obj === 'true')) {
        directory = Object.values(directory);
        directory = processor(directory);
    }
    res.status(200).send(directory);
}

exports.route = pages;