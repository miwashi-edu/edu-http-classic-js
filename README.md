# edu-http-classic-js

> Vi lägger till dokumentation av backend servern för att hjälpa testare och frontendutvecklare.

## Lägg till swagger

```bash
npm install swagger-jsdoc
npm install swagger-ui-express
```

## Lägg till swagger konfiguration i server.js

### server.js

```js
const express = require('express');
const cors = require('cors')
var favicon = require('serve-favicon');
var path = require('path');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


const app = express();
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(express.static('public'));

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "HTTP Classic API",
            description: "API Information of http-classic-js",
            contact: {
                name: "Wacoco@wacoco.se"
            },
            servers: ["http://localhost:3001"]
        }
    },
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/user', require('./routes/user_routes.js'));

module.exports = app;
```

## Lägg till dokumentation i Routes

> Här kommer en av orsakerna till att vi höll routes relativt rent. Vi kommer att lägga till en doc tag till varje route. Denna doctag innehåller en @swagger märkning och
> en beskrivning av tjänsten i språket YAML. (Yet Another Markup Language). Yaml är lite krångligt när den skrivs i en doc tag, så detta är en av de situationerna där vi
> google kodar. Vå ber helt enkelt chat gpt att beskriva vår tjänst som yaml i en doc tag. Ta med endpoint, huvudflöde och alternativflöden samt även vad den ska returnera.
> Följande doc taggar skapade med chat gpt läggs i routes.

```js
/**
 * @swagger
 * /player/create/:
 *   get:  # It's more appropriate to use POST here since it's a creation operation.
 *     tags:
 *       - Players
 *     description: Creates a new player and returns an ID along with a random user ID
 *     responses:
 *       201:
 *         description: Player successfully created
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *               description: The ID of the newly created player
 *             userId:
 *               type: string
 *               format: uuid
 *               description: Randomly generated user ID for the player
 *       500:
 *         description: Server error
 */
router.get('/player/create/', userController.createPlayer);

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     required:
 *       - id
 *       - name
 *     properties:
 *       id:
 *         type: string
 *         format: uuid
 *       name:
 *         type: string
 */
```
