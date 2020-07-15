const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true)
  }
}

const accessControl = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Expose-Headers", "Access-Control-Allow-Origin");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Cache-Control", "no-store");
    next();
};

exports.corsOptions = corsOptions;
exports.accessControl = accessControl;