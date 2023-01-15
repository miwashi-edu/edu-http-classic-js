# edu-http-classic-js

> Vi lägger till en fejk databas (som senare kan bytas ut mot en riktig) och ett domän object (user_handler) som hanterar användare i vårt system.

> Vi använder uuid för att skapa unika nycklar till våra användare.

> Observera att nu upphör våra komponent test och integrationstest att fungera och vi behöver tänka om dem.

## Instruktioner

```bash
cd ~
cd ws
cd edu-http-classic
npm install uuid
mkdir domain
touch ./domain/user_handler.js

```

## user_handler.js

```js
const uuid = require('uuid');

const users = []

exports.create = (user) => {
    user = {id: uuid.v4(), ...user};
    users.push(user);
    return user;
  }
  
  exports.readAll = () => {
    return users;
  }

  exports.read = (id) => {
    const user = users.find(user => user.id == id);
    return user;
  }
  
  exports.update = (id, user) => {
    const savedUser = users.find(aUser => aUser.id == id);
    if(user.hasOwnProperty("name")){
      savedUser.name = user.name;
    }
    if(user.hasOwnProperty("password")){
      savedUser.password = user.password;
    }
    return savedUser;
  }
  
  exports.delete = (id) => {
    indx = users.findIndex(user => user.id === id);
    const user = users.splice(indx, indx);
    return  user;
 }
```

## user_controller.js

```js
const userHandler = require('../domain/user_handler.js');

exports.create_user = (req, res) => {
    try{
        const user = req.body;
        res.status(201).json(userHandler.create(user));
    }catch(error){
        console.log(error);
        res.status(500).send("Something went wrong");    
    }
}

exports.get_all_users = (req, res) => {
    try{
        res.status(200).json(userHandler.readAll());    
    }catch(error){
        console.log(error);
        res.status(500).send("Something went wrong!");    
    }
}

exports.get_user = (req, res) => {
    try{
        const id = req.params.id;
        const user = userHandler.read(id);
        if(user == undefined){
            res.status(404).send("User not found!");
            return;
        }
        res.status(200).json(user);    
    }catch(error){
        console.log(error);
        res.status(500).send("Something went wrong!");    
    }
}

exports.put_user = (req, res) => {
    try{
        const id = req.params.id;
        const user = req.body;
        const oldUser = userHandler.read(id);
        if(oldUser == undefined){
            res.status(404).send("User not found!");
            return;
        }
        res.status(200).json(userHandler.update(id, user));    
    }catch(error){
        console.log(error);
        res.status(500).send("Something went wrong!");    
    }
}

exports.delete_user = (req, res) => {
    try{
        const id = req.params.id;
        const user = userHandler.read(id);
        if(user == undefined){
            res.status(404).send("User not found!");
            return;
        }
        res.status(204).json(userHandler.delete(id));    
    }catch(error){
        console.log(error);
        res.status(500).send(error);    
    }
}
```

## unit_tests.js

```js
/**
 * @group unit
 */

const userHandler = require('../domain/user_handler.js');



describe('When testing userHandler', () => {
  describe('readAll', () => {
    it('should respond with array', async () => {
      expect.arrayContaining(userHandler.readAll());
    });
  });
});

describe('When testing userHandler', () => {
  describe('create', () => {
    it('should add one', async () => {
      let countBefore = userHandler.readAll().length;
      userHandler.create({"name":"name", "password":"pw"});
      expect(userHandler.readAll().length).toBe(countBefore + 1);
    });
  });
});

describe('When testing userHandler', () => {
  describe('create', () => {
    it('should create id', async () => {
      const user = userHandler.create({"name":"name", "password":"pw"});
      expect(user).toHaveProperty('id');
    });
  });
});

describe('When testing userHandler', () => {
  describe('read', () => {
    it('should read saved values', async () => {
      const user = userHandler.create({"name":"name", "password":"pw"});
      const savedUser = userHandler.read(user.id);
      expect(user.id).toBe(savedUser.id);
      expect(user.name).toBe(savedUser.name);
      expect(user.password).toBe(savedUser.password);
    });
  });
});

describe('When testing userHandler', () => {
  describe('update', () => {
    it('should update values', async () => {
      const user = userHandler.create({"name":"name", "password":"pw"});
      const updatedUser = userHandler.update(user.id, {"name":"name", "password":"pw"});
      const savedUser = userHandler.read(user.id);
      expect(updatedUser.id).toBe(savedUser.id);
      expect(updatedUser.name).toBe(savedUser.name);
      expect(updatedUser.password).toBe(savedUser.password);
    });
  });
});

describe('When testing userHandler', () => {
  describe('delete', () => {
    it('should remove one', async () => {
      const user = userHandler.create({"name":"name", "password":"pw"});
      let countBefore = userHandler.readAll().length;
      userHandler.delete(user.id);
      expect(userHandler.readAll().length).toBe(countBefore - 1);
    });
  });
});
```

## component_tests.js

```js
/**
 * @group component
 */

const request = require('supertest')
const app = require('../server')
let persisted_id = undefined;

beforeEach(async () => {
    const res = await request(app)
        .post('/api/user/')
        .send({name:"name",password:"pw"});
    persisted_id = res.body.id;
});

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
        .get('/api/user/' + persisted_id);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id');
    });
  });
});

describe('When testing /api/user', () => {
  describe('PUT', () => {
    it('should work', async () => {
      const newPassword = "newPw";
      const newName = "newName";
      const res = await request(app)
        .put('/api/user/' + persisted_id)
        .send({ name: newName, password: newPassword });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toEqual(newName);
      expect(res.body.password).toEqual(newPassword);
    });
  });
});

describe('When testing /api/user', () => {
  describe('DELETE', () => {
    it('should work', async () => {
      const res = await request(app)
        .delete('/api/user/' + persisted_id);
      expect(res.statusCode).toEqual(204);
    });
  });
});

```

## integration_tests.js

```js
/**
 * @group integration
 */

const request = require('supertest')
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || `http://localhost:${PORT}`;
const container = request(HOST);

let persisted_id = undefined;

beforeEach(async () => {
  const res = await container
      .post('/api/user/')
      .send({name:"name",password:"pw"});
  persisted_id = res.body.id;
});

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
        .get('/api/user/' + persisted_id);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id');
    });
  });
});

describe('When testing /api/user', () => {
  describe('PUT', () => {
    it('should work', async () => {
      const res = await await container
        .put('/api/user/' + persisted_id)
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
        .delete('/api/user/' + persisted_id);
      expect(res.statusCode).toEqual(204);
    });
  });
});

```
