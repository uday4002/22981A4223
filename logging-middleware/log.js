const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const LOG_API_URL = 'http://20.244.56.144/evaluation-service/logs';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const ALLOWED_STACKS = ["frontend", "backend"];
const ALLOWED_LEVELS = ["debug", "info", "warn", "error", "fatal"];
const ALLOWED_PACKAGE_TYPES = ["cache", "controller", "cron_job", "db", "domain", "handler", "repository", "route", "service", "api", "component", "hook", "page", "state", "style", "auth", "config", "middleware", "util"];

function assertAllowed(value, allowedValues, name) {
    if (!allowedValues.includes(value)) {
        throw new Error(`Invalid ${name}: ${value}. Allowed values are: ${allowedValues.join(", ")}`);
    }
}

async function logData(stack, level, packageType, message) {

    assertAllowed(stack, ALLOWED_STACKS, "stack");
    assertAllowed(level, ALLOWED_LEVELS, "level");
    assertAllowed(packageType, ALLOWED_PACKAGE_TYPES, "package type");


    try {
        const payload = {
            stack,
            level,
            package: packageType,
            message,
        };

        const headers = {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
        };

        const response = await axios.post(LOG_API_URL, payload, { headers });

        return response.data;
    } catch (error) {
        return {
            success: false,
            message: error.message || "An error occurred while logging data",
            error: error.response ? error.response.data : null,
        };
    }
}

module.exports = logData        