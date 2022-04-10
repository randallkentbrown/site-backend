const database = require("../database/database.js");
const prioritySort = require("../util/priority.js").prioritySort;

// Deploy
const pages = async (req, res) => {
    if (!(req.query.legacy === true)) {
        let pages = await database.getPages();
        if (!pages) {
            pages = {
                "page": {
                    "id": "no-pages-error",
                    "title": "No page data was available from the database."
                }
            }
        }
        pages = Object.values(pages);
        res.status(200).send(pages);
    } else {
        let directory = Object.values(database.getPages());
        prioritySort(directory);
        res.status(200).send(directory);
    }
}

exports.route = pages;