import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { IRecipe } from '../recipe-model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  public error = {
    title: false,
    imgUrl: false,
    desc: false
  };
  public action: string = 'add';
  public data: IRecipe;

  constructor(private router: Router, private route: ActivatedRoute, private Rservice: RecipeService, private store: AngularFirestore) { }

  ngOnInit() {
    this.data = this.Rservice.getSelectedRecipe();
    this.action = this.route.snapshot.paramMap.get('action');
  }

  public onAdd(title: string, img: string, desc: string) {
    if (!(title.trim() && title.trim().length > 0)) {
      this.error ={
        title: true,
        imgUrl: false,
        desc: false
      };
    }
    else if(!(img.trim() && img.trim().length > 0)) {
      this.error ={
        title: false,
        imgUrl: true,
        desc: false
      };
    }
    else if (!(desc.trim() && desc.trim().length > 0)) {
      this.error ={
        title: false,
        imgUrl: false,
        desc: true
      };
    } else {
      this.error ={
        title: false,
        imgUrl: false,
        desc: false
      };
      const newRecipe: IRecipe = {
        title: title,
        img: img,
        desc: desc
      };
      if(this.action === 'add'){
        this.store.collection('recipe').add(newRecipe)
        .then(() => {
          console.log('Added Succesfully');
          this.router.navigate(['recipelists'], {skipLocationChange: true});
        })
        .catch(err => console.error(err));

      } else {
        this.store.collection('recipe').doc(this.data.id).update(newRecipe)
          .then(() => {
            console.log('Deleted Succesfully');
            this.router.navigate(['recipedetail'], {skipLocationChange: true});
          })
          .catch(err => console.error(err));
      }

    }
  }

}
