import { Injectable } from "@angular/core";
import { FirebaseService } from "./database/connect.service";
import { addDoc, collection, doc, getDoc, getDocFromCache, getDocs, setDoc } from "firebase/firestore";

@Injectable({
  providedIn: "root"
})


export class ApiService {

  private db:any;

  constructor(
    private firebaseService: FirebaseService
  ) {
    this.db = this.firebaseService.getFirestore()
  }


  async addUser(data:any){
    try{
      return await addDoc(collection(this.db, 'users'), data)
    }catch(err){
      return null
    }
  }

  async setAddUser(data:any, id:string){
    try{

      const docRef = doc(this.db, 'users', id);
      await setDoc(docRef, data, { merge: true });
      const snapshot = await getDoc(docRef);
      const savedData = snapshot.data();

      return savedData

    }catch(err){
      return null
    }
  }

  async getUserById(id:string){
    try{
      
      return (await getDoc(doc(this.db, 'users', id)))?.data()

    }catch(err){
      return null;
    }
  }

  async getAllUser(){
    try{
      
      return await getDocs(collection(this.db,'users'))

    }catch(err){
      return null
    }
  }
}