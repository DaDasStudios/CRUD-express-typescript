"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.render('index');
});
router.get('/about', (req, res) => {
    res.render('about');
});
exports.default = router;
