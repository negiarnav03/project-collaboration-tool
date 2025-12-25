require('dotenv').config();
console.log("ACCESS_TOKEN_SECRET =", process.env.ACCESS_TOKEN_SECRET);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const app = express();
// method inbuilt in express to recognize the incoming Request Object as a JSON Object
app.use(express.json());
// enables the express server to respond to preflight requests
// A preflight request is basically an OPTION request sent to the server before the actual request is sent, in order to ask which origin and which request options the server accepts.
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
// parses Cookie header and populates req.cookies with an object keyed by the cookie names
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true
}));

// Routes - Prefixes
app.use('/user', require('./routes/userRouter'));
app.use('/projects', require('./routes/projectRouter'));
app.use('/api', require('./routes/upload'));
app.use('/profile', require('./routes/profileRouter'));
app.use('/joinproject', require('./routes/requestRouter'));
app.use('/contact', require('./routes/contactRouter'));
app.use('/admin', require('./routes/adminRouter'));

// --- Enhanced Diagnostic Checks ---
if (!process.env.MONGODB_URL) {
    console.error('CRITICAL: MONGODB_URL is not defined in .env!');
}
if (!process.env.ACCESS_TOKEN_SECRET) {
    console.error('CRITICAL: ACCESS_TOKEN_SECRET is not defined in .env!');
}
if (!process.env.REFRESH_TOKEN_SECRET) {
    console.error('CRITICAL: REFRESH_TOKEN_SECRET is not defined in .env!');
}
if (!process.env.ACTIVATION_TOKEN_SECRET) {
    console.error('CRITICAL: ACTIVATION_TOKEN_SECRET is not defined in .env!');
}

// DB connection
const URI = process.env.MONGODB_URL;
console.log("MongoDB URL:", process.env.MONGODB_URL);
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (!err) {
        console.log("Connected to mongodb");
    } else {
        console.log("Error in connecting DB", err);
        throw err;
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Global error handler for diagnostics
app.use((err, req, res, next) => {
    console.error('\n==== GLOBAL ERROR CAUGHT ====' );
    console.error('Request:', req.method, req.url);
    console.error('Body:', req.body);
    console.error('Error Stack:', err.stack);
    res.status(500).json({ msg: 'INTERNAL SERVER ERROR (debug)', error: err.message, diagnostic: true });
});