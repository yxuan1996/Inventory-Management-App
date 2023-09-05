# Inventory-Management-App
Simple Inventory Management App for an Imaginary Store. 

Uses Node JS for the Backend. 

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#github.com/yxuan1996/Inventory-Management-App)

Running the app

We need to run `npm run tailwind:css` every time we make changes to the app.

We install nodemon globally `npm install -g nodemon` and then run `nodemon index.js`

Alternatively use `npm run start`

### TailwindCSS installation

For Installed Packages, see `package.json`

Guide to using tailwindCSS with Node JS and EJS / Pug: https://daily.dev/blog/how-to-use-tailwindcss-with-node-js-express-and-pug#add-tailwindcss

https://tailwindcss.com/docs/installation 

Since we have already exposed the `public` folder in `index.js`, we can just use `/styles/style.css` when referencing static files.

### ES6 Modules
We will use the ES6 import / export syntax instead of the require syntax when importing modules. 

We modify the `package.json` by adding `"type": "module"` to enable ES6 modules.

When importing a module from another file, we need to include the .js file extension
```JS
import  messageController  from '../controllers/messageController.js';
