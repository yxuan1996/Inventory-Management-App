import firebase from '../firebase.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import {  ref, uploadBytes, getMetadata } from "firebase/storage";
// import { collection, addDoc, doc, getDocs, deleteDoc } from "firebase/firestore"; 
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
  // const result = await getDocs(collection(firebase.db, "messages"));
  // let response = [];
  // let count = 0;

  // result.forEach(doc => {
  //   count += 1;
  //   let doc_object = doc.data();
  //   doc_object['id'] = doc.id;
  //   response.push(doc_object);
  // });

  // // if more than 25 messages, we delete the oldest message
  // if (count > 25) {
  //   let itemforDeletion = response.pop();
  //   await deleteDoc(doc(firebase.db, "messages", itemforDeletion.id));
  // };

  // res.render('index', {  data: response })
  res.render('destinations', {  data: [] })
})

// Find a single item
const item_details = (req, res) => {
  // const id = req.params.id;
  res.render('destination_detail')
}

// Render Form Page
// Function not used
const item_create_get = (req, res) => {
  // res.render('create', { title: 'New Message' });
  res.render('create_destination')
}


const item_create_post = asyncHandler(async (req, res, next) => {
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
  // try {
  //   const docRef = await addDoc(collection(firebase.db, "messages"), {
  //     title: req.body.title,
  //     author: req.body.author,
  //     message: req.body.message
  //   });
  //   console.log("Document written with ID: ", docRef.id);
  // } catch (e) {
  //   console.error("Error adding document: ", e);
  // }  
  res.redirect('/destinations');

})

const item_delete = asyncHandler(async (req, res, next) => {
  // const id = req.params.id;
  // console.log(id);

  // await deleteDoc(doc(firebase.db, "messages", id));

  // res.json({ redirect: '/' });

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
    res.render('signin_page', { title: 'Sign In' })
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
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
 
  res.redirect('/');

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