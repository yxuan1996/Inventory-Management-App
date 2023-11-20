# Inventory-Management-App
Simple Inventory Management App for an Imaginary Store. 

We are a futuristic tour agency that sells travel packages to imaginary and sci-fi locations. 

Uses Node JS for the Backend. 

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#github.com/yxuan1996/Inventory-Management-App)

Running the app

We need to run `npm run dev`

This command does 2 things (See package.json)
- Uses nodemon so that the app will restart when any file changes are made. 
- Before starting the app, run `npm run tailwind:css` to compile all CSS changes. 

https://medium.com/@mariokandut/restart-a-node-js-app-automatically-301b22091a23#:~:text=The%20package%20nodemon%20has%20an%20--exec%20flag%20to,%22dev%22%20entry%20in%20the%20scripts%20field%20in%20package.json.

Restart nodemon when EJS file changes
https://stackoverflow.com/questions/12559176/is-there-anything-like-nodemon-that-will-restart-a-node-app-when-ejs-file-chang

# App Screenshots

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
```

Note: We will not use babel for this project
```
nodemon --exec babel-node app.js
```

### Authentication
We want to ensure that only authenticated users can create, edit and delete items. Non authenticated users can only view items. 

We will be using google firebase authentication to authenticate the users. 

### Search funtionality
Provide the ability to filter by Category and Name. 

### Pin footer to bottom
We use absolute positioning to pin the footer to the bottom of the page. 

We can apply absolute positioning using the following tailwind classes. 
```
absolute inset-x-0 bottom-0
```





