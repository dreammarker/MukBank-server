const express = require('express');

const app = express();

app.set('port', process.env.PORT || 5001);

app.listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log(`server listen on ${app.get('port')}...`);
});
