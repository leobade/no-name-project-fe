import { Component, OnInit } from '@angular/core';
import {AuthService} from "src/app/services/auth.service";
import {Router} from "@angular/router";
import {AppComponent} from "src/app/app.component";
import {ChangeDetectorRef} from "@angular/core";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router,
    private appComponent: AppComponent,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.appComponent.setPath('home');
    this.ref.markForCheck();
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

}
