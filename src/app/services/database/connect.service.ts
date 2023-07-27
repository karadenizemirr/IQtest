import { Injectable } from "@angular/core";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


@Injectable({
    providedIn: "root"
})

export class FirebaseService {
    firebaseConfig:any

    constructor() {

        this.firebaseConfig = {
            apiKey: "AIzaSyA0qjAeYcnCX6nVDddsuuiJUvfg8U7xRyY",
            authDomain: "iqtest-ce3ae.firebaseapp.com",
            databaseURL: "https://iqtest-ce3ae-default-rtdb.europe-west1.firebasedatabase.app",
            projectId: "iqtest-ce3ae",
            storageBucket: "iqtest-ce3ae.appspot.com",
            messagingSenderId: "481957025985",
            appId: "1:481957025985:web:966c002f0a2e5fc8d55c40",
            measurementId: "G-PG4D4HR9ZV"
          };
    }


    app(){
        return initializeApp(this.firebaseConfig)
    }

    analytics(){
        return getAnalytics(this.firebaseConfig)
    }

    

}