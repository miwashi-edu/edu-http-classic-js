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

```

## user_controller.js

```js
const userHandler = require('../domain/user_handler.js');

exports.create_user = (req, res) => {
    try{
        const user = req.body;
        res.status(201).json(userHandler.create(user));
    }catch(error){
        res.status(500).send("Something went wrong");    
    }
}

exports.get_all_users = (req, res) => {
    try{
        res.status(200).json(userHandler.readAll());    
    }catch(error){
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
        res.status(200).json(userHandler.delete_user(id));    
    }catch(error){
        res.status(500).send("Something went wrong!");    
    }
}
```

## unit_tests.js

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
  
  exports.update = (user) => {
    const oldUser = users.find(user => user.id == id);
    if(user.hasOwnProperty("name")){
        oldUser.name = user.name;
    }
    if(user.hasOwnProperty("password")){
        oldUser.password = user.password;
    }
    return oldUser;
  }
  
  exports.delete = (id) => {
    indx = users.findIndex(user => user.id === id);
    const user = users.splice(indx, indx);
    return  user;
 }
```
