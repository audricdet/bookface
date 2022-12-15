// server.js

// Set up required packages and dependencies
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import expressEjsLayout from 'express-ejs-layouts'
import session from 'express-session'
import flash from 'connect-flash'
import {router as user_router} from './src/routes/users.mjs'
import {router as index_router} from './src/routes/index.mjs'
import * as dotenv from 'dotenv'
dotenv.config()


// Set up MongoDB connection

const uri = process.env.MONGODB_URI

async function connect() {
    try {
        await mongoose.connect(uri)
        console.log('Connected to MongoDb')
    } catch (error) {
        console.error(error)
    }
}
connect()

// Create a new Express application
const app = express();

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Use body-parser to parse form data sent via HTTP POST
app.use(bodyParser.urlencoded({ extended: true }));

// Use body-parser to parse JSON data sent via HTTP POST
app.use(bodyParser.json());

// BodyParser

app.use(express.urlencoded({extended : false}));

//express session
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));
   //use flash
    app.use(flash());
    app.use((req,res,next)=> {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error  = req.flash('error');
    next();
})

// Routes

app.use('/', index_router);
app.use('/users', user_router)

// Start the server on port 3000
app.listen(3000, () => {
    console.log('MERN app listening on port 3000!');
});