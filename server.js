const express = require('express'); 
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan')
const colors = require('colors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const cors = require('cors')

const logger = require('./src/middlewares/logger');
const connectDB = require('./config/db');
const errorHandler = require('./src/middlewares/error');
const handleUnvalidURI = require('./src/middlewares/unvalidURI');

//Load env vars 
dotenv.config({path: './config/config.env'});

//connect to database
connectDB();

//Route files
const bootcamps = require('./src/routes/bootcamps');
const courses = require('./src/routes/courses');
const auth = require('./src/routes/auth');
const users = require('./src/routes/users');
const reviews = require('./src/routes/review');

const app = express();

//Body Parser 
app.use(express.json()); //the bodyParser package is now integrated within express and we have not to install it.

//cookie parser
app.use(cookieParser());

//Middlewares must be before routes
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
} else {
  app.use(logger);
}

//file uploading
app.use(fileUpload());

//Sanitize data
app.use(mongoSanitize());

//set security headers
app.use(helmet());

//Prevent XSS attacks
app.use(xss());

//Rate limit
const limiter =rateLimit({
  windowMs: 10 * 60 *1000, //10min
  max: 100 //max requests in 10min is 100 request
});

app.use(limiter);

//Prevent http param pollution
app.use(hpp());

//Enable CORS
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')))

//Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);
app.use(handleUnvalidURI);

//Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server =  app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
  );

//Handle unhandled promise rejections
process.on('unhandledRejection', //listen to unhandledRejection event
  (err, promise) => { //when unhandledRejection event fired execute the cb function
    console.log(`Error: ${err.message}`.red.red);
    //Close server a exit process
    server.close(() => process.exit(1));
  });
