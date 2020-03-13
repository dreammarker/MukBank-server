const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const hpp = require('hpp');
const fs = require('fs');
require('dotenv').config();

//* router
const helloRouter = require('./routes/hello');

const app = express();

app.set('port', process.env.PORT || 5001);

if (process.env.NODE_ENV === 'production') {
  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    { flags: 'a' }
  );
  app.use(morgan('combined', { stream: accessLogStream }));
  app.use(helmet());
  app.use(hpp());
} else {
  app.use(morgan('dev'));
}
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, DELETE, PATCH',
    credentials: true
  })
);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/hello', helloRouter);

app.listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log(`server listen on ${app.get('port')}...`);
});
