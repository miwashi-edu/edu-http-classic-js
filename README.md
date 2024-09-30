# edu-http-classic-js

> Vi förbereder systemet för test-körningar som enhets-test komponent-test samt integrations-test.

## DoD

> När vi är klara skall följande kommandon fungera.

```bash
npm test
npm run component_test
npm run integration_test
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
npm install -D supertest
npm pkg set scripts.test="jest  --group=-component --group=-integration"
npm pkg set scripts.component_test="jest --group=component"
npm pkg set scripts.integration_test="jest --group=integration"
npm pkg set jest.runner="groups"
git add .
git commit -m "Added test frameworks"
```

## Tests

### unit_tests.js

```js
/**
 * @group unit
 */

describe('jest', () => {
  describe('unit test', () => {
    it('should work', () => {
      expect(true).toBe(true);
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
  describe('component test', () => {
    it('should work', () => {
      expect(true).toBe(true);
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
  describe('integration test', () => {
    it('should work', () => {
      expect(true).toBe(true);
    });
  });
});
```
