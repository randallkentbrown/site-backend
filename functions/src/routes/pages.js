const database = require("../database/database.js");
const processor = require("../util/page_prio.js").processPages;

// Deploy
const pages = async (req, res) => {
    if (req.query.new) {
        let pages = await database.getPages();
        if (!pages) {
            pages = {
                "page": {
                    "id": "no-pages-error",
                    "title": "No page data was available from the database."
                }
            }
        }
        res.status(200).send(pages);
    } else {
        var directory = await database.getDirectory();
        if (!(req.query.obj === 'true')) {
            directory = Object.values(directory);
            directory = processor(directory);
        }
        res.status(200).send(directory);
    }
}

exports.route = pages;