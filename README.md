# edu-http-classic-js

[serve-favicon](https://expressjs.com/en/resources/middleware/serve-favicon.html)

## Instructions

```bash
mkdir edu-http-classic
cd edu-http-classic
touch server.js
npm init -y
mkdir public
touch ./public/index.html
touch ./public/index.js
touch ./public/index.css
curl https://www.jensenyh.se/favicon.ico -o ./public/favicon.ico
npm pkg set scripts.dev="nodemon server.js"
npm pkg set scripts.test="jest"
npm install express
npm install path
npm install serve-favicon
npm install nodemon --save-dev
npm install jest --save-dev
touch app.json
echo "web: npm start" > Procfile
git init
git add .
git commit -m "Initial commit"
```

## server.js

```js
const express = require('express')
var favicon = require('serve-favicon')
var path = require('path')

const PORT = process.env.PORT || 3000

const app = express()
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static('public'))

app.listen(3000, console.log(`http server listening on port ${PORT}`))
```

## ./public/index.html

```html
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="/index.css">
    </head>
    <body>
        <h1>Hello World</h1>
        <script src='/index.js'/>
    </body>
</html>
```

## app.json & Procfile

### app.json
```json
{
    "name": "edu-http-classic",
    "description": "Simple backend server",
    "repository": "https://github.com/miwashi-edu/edu-http-classic-js.git",
    "logo": "https://cdn.rawgit.com/heroku/node-js-getting-started/main/public/node.svg",
    "keywords": ["node", "express", "heroku"],
    "image": "heroku/nodejs"
}
```

### Procfile
```docker
web: npm start
```
