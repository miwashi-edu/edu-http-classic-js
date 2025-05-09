const uuid = require('uuid');

const users = [
  {
    name: 'admin@example.com',
    password: 'admin',
    role: 'admin',
  },{
    name: 'user@example.com',
    password: 'user',
    role: 'user',
  }
];

exports.create = (user) => {
  user = { id: uuid.v4(), ...user };
  users.push(user);
  return user;
}

exports.readAll = () => {
  return users;
}

exports.read = (id) => {
  const user = users.find(user => user.id === id);
  return user;
}

exports.readByName = (name) => {
  const user = users.find(user => user.name === name);
  return user;
}

exports.update = (id, user) => {
  const savedUser = users.find(aUser => aUser.id === id);
  if (user.hasOwnProperty("name")) {
    savedUser.name = user.name;
  }
  if (user.hasOwnProperty("password")) {
    savedUser.password = user.password;
  }
  return savedUser;
}

exports.delete = (id) => {
  const index = users.findIndex(user => user.id === id);
  users.splice(index, 1);
  return users;
}
