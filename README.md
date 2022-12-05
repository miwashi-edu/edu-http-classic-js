# edu-http-classic-js

> Vi börjar med att bryta ut beskrivningen av vår server ifrån koden som startar upp den. Fördelen blir att vi kan köra vår kod i fler tillämpningar, som till exempel test. 

> Vi förbereder också systemet för test körningar som enhetsprov komponentprov samt integrationsprov.

> Vi lägger även till möjlighet att läsa in externa miljövariabler med dotenv.

> Vi plockar även bort static mappen för vi nu ska skapa en ren micorservice applikation.

## DoD

> När vi är klara skall följande kommandon fungera.

```bash
npm test
mpm run unit_test
npm run component_test
npm run integration_test
npm run dev
npm start
```

## Instruktioner

```bash
cd ~
cd ws
mkdir __tests__
touch ./__tests__/{unit_tests.js,component_tests.js,integration_tests.js}
touch service.js
touch {.env,.env.test}
npm install -D jest
npm install -D jest-runner-groups
npm install dotenv
npm pkg set main="service.js"
npm pkg set scripts.start="node service.js"
npm pkg set scripts.dev="nodemon service.js"
npm pkg set scripts.test="jest  --group=-component --group=-integration"
npm pkg set scripts.component_test="jest --group=component"
npm pkg set scripts.integration_test="jest --group=integration"
npm pkg set jest.runner="groups"
```

## service.js

```js
require('dotenv').config();
const app = require('./server.js');
var favicon = require('serve-favicon');
var path = require('path');

const PORT = process.env.PORT || 3000
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.listen(PORT, () => {
    console.log(`http server listening on port ${PORT}`)
});
```

## server.js

```js
const express = require('express');
const app = express();
app.use(express.json());

module.exports = app;
``

## Tests

### ./__tests__/unit_tests.js

```js
/**
 * @group unit
 */

describe('jest', () => {
  test('unit test', () => {
    it('should work', () => {
      expect(1).toBe(1);
    });
  });
});
```
### ./__tests__/component_tests.js

```js
/**
 * @group component
 */

describe('jest', () => {
  test('component test', () => {
    it('should work', () => {
      expect(1).toBe(1);
    });
  });
});
```

### -/__tests__/integration_tests.js

```js
/**
 * @group integration
 */

describe('jest', () => {
  test('integration test', () => {
    it('should work', () => {
      expect(1).toBe(1);
    });
  });
});
```
