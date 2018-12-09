import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoryService } from '../shared/category.service';

import { switchMap } from 'rxjs/operators';

import toastr from 'toastr';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  private currentAction: string;
  private serverErrorMessages: string[] = null;
  pageTitle = ``;
  categoryForm: FormGroup;
  submittingForm: boolean;

  constructor(
    private categorySevice: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
    ) {}

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  private setCurrentAction() {
    if (this.route.snapshot.url[0].path === `new`) {
      this.currentAction = `new`;
      this.pageTitle = `Cadastro de Categoria`;
    } else {
      this.currentAction = `edit`;
      this.pageTitle = `Edição de Categoria.`;
    }
  }

  private buildCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(4)]],
      description: [null, [Validators.required, Validators.minLength(4)]]
    });
  }

  private loadCategory() {
    if (this.currentAction === `edit`) {
      this.route.paramMap.pipe(
        switchMap(params => this.categorySevice.getById(+params.get(`id`)))
      ).subscribe(category => {
        this.categoryForm.patchValue(category);
      }, () => alert(`Ocorreu erro tente mais tarde!`));
    }
  }

}
