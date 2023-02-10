import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertController, LoadingController} from '@ionic/angular';
import {AuthService} from '../services/auth.service';
import {AppComponent} from "src/app/app.component";

@Component({
  selector: 'app-login', templateUrl: './login.page.html', styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit{

  credentials: FormGroup | undefined;
  private: any;
  page: string = "login";
  username: string;
  usernameError: string;
  _password: string;
  passwordError: string;
  confirmPassword: string;
  confirmPasswordError: string;
  organizationName: string;
  organizationNameError: string;
  acceptPrivacy: boolean;
  acceptPrivacyError: string;

  selectedLanguage: string; // in english
  selectedLanguageNotEn: string; // in "that" language
  selectedLanguageError: string;
  selectedTimezone: string;
  selectedTimezoneError: string;

  showPassword: boolean;

  activationToast: any;
  checkActivationToast: boolean;
  timeoutToast: any;


  constructor(private fb: FormBuilder, private loadingController: LoadingController, private alertController: AlertController, private authService: AuthService, private router: Router, private appComponent: AppComponent,){
  }

  // Easy access for form fields
  get email(){
    return this.credentials.get('email');
  }

  get password(){
    return this.credentials.get('password');
  }

  ngOnInit(){
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]], password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ionViewDidEnter(){
    this.appComponent.setPath('login');
  }

  ionViewWillLeave(){
    this.appComponent.setPath('');
  }

  async register(){
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.register(this.credentials.value);
    await loading.dismiss();

    if (user){
      this.router.navigateByUrl('/home', {replaceUrl: true});
    }else{
      this.showAlert('Registration failed', 'Please try again!');
    }
  }

  async login(){
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.login(this.credentials.value);
    await loading.dismiss();

    if (user){
      this.router.navigateByUrl('/home', {replaceUrl: true});
    }else{
      this.showAlert('Login failed', 'Please try again!');
    }
  }

  async showAlert(header, message){
    const alert = await this.alertController.create({
      header, message, buttons: ['OK']
    });
    await alert.present();
  }
}
