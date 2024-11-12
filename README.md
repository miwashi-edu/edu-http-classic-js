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
touch ./src/service.js
touch {.env,.env.test}
npm install dotenv
npm pkg set main="./src/service.js"
npm pkg set scripts.start="node ./src/service.js"
npm pkg set scripts.dev="node --watch ./src/service.js"
git add .
git commit -m "Separated app from service"
```

## service.js

```bash
cat > ./src/service.js << 'EOF'
require('dotenv').config();
const app = require('./app.js');
let favicon = require('serve-favicon');
let path = require('path');

const PORT = process.env.PORT || 3000
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')))

app.listen(PORT, () => {
    console.log(`http server listening on port ${PORT}`)
});
EOF
```

## app.js

```bash
cat > ./src/app.js << 'EOF'
const express = require('express');
const app = express();
app.use(express.json());

module.exports = app;
EOF
```
