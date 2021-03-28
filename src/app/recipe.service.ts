import { Injectable, OnInit } from '@angular/core';
import { IRecipe } from './recipe-model';


@Injectable({
  providedIn: 'root'
})
export class RecipeService implements OnInit {
  private selectedRecipe: IRecipe;
  private isLoggedIn: boolean = false;

  constructor() { }

  public ngOnInit() {

  }

  public setSelectedRecipe(data: IRecipe) {
    this.selectedRecipe = data;
  }
  public getSelectedRecipe() {
    return this.selectedRecipe;
  }
}
