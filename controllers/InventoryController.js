import firebase from '../firebase.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import {  ref, uploadBytes, getMetadata } from "firebase/storage";
import { collection, addDoc, doc, getDocs, getDoc, deleteDoc } from "firebase/firestore"; 
import asyncHandler from "express-async-handler";

import * as fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const main_directory = __dirname.toString().replace('/controllers', '')

const main_page = asyncHandler(async (req, res, next) => {
  res.render('index')
})

const item_index = asyncHandler(async (req, res, next) => {
  const result = await getDocs(collection(firebase.db, "destinations"));
  let response = [];
  let count = 0;

  result.forEach(doc => {
    count += 1;
    let doc_object = doc.data();
    
    doc_object['id'] = doc.id;
    console.log(doc_object);
    response.push(doc_object);
  });

  // // if more than 25 messages, we delete the oldest message
  // if (count > 25) {
  //   let itemforDeletion = response.pop();
  //   await deleteDoc(doc(firebase.db, "messages", itemforDeletion.id));
  // };

  const auth = getAuth();
  const user = auth.currentUser;
  let userstate = "None";
  if (user !== null) {
    if (user.uid == "V2UwWzuX9chtITjKUbfRaW83uNy1") {
    userstate = "Authorized"
    }
  } else {
    userstate = "None"
  }

  res.render('destinations', {  data: response, user: userstate })
})

// Find a single item
const item_details = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  let response = null;

  const docRef = doc(firebase.db, "destinations", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    response = docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
  res.render('destination_detail', { data: response})
})

// Render Form Page
const item_create_get = (req, res) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user !== null){
    if (user.uid == "V2UwWzuX9chtITjKUbfRaW83uNy1") {
      res.render('create_destination')
    }
  } else {
    res.render('signin_page', { errorCode: null })
  }

}


const item_create_post = asyncHandler(async (req, res, next) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user !== null){
  if (user.uid == "V2UwWzuX9chtITjKUbfRaW83uNy1") {
  try {

  console.log(req.body);

  // Grab the file
  const file = req.file;
  console.log(file.originalname);
  console.log(file)
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }

  // Create reference to firebase storage
  const storage = firebase.storage

  // Create a storage reference from our storage service 
  const imagesRef = ref(storage, `DestinationImages/${file.originalname}`);

  // Upload 
  uploadBytes(imagesRef, file.buffer).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  });

  // Convert image file from buffer and write to local directory
  let buffer = Buffer.from(
    file.buffer,
    "7bit"
  );
  
  fs.writeFile(path.join(main_directory, `/public/images/${file.originalname}`), buffer, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });



  } catch (error) {
    console.log (error)
    res.status(400).send(error.message);
  } 

  try {
    const docRef = await addDoc(collection(firebase.db, "destinations"), {
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      days: req.body.days,
      description: req.body.description,
      imageURL: `${req.file.originalname}`
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }  

  }}
  res.redirect('/destinations');

})

const item_delete = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  const auth = getAuth();
  const user = auth.currentUser;
  if (user !== null){
  if (user.uid == "V2UwWzuX9chtITjKUbfRaW83uNy1") {

  await deleteDoc(doc(firebase.db, "destinations", id));

  res.json({ redirect: '/destinations' });

  }
  }

})

const signin_get = asyncHandler(async (req, res, next) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;

    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    const uid = user.uid;

    res.render('user_page', {userdata: { displayName, email, photoURL, emailVerified}})
  } else {
    // No one is signed in
    // Render the sign in Page
    res.render('signin_page', { errorCode: null })
  }

})

const signin_post = asyncHandler(async (req, res, next) => {
  console.log(req.body);

  const auth = getAuth();
  signInWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log('Signed in');
      res.redirect('/destinations');
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      res.render('signin_page', { errorCode: errorCode })

    })
    .finally(() => {
      console.log('Sign in Flow Complete');

    });

})


export default {
    main_page,
    item_index, 
    item_details, 
    item_create_get, 
    item_create_post, 
    item_delete,
    signin_get,
    signin_post
  };