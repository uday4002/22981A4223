const logData = require("./log");

const logger = (packageType, level = "info") => async (req, res, next) => {
    try {
        const message = `${req.method} ${req.originalUrl}`;
        await logData("backend", level, packageType, message);
    } catch (e) {
        // do not block
    }
    next();
};

module.exports = logger;
