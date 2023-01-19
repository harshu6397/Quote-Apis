const express = require('express');
const router = express.Router();
const Quote = require('../models/Quote');
const { check, validationResult, body } = require('express-validator');

// @route   GET api/quotes/all
// @desc    Get all quotes
// @access  Public
router.get('/all', async (req, res) => {
    try {
        // Get all quotes
        const quotes = await Quote.find();
        res.json({
            status: "success",
            totalQuotes: quotes.length,
            quotes: quotes,
        }).status(200);
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error"
        });

    }
});

// @route   GET api/quotes/:id
// @desc    Get a quote
// @access  Public
router.get('/:id', [
    check('id', 'Please enter a valid ID').isMongoId(),
], async (req, res) => {
    try {
        // Get a quote
        const quote = await Quote.findById(req.params.id);
        res.json({
            status: "success",
            quote: quote,
        }).status(200);

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error"
        });
    }
});


// @route   POST api/quotes
// @desc    Create a quote
// @access  Public
router.post('/add', [
    check('quote', 'Please enter a quote').not().isEmpty(),
    check('author', 'Please enter an author').not().isEmpty(),
    check('language', 'Please enter a language').not().isEmpty(),
    body("author", "Please enter a valid author name").isLength({ min: 3 }).trim().escape(),
    body("quote", "Please enter a valid quote").isLength({ min: 3 }).trim().escape(),
    body("language", "Please enter a valid language").isLength({ min: 3 }).trim().escape()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check if the quote already exists
        let existQuote = await Quote.findOne ({ quote: req.body.quote });
        if (existQuote) {
            return res.status(400).json({
                status: "error",
                message: "Quote already exists"
            });
        }

        // Create a quote
        const newQuote = new Quote({
            quote: req.body.quote.charAt(0).toUpperCase() + req.body.quote.slice(1, req.body.quote.length),
            author: req.body.author.charAt(0).toUpperCase() + req.body.author.slice(1, req.body.author.length),
            language: req.body.language.charAt(0).toUpperCase() + req.body.language.slice(1, req.body.language.length),
        });

        // Save the quote
        const quote = await newQuote.save();

        // Return the quote
        res.json({
            status: "success",
            quote
        }).status(200);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error"
        });
    }
});

// @route   PUT api/quotes/:id
// @desc    Update a quote
// @access  Public
router.put('/:id', [
    check('id', 'Please enter a valid ID').isMongoId(),
    check('quote', 'Please enter a quote').not().isEmpty(),
    check('author', 'Please enter an author').not().isEmpty(),
    check('language', 'Please enter a language').not().isEmpty(),
    body("author", "Please enter a valid author name").isLength({ min: 3 }).trim().escape(),
    body("quote", "Please enter a valid quote").isLength({ min: 3 }).trim().escape(),
    body("language", "Please enter a valid language").isLength({ min: 3 }).trim().escape()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { quote, author, language } = req.body;

        // Build a quote object
        const quoteFields = {};
        if (quote) quoteFields.quote = quote.charAt(0).toUpperCase() + quote.slice(1, quote.length);
        if (author) quoteFields.author = author.charAt(0).toUpperCase() + author.slice(1, author.length);
        if (language) quoteFields.language = language.charAt(0).toUpperCase() + language.slice(1, language.length);

        // Update a quote
        let newQuote = await Quote.findByIdAndUpdate(req.params.id, { $set: quoteFields }, { new: true });

        // Return the quote
        res.json({
            status: "success",
            quote: newQuote
        }).status(200);

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error"
        });
    }
});

// @route   DELETE api/quotes/:id
// @desc    Delete a quote
// @access  Public
router.delete('/:id', async (req, res) => {
    try {
        // Delete a quote
        const quote = await Quote.findByIdAndDelete(req.params.id);
        res.json({
            status: "success",
            quote: quote
        }).status(200);
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error"
        });
    }
});

module.exports = router;