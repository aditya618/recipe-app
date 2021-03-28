import { Component, OnInit } from '@angular/core';
import { IRecipe } from '../recipe-model';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-recipe-lists',
  templateUrl: './recipe-lists.component.html',
  styleUrls: ['./recipe-lists.component.css']
})
export class RecipeListsComponent implements OnInit {
  public recipeList: IRecipe[] = [];
  constructor(private Rservice: RecipeService, private route: Router, private store: AngularFirestore) { }

  ngOnInit() {
    this.store.collection('recipe').valueChanges({idField: 'id'}).subscribe((r:[]) => {
      console.log(r);
      this.recipeList = r;
    });
  }

  public moreDetails(data: IRecipe) {
    this.Rservice.setSelectedRecipe(data);
    this.route.navigate(['recipedetail'], {skipLocationChange: true});
  }

}
