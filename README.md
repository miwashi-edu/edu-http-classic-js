# edu-http-classic-js

> Här separerar vi ren app-funktion från end-points (routes) för vår microservice.

## Instruktioner

```bash
cd ~
cd ws
cd http-classic
mkdir routes
touch ./routes/user_routes.js
vi ./routes/user_routes.js
vi ./__tests__/component_test.js
vi ./__tests__/integration_test.js
git add .
git commit -m "Added component and integration tests."
```

## DoD

```bash
curl -X POST http://localhost:3000/api/user -H 'Content-Type: application/json' -d '{"name":"name","password":"pw"}'
curl -X GET http://localhost:3000/api/user
curl -X GET http://localhost:3000/api/user/1
curl -X PUT http://localhost:3000/api/user/1 -H 'Content-Type: application/json' -d '{"name":"newName","password":"pw"}'
curl -X DELETE http://localhost:3000/api/user/1

npm run component_test
npm start
npm run api_test
```

## app.js

```js
const express = require('express');
const app = express();
app.use(express.json());

app.use('/api/user', require('./routes/user_routes.js'));

module.exports = app;
````

## user_routes.js

```js
const router = require('express').Router();

//Create from posted json
router.post("/", (req, res) => {
    res.status(201).json({id: 1, ...req.body});
});

//Get all
router.get("/", (req, res) => {
    res.status(200).json([]);
});


//Get by ID
router.get("/:id", (req, res) => {
    res.status(200).json({id: req.params.id});
});

//Update by ID
router.put("/:id", (req, res) => {
    res.status(200).json({id: req.params.id, ...req.body});
});

//Delete by ID
router.delete("/:id", (req, res) => {
    res.sendStatus(204);
});

module.exports = router;
```

## component_test.js <heredoc

```js
cat > ./__tests__/component_test.js << 'EOF'
/**
 * @group component
 */

const request = require('supertest')
const app = require('../app')

describe('When testing /api/user', () => {
  describe('Post', () => {
    it('should work', async () => {
      const res = await request(app)
        .post('/api/user/')
        .send({name:"name",password:"pw"});
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
    });
  });
});

describe('When testing /api/user', () => {
  describe('GET All', () => {
    it('should work', async () => {
      const res = await request(app)
        .get('/api/user/')
      expect(res.statusCode).toEqual(200);
      expect.arrayContaining(res.body);
    });
  });
});

describe('When testing /api/user', () => {
  describe('GET', () => {
    it('should work', async () => {
      const res = await request(app)
        .get('/api/user/1');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id');
    });
  });
});

describe('When testing /api/user', () => {
  describe('PUT', () => {
    it('should work', async () => {
      const res = await request(app)
        .put('/api/user/1')
        .send({name:"name",password:"pw"});
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id');
    });
  });
});

describe('When testing /api/user', () => {
  describe('DELETE', () => {
    it('should work', async () => {
      const res = await request(app)
        .delete('/api/user/1');
      expect(res.statusCode).toEqual(204);
    });
  });
});
EOF
```

## integration_test.js <heredoc

```js
cat > ./__tests__/integration_test.js << 'EOF'
/**
 * @group integration
 */

const request = require('supertest')
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || `http://localhost:${PORT}`;
const container = request(HOST);

describe('When testing /api/user', () => {
  describe('Post', () => {
    it('should work', async () => {
      const res = await container
        .post('/api/user/')
        .send({name:"name",password:"pw"});
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
    });
  });
});

describe('When testing /api/user', () => {
  describe('GET All', () => {
    it('should work', async () => {
			const res = await container.get('/api/user/');
			expect(res.statusCode).toEqual(200);
      expect.arrayContaining(res.body);
    });
  });
});

describe('When testing /api/user', () => {
  describe('GET', () => {
    it('should work', async () => {
      const res = await await container
        .get('/api/user/1');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id');
    });
  });
});

describe('When testing /api/user', () => {
  describe('PUT', () => {
    it('should work', async () => {
      const res = await await container
        .put('/api/user/1')
        .send({name:"name",password:"pw"});
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id');
    });
  });
});

describe('When testing /api/user', () => {
  describe('DELETE', () => {
    it('should work', async () => {
      const res = await await container
        .delete('/api/user/1');
      expect(res.statusCode).toEqual(204);
    });
  });
});
EOF
```
