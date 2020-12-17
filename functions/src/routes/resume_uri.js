const database = require("../database/database.js");

// Deploy
const resume = async (req, res) => {
    var resume_uri = await database.getResumeURI();
    res.status(200).send(resume_uri);
}

exports.route = resume;