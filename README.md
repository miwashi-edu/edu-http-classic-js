# edu-http-classic-js

> Vi börjar med att bryta ut beskrivningen av vår server ifrån koden som startar upp den. Fördelen blir att vi kan köra vår kod i fler tillämpningar, som till exempel test. Vi förbereder också systemet för test körningar.


## Instructions

```bash
cd ~
cd ws
mkdir __tests__
touch ./__tests__/{unit_tests.js,component_tests.js,integration_tests.js}
touch service.js
npm install -D jest
npm install -D jest-runner-groups
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
```

## server.js

```js
``

## Tests

### ./__tests__/unit_tests.js

```js
/**
 * @group unit
 */

describe('jest', () => {
  test('unit test', () => {
    it('should work', , () => {
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
    it('should work', , () => {
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
    it('should work', , () => {
      expect(1).toBe(1);
    });
  });
});
```
