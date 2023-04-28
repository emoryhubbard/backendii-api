const express = require('express');
const app = express();
const mainController = require('./controllers/main');

app.use('/', require('./routes'));

const port = 3000;

app.listen(process.env.port || port);
console.log('Web server is listening at port ' + (process.env.port || port));


/* Before refactoring for routes:
const express = require('express');
const app = express();
const mainController = require('./controllers/main');

app.get('/', mainController.jonathanRoute);

const port = 3000;

app.listen(process.env.port || port);
console.log('Web server is listening at port ' + (process.env.port || port));
*/

/* Before refactoring for controllers:
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Jonathan Soriano');
};);

const port = 3000;

app.listen(process.env.port || port);
console.log('Web server is listening at port ' + (process.env.port || port));

*/