import { Injectable } from "@angular/core";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./firestore.config";


@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  private firestore: any;

  constructor() {
    const app = initializeApp(firebaseConfig);
    this.firestore = getFirestore(app);
  }

  getFirestore() {
    return this.firestore;
  }
}
