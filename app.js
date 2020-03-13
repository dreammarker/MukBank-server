const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fs = require('fs');
const helmet = require('helmet');
const hpp = require('hpp');
const morgan = require('morgan');
const path = require('path');
const logger = require('./logger');

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

app.use((req, res, next) => {
  const err = new Error('404 NOT FOUND');
  err.status = 404;
  logger.info('404 error');
  next(err);
});

// eslint-disable-next-line
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  logger.error(err.message);

  let sendMessage;
  if (err.status === 404) {
    sendMessage = '<h1>404 찾으시는 페이지가 없습니다</h1>';
  } else {
    sendMessage = '<h1>서버 에러</h1>';
  }

  const message =
    req.app.get('env') === 'development' ? err.message : sendMessage;
  res.send(message);
});

app.listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log(`server listen on ${app.get('port')}...`);
});
