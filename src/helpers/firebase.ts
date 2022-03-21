import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, setDoc, collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore/lite';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAncISehRGmcIslDabmOhmn1MXJ80U5t-0",
    authDomain: "deliveryapp-1f9b5.firebaseapp.com",
    projectId: "deliveryapp-1f9b5",
    storageBucket: "deliveryapp-1f9b5.appspot.com",
    messagingSenderId: "382801202764",
    appId: "1:382801202764:web:b0568ba4b43085edbaaee9",
    measurementId: "G-NM2MRFJXK4"
};

export class Firebase {
    app: any
    db: any
    auth: any
    provider: any
    constructor(){
        this.app = initializeApp(firebaseConfig)
        this.db = getFirestore(this.app)
        this.auth = getAuth()
        this.provider = new GoogleAuthProvider()
    }

    async registerDocument(nameCollection: string, payload: any, uid?: string): Promise<any>{
        let user = null
        try {
            if(uid){
                await setDoc(doc(this.db, nameCollection, uid), payload)
            }else{
                await addDoc(collection(this.db, nameCollection), payload).then(e=>{
                    setDoc(doc(this.db, nameCollection, e.id), { id: e.id }, { merge: true });
                });
            }
            user = payload
        }catch(e){
            console.error("Error adding document: ", e);
        }
        return user
    }
    async getCollection(nameCollection: string): Promise<Array<any>>{
        const querySnapshot = await getDocs(collection(this.db, nameCollection));
        const result: any = []
        querySnapshot.forEach((doc) => {
            result.push({uid: doc.id, ...doc.data()})
        });
        return result
    }
    async getDocumentByUid(nameCollection: string, uid: any): Promise<any>{
        const docRef = await doc(this.db, nameCollection, uid);
        const docSnap = await getDoc(docRef);
        let result: any
        if(docSnap.exists()){
            result = docSnap.data();
        }else{
            console.log(nameCollection+" is empty")
        }
        return result
    }
    async updateDocument(nameCollection: string, payload: any, uid: string): Promise<void>{
        const result = await updateDoc(doc(this.db, nameCollection, uid), payload);
        return result
    }

/*
    AUTHTENTICATION
    *   BY EMAIL
    *   BY GOOGLE
    *   BY PHONE NUMBER
    * 
    *   LOGIN
    *   LOGOUT
*/
    async authRegisterByEmail(email: string, password: string): Promise<any>{
        let credential: any = null
        await createUserWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
            console.log("Add success")
            credential = userCredential.user
        })
        .catch((error) => {
            console.log("Error adding user", error.message)
        });
        return credential
    }
    
    async authByProviderGoogle(): Promise<any>{
        let credential: any = null
        await signInWithPopup(this.auth, this.provider)
        .then((userCredential) => {
            console.log("Add success")
            credential = userCredential.user
        })
        .catch((error) => {
            console.log("Error adding user")
        });
        return credential
    }
    async authLoginByEmail(email: string, password: string): Promise<any>{
        let credential: any = null
        await signInWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
            console.log("Add success")
            credential = userCredential.user
        })
        .catch((error) => {
            console.log("Error adding user")
        });
    }
    async sessionState(): Promise<any>{
        let session: any = null
        await onAuthStateChanged(this.auth, (user) => {
            if (user) {
              session = user
            } else {
              session = null
            }
        })
        return session
    }

    async logOut(): Promise<any>{
        let result: any;
        await signOut(this.auth).then(() => {
            result = true
        }).catch((error) => {
            result = error
        });
        return result
    }
}