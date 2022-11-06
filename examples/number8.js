/**
 * Issue num 8
 * @see https://github.com/agmoss/winston-azure-blob/issues/8
 */

const winston = require("winston");
const _ = require("lodash");
const { winstonAzureBlob, extensions } = require("../dist");
require("dotenv").config();

const hostName = "localhost";
const date = new Date();
const PORT = 3000;
// Ensure you create this
const blob_containername = "number8";

const blobpath =
    hostName +
    "/" +
    date.getFullYear() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getDate();
var transport = new winstonAzureBlob({
    account: {
        name: process.env.ACCOUNT_NAME,
        key: process.env.ACCOUNT_KEY,
    },
    blobName: blobpath + "/sm-beta-v2-" + PORT,
    bufferLogSize: 1,
    containerName: blob_containername,
    eol: "\n",
    extension: extensions.LOG,
    level: "info",
    // Specifying a SS rotatePeriod for brevity
    rotatePeriod: "YYYY-MM-DD-HH-SS",
    syncTimeout: 0,
});

transport.on("rotate", function (oldFilename, newFilename) {
    console.log(oldFilename);
    console.log(newFilename);
});

var logger = winston.createLogger({
    transports: [transport],
});

_.times(100).map((v) => {
    logger.info(`index ${v} sample log`);
});
