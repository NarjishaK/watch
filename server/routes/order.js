var express = require("express");
var router = express.Router();
const Ordercontroller = require("../controller/couponcontroller");


function generateThreeDigitRandom() {
    return Math.floor(100 + Math.random() * 900);
}

// Function to get the current date and time in "YYYYMMDDhhmmss" format
function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

module.exports = router;
