# edu-http-classic-js

> Vi förbereder också systemet för test körningar som enhetsprov komponentprov samt integrationsprov.

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
npm pkg set scripts.test="jest  --group=-component --group=-integration"
npm pkg set scripts.component_test="jest --group=component"
npm pkg set scripts.integration_test="jest --group=integration"
npm pkg set jest.runner="groups"
```

## Tests

### unit_tests.js

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

### component_tests.js

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

### integration_tests.js

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
