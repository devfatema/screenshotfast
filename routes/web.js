const express = require('express')
const router = express.Router()

// Import Controllers
const { authCallback } = require('../controllers/auth/callbackController')
const { index } = require('../controllers/homeController')
const checkLogin = require('../middleware/checkLogin')
const { profileUpdate, profileData, changePassword } = require('../controllers/settingsController')
const { body } = require('express-validator')
const { planIndex } = require('../controllers/pricingController')
const { createSubscription } = require('../controllers/subscriptionController')
const { captureScreenshot } = require('../controllers/screenshotController')
const { sendEmail } = require('../controllers/emailController')

// Index Route
router.get('/', index)

// Auth Routes
router.post('/auth/callback', authCallback);

router.post('/screenshot', captureScreenshot)

router.post('/email', sendEmail)

// Settings Routes
router.get('/profile/info', checkLogin, profileData)
router.post('/edit/profile',
    body('name').not().isEmpty().withMessage('The Name Field Is Required'),
    body('email').not().isEmpty().withMessage('The Email Field Is Required').isEmail().normalizeEmail().withMessage('The Email Must be an Email'),
    body('username').not().isEmpty().withMessage('The Username Field Is Required'),
    checkLogin, profileUpdate)
router.post('/change/password',
    body('password').not().isEmpty().withMessage('The Password Field Is Required').isLength({ min: 8 }).withMessage('The Password Must be at least 8 characters'),
    body('current_password').not().isEmpty().withMessage('The Current Password Field Is Required'),
    checkLogin, changePassword);
router.post('/subscription/created', createSubscription)

// Pricing plans routes
router.get('/plans', planIndex)

module.exports = router