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