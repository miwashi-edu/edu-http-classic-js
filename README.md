# edu-http-classic-js

[serve-favicon](https://expressjs.com/en/resources/middleware/serve-favicon.html)  
[nodemon](https://www.npmjs.com/package/nodemon)
[jest](https://www.npmjs.com/package/jest)
[path](https://www.npmjs.com/package/path)
[express](https://www.npmjs.com/package/express)

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
curl -L https://gist.github.com/miwashiab/f58042d997beb7983f91152c7b555529/raw/server.js -o server.js
curl -L https://gist.github.com/miwashiab/44bb4bc1d82f0952ffbf6c55fbd63ec8/raw/index.html -o  ./public/index.html
curl -L https://gist.github.com/miwashiab/3378fc2e4ab5d2691fa5978822721796/raw/.gitignore -o .gitignore
npm pkg set scripts.dev="nodemon server.js"
npm pkg set scripts.test="jest"
npm install express
npm install path
npm install serve-favicon
npm install nodemon --save-dev
npm install jest --save-dev
echo "web: npm start" > Procfile
git init
git add .
git commit -m "Initial commit"
```

![favicon](https://www.jensenyh.se/favicon.ico)  
[gist: server.js]( https://gist.github.com/miwashiab/f58042d997beb7983f91152c7b555529)  
[gist: index.html](https://gist.github.com/miwashiab/44bb4bc1d82f0952ffbf6c55fbd63ec8)  
[gist: .gitignore](https://gist.github.com/miwashiab/3378fc2e4ab5d2691fa5978822721796)  

```bash
heroku login
heroku create edu-http-classic-[lägg till något unikt]
git push heroku main
heroku open
heroku logs --tail
heroku destrou --app create edu-http-classic-[det unika du lade till] -c edu-http-classic-[det unika du lade till]
```

