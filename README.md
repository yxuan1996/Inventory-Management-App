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

### Firebase security rules
https://medium.com/firebase-developers/a-list-of-firebase-firestore-security-rules-for-your-project-fe46cfaf8b2a

### Upload images
https://javascript.plainenglish.io/uploading-an-image-to-firebase-cloud-storage-and-returning-url-with-express-nodejs-713daac7a5d4

https://code.tutsplus.com/file-upload-with-multer-in-node--cms-32088t

We will be giving authenticated users the ability to upload images when creating new destinations. 

First, we need to npm install the following middlewares to obtain the image file data from our form. 
```
npm install express-fileupload
npm install multer
npm install xhr2
npm install body-parser
```

In our form, we need to add the property `enctype="multipart/form-data"` to allow for file uploads. 

In `Routes.js` we import the multer middleware and use it to handle file uploads. The name of the file needs to be as the same as the name in our form (in this case 'image')
```JS
import multer from "multer";

// Setting up multer as a middleware to grab photo uploads
const storage = multer.memoryStorage();
// name of the file needs to be as the same as the name in our form (in this case 'image')
const upload = multer({ storage: storage }).single('image');

router.post('/new', upload, InventoryController.item_create_post);
```

In our `InventoryController.js` item_create_post method we grab the file, create a reference in firebase cloud storage, then upload the file. 

### Handling Data
- We will store our form data in firestore. 
- Uploaded images will be stored in 2 locations: locally `/public/images/` and in firebase storage
- If the locally stored images are lost due to server shutdown, we can download the images from firebase and load it into `./public/images/`

### Pin footer to bottom
We use absolute positioning to pin the footer to the bottom of the page. 

We can apply absolute positioning using the following tailwind classes. 
```
absolute inset-x-0 bottom-0
```

### Potential Improvements
- Separate Auth functions (Sign in) into a separate controller. 
- Search functionality: provide the ability to filter by category and name. 





