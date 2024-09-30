# edu-http-classic-js

> Vi börjar med att bryta ut beskrivningen av vår server ifrån koden som startar upp den. Fördelen blir att vi kan använda vår server i fler tillämpningar, som till exempel test. 

> Vi lägger även till möjlighet att läsa in externa miljövariabler med dotenv.

> Vi plockar även bort static mappen för vi nu ska skapa en ren micorservice applikation.

## DoD

> När vi är klara skall följande kommandon fungera.

```bash
npm run dev
npm start
```

## Instruktioner

```bash
cd ~
cd ws
cd http-classic
touch service.js
touch {.env,.env.test}
npm install dotenv
npm pkg set main="service.js"
npm pkg set scripts.start="node service.js"
npm pkg set scripts.dev="node --watch ./src/app.js"
git add .
git commit -m "Separated app from service"
```

## service.js

```js
require('dotenv').config();
const app = require('./app.js');
var favicon = require('serve-favicon');
var path = require('path');

const PORT = process.env.PORT || 3000
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.listen(PORT, () => {
    console.log(`http server listening on port ${PORT}`)
});
```

## app.js

```js
const express = require('express');
const app = express();
app.use(express.json());

module.exports = app;
```
