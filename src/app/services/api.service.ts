import { Injectable } from "@angular/core";
import { FirebaseService } from "./database/connect.service";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})


export class ApiService {
    constructor(
        private firebaseService: FirebaseService
    ){}

    saveUserResult(userData:any, userId:any){
        try{
            const database = getDatabase(this.firebaseService.app())
            

            set(ref(database, "users/" + userId), userData)
                .then(() => {
                    console.log('kayıt başarıyla eklendi')
                })
                .catch((err) => {
                    console.log('kayıt eklenmedi')
                })

        }catch(err){
            console.log('Error')
        }
    }

    getAllUser(): Observable<any> {
        const database = getDatabase(this.firebaseService.app());
        const usersRef = ref(database, "users/");
    
        return new Observable<any>((observer) => {
          const unsubscribe = onValue(usersRef, (snapshot) => {
            const users = snapshot.val();
            observer.next(users);
          }, (error) => {
            observer.error(error);
          });
    
          return () => {
            unsubscribe();
          };
        });
    }

    getUserWithValue(ID:string){
        const database = getDatabase(this.firebaseService.app());
        const usersRef = ref(database, "users/" + ID);
    
        return new Observable<any>((observer) => {
          const unsubscribe = onValue(usersRef, (snapshot) => {
            const users = snapshot.val();
            observer.next(users);
          }, (error) => {
            observer.error(error);
          });
    
          return () => {
            unsubscribe();
          };
        });
    }

    certificateUpdate(ID:string){
      const database = getDatabase(this.firebaseService.app())
      const usersRef = ref(database, "users/" + ID);

      return new Observable<any>((observer) => {
        const unsubscribe = onValue(usersRef, (snapshot) => {
          const users = snapshot.val();
          users.certificate = true
          observer.next(users);
        }, (error) => {
          observer.error(error);
        });

        return unsubscribe();
      })
    }

}