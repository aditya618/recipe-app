import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public nav: number = 1;

  constructor(private router: Router,private auth: AngularFireAuth, private Rservice: RecipeService) {
    //
  }

  public ngOnInit() {
  }

  public selectedNav(num: number) {
    this.nav = num;
  }

  public navigateTo(nav) {
    nav === 'addrecipe' ? this.router.navigate([nav, {action: 'add'}], {skipLocationChange: true}) : this.router.navigate([nav],{skipLocationChange: true});
  }

}
