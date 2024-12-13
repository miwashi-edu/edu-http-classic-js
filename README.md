# edu-http-classic-js

> Expected time 6:30 minutes. Level main publishes a folder as a web application to be accessed with http://localhost:3000.

## Info

[serve-favicon](https://expressjs.com/en/resources/middleware/serve-favicon.html)  
[nodemon](https://www.npmjs.com/package/nodemon)  
[jest](https://www.npmjs.com/package/jest)  
[path](https://www.npmjs.com/package/path)  
[express](https://www.npmjs.com/package/express)  
Favicon we borrow: ![favicon](https://www.jensenyh.se/favicon.ico)  

## Instructions

```bash
cd ~
cd ws
rm -rf http-classic #Om den finns
mkdir http-classic
cd http-classic
npm init -y
mkdir src
mkdir public
touch ./src/app.js
touch ./public/index.html
touch ./public/index.js
touch ./public/index.css
curl -L https://www.jensenyh.se/favicon.ico -o ./public/favicon.ico
npm pkg set scripts.start="node ./src/app.js"
npm pkg set scripts.dev="node --watch ./src/app.js"
npm pkg set scripts.test="jest"
npm install express
npm install path
npm install serve-favicon
echo "node_modules" > .gitignore
git init
git add .
git commit -m "Initial commit"
```

## Alternative .gitignore

> Not must have, nice to have

```bash
curl -o .gitignore https://raw.githubusercontent.com/github/gitignore/main/Node.gitignore
```  
  
## app.js

```bash
cat > ./src/app.js << 'EOF'
const express = require('express')
const favicon = require('serve-favicon')
const path = require('path')

const PORT = process.env.PORT || 3000

const app = express()
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')))
app.use(express.static('public'))

app.listen(PORT, console.log(`http server listening on port ${PORT}`))
EOF

git add .
git commit -m "Added app.js"
```

### index.html

```bash
cat > ./public/index.html << 'EOF'
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
EOF

git add .
git commit -m "Added index.html"
```

## Workflow

```mermaid
flowchart TD
    main[Mapp på nätet] --> 
    level-1[ separerar App från Server ] --> 
    level-2[ lägger till test] --> 
    level-3[ separerar routes] --> 
    level-4[ separerar controller från routes] --> 
    level-5[ separerar domain från controller]
```
