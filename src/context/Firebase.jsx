import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { addDoc, collection, getDocs, getFirestore,getDoc ,doc ,query,where} from 'firebase/firestore';
import { getStorage, ref, uploadBytes ,getDownloadURL} from 'firebase/storage';
import { createContext, useContext, useEffect, useState } from 'react';

const FirebaseContext=createContext(null);

export  const useFirebase=()=>useContext(FirebaseContext);


const firebaseConfig = {
    apiKey: "AIzaSyBsVQqFpJrRg2npvs5eUECDHjjxbBkRTAE",
    authDomain: "bookstore-a9f0c.firebaseapp.com",
    databaseURL: "https://bookstore-a9f0c-default-rtdb.firebaseio.com",
    projectId: "bookstore-a9f0c",
    storageBucket: "bookstore-a9f0c.appspot.com",
    messagingSenderId: "1053871841834",
    appId: "1:1053871841834:web:5c78f853dc643f68405953"
  };

  const app = initializeApp(firebaseConfig);
  const  auth=getAuth(app);
  const firestore=getFirestore(app);
  const storage=getStorage(app)

  const GoogleProvider=new GoogleAuthProvider();



export const FirebaseProvider=(props)=>{
const  [user, setUser] = useState(null);

useEffect(()=>{
     onAuthStateChanged(auth,user=>{
        if (user) setUser(user);
        else setUser(null);
       
     });
},[])

    const singupwithuserEmail=(email,password)=>{
        createUserWithEmailAndPassword(auth,email,password)
    }
    const  loginwithuserEmail=(email,password)=>{
        signInWithEmailAndPassword( auth,email,password)
    }
     
    const siginWithGoogle=()=>{
        signInWithPopup(auth,GoogleProvider)
    }
    

    const handleCreateNewListing=async(name,isbn,price,cover)=>{
        
           const imageRef=ref(storage,`uploads/images/${Date.now()}-${cover.pic}`)
           const uploadResult = await uploadBytes(imageRef,cover);

        return   await addDoc(collection(firestore,"books"),{
            name,
            isbn,
            price,
            imageURL:uploadResult.ref.fullPath,
            userId:user.uid,
            userEmail:user.email,
            displayName:user.displayName,
            photoURL:user.photoURL,
           });
    };    
//....RetriveDataFromFirebase.......................

const listAllBook=()=>{
    return getDocs(collection(firestore,"books"))
}
const getBookById=async(id)=>{
    const docRef=doc(firestore,'books',id);
    const result=await getDoc(docRef)
    return result
}

const Placeorder=async(bookId,qty)=>{
  const collectionRef=collection(firestore,'books',bookId,"orders");
  const result=await addDoc(collectionRef,{
    userId:user.uid,
    userEmail:user.email,
    displayName:user.displayName,
    photoURL:user.photoURL,
    qty: Number(qty),
  });
  return result
};

const fetchMyOrders=async(userId)=>{
        if (!user) return null
         const collectionRef=collection(firestore,'books')
         console.log("col",collectionRef)
         const  q= query(collectionRef, where('userId','==',userId))
        const querySnapshot = await getDocs(q);
      
        console.log("kii",querySnapshot)
        return querySnapshot;

}
console.log("user",user)

const ImageUrl=(path)=>{
   return getDownloadURL(ref(storage,path))
}


    const isLoggedin=user ? true :false;

    return(
        <FirebaseContext.Provider value={{singupwithuserEmail,loginwithuserEmail,siginWithGoogle,handleCreateNewListing,ImageUrl,isLoggedin,listAllBook,getBookById,Placeorder,fetchMyOrders,user}}>
            {props.children}
        </FirebaseContext.Provider>
    )
};