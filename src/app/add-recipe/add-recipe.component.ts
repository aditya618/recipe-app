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
  public selectedImg:string = '';
  public imgUrl: string = '/assets/default.jpg';


  constructor(private router: Router, private route: ActivatedRoute, private Rservice: RecipeService, private store: AngularFirestore) { }

  ngOnInit() {
    this.data = this.Rservice.getSelectedRecipe();
    this.action = this.route.snapshot.paramMap.get('action');
    if(this.data && this.data.img && this.action === 'edit') {
      this.imgUrl = this.data.img;
      this.selectedImg = this.data.img;
    } else {
      this.imgUrl = 'assets/default.jpg';
    }
  }

  public onAdd(title: string, desc: string) {
    if (!(title.trim() && title.trim().length > 0)) {
      this.error ={
        title: true,
        imgUrl: false,
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
      const newRecipe = {
        title: title,
        img: this.selectedImg,
        desc: desc
      };
      const editRecipe = {
        id: this.data.id,
        title: title,
        img: this.selectedImg,
        desc: desc
      };
      // console.log(newRecipe);
      if(this.action === 'add'){
        this.store.collection('recipe').add(newRecipe)
        .then(() => {
          console.log('Added Succesfully');
          this.router.navigate(['recipelists'], {skipLocationChange: true});
        })
        .catch(err => console.error(err));

      } else {
        this.store.collection('recipe').doc(this.data.id).update(editRecipe)
          .then(() => {
            this.Rservice.setSelectedRecipe(editRecipe);
            console.log('Updated Succesfully');
            this.router.navigate(['recipedetail'], {skipLocationChange: true});
          })
          .catch(err => console.error(err));
      }

    }
  }

  public imageChange(event) {
    if(event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imgUrl = <string>e.target.result;
        this.selectedImg = <string>e.target.result;
        console.log(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      this.imgUrl = 'assets/default.jpg'
    }

  }

}
