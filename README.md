# edu-http-classic-js

> Vi förbereder systemet för test-körningar som enhets-test komponent-test samt integrations-test.

## DoD

> När vi är klara skall följande kommandon fungera.

```bash
npm test
npm run test:component
npm run test:integration
```

## Instruktioner

```bash
cd ~
cd ws
mkdir __tests__
touch ./__tests__/{unit_tests.js,component_tests.js,integration_tests.js}
touch {.env,.env.test}
npm install -D jest
npm install -D jest-runner-groups
npm install -D supertest
npm pkg set scripts.test="jest  --group=-component --group=-integration"
npm pkg set scripts.test:component="jest --group=component"
npm pkg set scripts.test:integration="jest --group=integration"
npm pkg set jest.runner="groups"
git add .
git commit -m "Added test frameworks"
```

## Tests

### unit_tests.js <heredoc

```js
cat > __tests__/unit_tests.js << 'EOF'
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
EOF
```

### component_tests.js <dochere

```js
cat > __tests__/component_tests.js << 'EOF'
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
EOF
```

### integration_tests.js <docere

```js
cat > __tests__/integration_test.js << 'EOF'
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
EOF
```
