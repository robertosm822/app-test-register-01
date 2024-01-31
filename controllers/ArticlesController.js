import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MASSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
}
const firebase = initializeApp(firebaseConfig)

const db = getDatabase();


/*
function writeArticleData(userId, name, email, imageUrl) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}
*/
export const createArticle = async (req, res, next) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'articles'), data);
    res.status(200).send('product created successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//get get all products

export const getArticles = (req, res, next) => {
  try {
    const dbRef = ref(getDatabase());
    const products = ref(getDatabase());
    get(child(dbRef, 'articles/article/-NpQozpRClUUr8P4QoBI')).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
/*  
  //get product by id
  
  export const getProduct = async (req, res, next) => {
    try {
      const id = req.params.id;
      const product = doc(db, 'products', id);
      const data = await getDoc(product);
      if (data.exists()) {
        res.status(200).send(data.data());
      } else {
        res.status(404).send('product not found');
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  
  //update product (with id)
  
  export const updateProduct = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const product = doc(db, 'products', id);
      await updateDoc(product, data);
      res.status(200).send('product updated successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  
  //delete product (with id)
  
  export const deleteProduct = async (req, res, next) => {
    try {
      const id = req.params.id;
      await deleteDoc(doc(db, 'products', id));
      res.status(200).send('product deleted successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  */