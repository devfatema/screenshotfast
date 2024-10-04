const express = require('express');
const next = require('next');
const dotenv = require('dotenv').config()
const dev = process.env.APP_ENV !== 'production';
const app = next({ dev })
const colors = require('colors')
const handle = app.getRequestHandler();
const router = require('./routes/web');
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
const errorHandle = require('./middleware/errorHandleMiddlewire')
var fileUpload = require('express-fileupload')

// Prepare the Next.js app before setting up Express
app.prepare().then(() => {

    connectDB()

    const app = express();

    app.use(fileUpload())
    
    app.use(express.json({
        verify: (req, res, buf) => {
            req.rawBody = buf.toString(); // Capture raw body
        }
    }));

    const urlencodedParser = bodyParser.urlencoded({ extended: false })
    app.use(urlencodedParser)

    app.use(express.static('public'))

    // Your custom API route(s)
    app.use('/api', router);
    
    // Delegate all requests to Next.js's routing mechanism
    app.all('*', (req, res) => {
        return handle(req, res); 
    });

    app.use(errorHandle)

    // Start the server
    app.listen(process.env.PORT || 9000, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${process.env.PORT || 9000}`);
    });
});
