import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipeListsComponent } from './recipe-lists/recipe-lists.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

const routes: Routes = [
  {
      path: '',
      component: RecipeListsComponent
  },
  {
      path: 'addrecipe',
      component: AddRecipeComponent
  },
  {
      path: 'recipelists',
      component: RecipeListsComponent
  },
  {
    path: 'recipedetail',
    component: RecipeDetailComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
