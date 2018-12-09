import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoriesModule } from '../categories.module';
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
  pageTitle: string;
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
      }, () => this.actionsMessage(`error`, `Ocorreu erro tente mais tarde!`));
    }
  }

  submitForm() {
    this.submittingForm = true;
    this.currentAction === `new` ? this.sendCategory(`create`) : this.sendCategory(`update`);
  }

  private sendCategory(send) {
    const params = Object.assign(new CategoriesModule(), this.categoryForm.value);
    this.categorySevice[send](params).subscribe(() => {
      this.actionsMessage(`success`, `Categoria salva com sucesso!`);
      this.router.navigateByUrl(`/categories`);
    }, () => {
      this.actionsMessage(`error`, `Erro ao salvar categoria!`);
      this.submittingForm = false;
    });
  }

  private actionsMessage(alert, message) {
    toastr[alert](message);
  }

}
