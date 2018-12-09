import { Component, OnInit } from '@angular/core';

import { CategoryModel } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categories: CategoryModel[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories,
      error => alert(`Erro ao carregar alista de categorias!`)
    );
  }

  delete(category) {
    const mustDelete = confirm(`Deseja realmente excluir este item?`);
    if (mustDelete) {
      this.categoryService.delete(category.id).subscribe(() => {
        this.categories = this.categories.filter(item => item !== category);
      }, () => alert(`Erro ao tentar excluir`));
    }
  }

}
