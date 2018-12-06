import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Category } from '../pages/categories/shared/category.model';

export class InMemoryDatabase implements InMemoryDbService {

  createDb() {
    const categories: Category[] = [
      {id: 1, name: `Moradia`, decription: `Pagamentos de Contas da Casa.`},
      {id: 2, name: `Saúde`, decription: `Plano de saúde e Remédios.`},
      {id: 3, name: `Lazer`, decription: `Cinema, parques, praia, etc.`},
      {id: 4, name: `Salário`, decription: `Recebimento de salário.`},
      {id: 5, name: `Freelas`, decription: `trabalhos como freelancer.`}
    ];
    return { categories};
  }

}
