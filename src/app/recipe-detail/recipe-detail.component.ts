import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { IRecipe } from '../recipe-model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  public recipe: IRecipe;
  constructor(private Rservice: RecipeService, private router: Router, private store: AngularFirestore) { }

  ngOnInit() {
    this.recipe = this.Rservice.getSelectedRecipe();
  }

  public onEdit() {
    this.Rservice.setSelectedRecipe(this.recipe);
    this.router.navigate(['addrecipe', {action: 'edit'}], {skipLocationChange: true});
  }
  public onDelete() {
    this.store.collection('recipe').doc(this.recipe.id).delete()
      .then(() => {
        console.log('Deleted Successfullt')
        this.router.navigate(['recipelists'], {skipLocationChange: true})
    })
      .catch(err => console.error(err));
  }

}
