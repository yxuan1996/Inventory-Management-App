import firebase from '../firebase.js';
// import { collection, addDoc, doc, getDocs, deleteDoc } from "firebase/firestore"; 
import asyncHandler from "express-async-handler";

const item_index = asyncHandler(async (req, res, next) => {
  const result = await getDocs(collection(firebase.db, "messages"));
  let response = [];
  let count = 0;

  result.forEach(doc => {
    count += 1;
    let doc_object = doc.data();
    doc_object['id'] = doc.id;
    response.push(doc_object);
  });

  // if more than 25 messages, we delete the oldest message
  if (count > 25) {
    let itemforDeletion = response.pop();
    await deleteDoc(doc(firebase.db, "messages", itemforDeletion.id));
  };

  res.render('index', {  data: response })
})

// Find a single item
const item_details = (req, res) => {
  const id = req.params.id;
}

// Render Form Page
// Function not used
const item_create_get = (req, res) => {
  res.render('create', { title: 'New Message' });
}


const item_create_post = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  try {
    const docRef = await addDoc(collection(firebase.db, "messages"), {
      title: req.body.title,
      author: req.body.author,
      message: req.body.message
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }  
  res.redirect('/');
})

const item_delete = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  console.log(id);

  await deleteDoc(doc(firebase.db, "messages", id));

  res.json({ redirect: '/' });

})


export default {
    item_index, 
    item_details, 
    item_create_get, 
    item_create_post, 
    item_delete
  };