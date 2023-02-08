import {Injectable} from '@angular/core';
import {Auth} from '@angular/fire/auth';
import {Subject} from "rxjs";
import {signInWithEmailAndPassword} from "@angular/fire/auth";
import {createUserWithEmailAndPassword} from "@angular/fire/auth";
import {signOut} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  static firebase: any;
  static isLogged: boolean;

  static authStateChange = new Subject<any>();
  static authStateChange$ = AuthService.authStateChange.asObservable();

  constructor(private auth: Auth){}


  ngOnInit(){
    console.log('Init authService')
  }

  initialization(firebase: any){
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        AuthService.isLogged = true;
        console.log("User is signed in");
      } else {
        AuthService.isLogged = false;
        console.log("User is signed out");
      }
    })
  }

  async register({email, password}: { email: any, password: any }){
    try{
      const user = await createUserWithEmailAndPassword(this.auth, email, password);
      return user;
    }catch (e){
      return null;
    }
  }

  async login({email, password}: { email: any, password: any }){
    try{
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    }catch (e){
      return null;
    }
  }

  logout(){
    return signOut(this.auth);
  }
}
