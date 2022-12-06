# edu-http-classic-js

## Instruktioner

> Vi separerar API (routes) från controller.

```bash
cd ~
cd ws
mkdir controllers
touch ./controllers/user_controller.js
vi ./routes/user_routes.js
vi ./controllers/user_controller.js
git add .
git commit -m "Added controller"
```

## DoD

```bash
npm run component_test
npm run integration_test
```

## user_controller.js

```js
exports.create_user = (req, res) => {
    res.status(201).json({id: 1, ...req.body});
}

exports.get_all_users = (req, res) => {
    res.status(200).json([]);    
}

exports.get_user = (req, res) => {
    res.status(200).json({id: req.params.id});
}

exports.put_user = (req, res) => {
    res.status(200).json({id: req.params.id, ...req.body});
}

exports.delete_user = (req, res) => {
    res.sendStatus(204);
}
```

## user_routes.js

```
const userController = require('../controllers/user_controller.js')

router.post("/", userController.create_user);

router.get("/", userController.get_all_users);

router.get("/:id", userController.get_user);

router.put("/:id", userController.put_user);

router.delete("/:id", userController.delete_user);

module.exports = router;
```
