import {Component} from '@angular/core';
import {AuthService} from "src/app/services/auth.service";
import {Platform} from "@ionic/angular";
import {Router} from "@angular/router";

declare let firebase: any;

@Component({
  selector: 'app-root', templateUrl: 'app.component.html', styleUrls: ['app.component.scss'],
})

export class AppComponent{
  //variabile utilizzata per mostrare/nasconodere sidebar
  menuVisible: boolean = true;
  currentPath: string;

  constructor(
    private authService: AuthService,
    private platform: Platform,
    private router: Router,
  ){
    this.initializeApp();
  }

  public appPages = [
    {
      title: 'Logout',
      icon: 'user',
      action: () => {
        this.authService.logout();
        this.router.navigateByUrl('/login', { replaceUrl: true });
      },
    }
    ];

  async initializeApp(){
    this.platform.ready().then(async () => {
      this.authService.initialization(firebase);
    })
  }

  /**
   *
   * @param path
   */
  setPath(path: string){
    this.currentPath = path;
    switch (this.currentPath){
      case 'login':
        this.menuVisible = false;
        break;
      default:
        this.menuVisible = true;
        break;
    }
  }

}
