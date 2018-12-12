import { InMemoryDbService } from 'angular-in-memory-web-api';

import { CategoryModel } from '../pages/categories/shared/category.model';
import { EntryModel } from '../pages/entries/shared/entry.model';

export class InMemoryDatabase implements InMemoryDbService {

  createDb() {
    const categories: CategoryModel[] = [
      { id: 1, name: `Moradia`, description: `Pagamentos de Contas da Casa.` },
      { id: 2, name: `Saúde`, description: `Plano de saúde e Remédios.` },
      { id: 3, name: `Lazer`, description: `Cinema, parques, praia, etc.` },
      { id: 4, name: `Salário`, description: `Recebimento de salário.` },
      { id: 5, name: `Freelas`, description: `trabalhos como freelancer.` }
    ];
    const entries: EntryModel[] = [
      {
        id: 1, name: `Gás de Cozinha`, description: `Compra de Gás`, type: `expense`,
        amount: `70,80`, date: `14/10/2018`, paid: true, categoryId: categories[0].id, category: categories[0]
    } as EntryModel,
      {
        id: 2, name: `Suplementos`, description: `Mingual`, type: `expense`,
        amount: `15,00`, date: `14/10/2018`, paid: false, categoryId: categories[1].id, category: categories[1]
    } as EntryModel,
      {
        id: 3, name: `Salário na Empresa x`, description: `Hora Boa`, type: `revenue`,
        amount: `4405,49`, date: `15/10/2018`, paid: true, categoryId: categories[3].id, category: categories[3]
    } as EntryModel,
      {
        id: 4, name: `Aluguel de Filme`, description: `Para Adulto ;)`, type: `expense`,
        amount: `15,00`, date: `16/10/2018`, paid: true, categoryId: categories[2].id, category: categories[2]
    } as EntryModel,
      {
        id: 5, name: `Suplementos`, description: `Mais Mingual`, type: `expense`,
        amount: `30,00`, date: `17/10/2018`, paid: true, categoryId: categories[1].id, category: categories[1]
    } as EntryModel,
      {
        id: 6, name: `Video Game da Filha`, description: `Infaltil`, type: `expense`,
        amount: `15,00`, date: `17/10/2018`, paid: false, categoryId: categories[2].id, category: categories[2]
    } as EntryModel,
      {
        id: 11, name: `Uber`, description: `Casa da Mina`, type: `expense`,
        amount: `30,00`, date: `17/10/2018`, paid: true, categoryId: categories[1].id, category: categories[1]
    } as EntryModel,
      {
        id: 12, name: `Aluguel`, description: `Acompanhate`, type: `expense`,
        amount: `15,00`, date: `23/10/2018`, paid: false, categoryId: categories[2].id, category: categories[2]
    } as EntryModel,
      {
        id: 13, name: `Gás de Cozinha`, description: `Fritar Bacon`, type: `expense`,
        amount: `30,00`, date: `25/10/2018`, paid: false, categoryId: categories[1].id, category: categories[1]
    } as EntryModel,
      {
        id: 14, name: `Pagamento Pelo Projeto xyz`, description: `Faz-me Rir`, type: `revenue`,
        amount: `2980,00`, date: `25/10/2018`, paid: true, categoryId: categories[4].id, category: categories[4]
    } as EntryModel,
      {
        id: 19, name: `Aluguel de Filme`, description: `Educativos`, type: `expense`,
        amount: `15,00`, date: `07/11/2018`, paid: false, categoryId: categories[2].id, category: categories[2]
    } as EntryModel,
      {
        id: 21, name: `Video Game da Filha`, description: `Não Incomoda`, type: `expense`,
        amount: `30,00`, date: `17/11/2018`, paid: true, categoryId: categories[1].id, category: categories[1]
    } as EntryModel,
      {
        id: 22, name: `Cinema`, description: `Pegas no Escuro`, type: `expense`,
        amount: `15,00`, date: `18/11/2018`, paid: true, categoryId: categories[2].id, category: categories[2]
    } as EntryModel,
      {
        id: 23, name: `Jiu Jtsu`, description: `Meter Bronca`, type: `expense`,
        amount: `130,00`, date: `21/11/2018`, paid: false, categoryId: categories[1].id, category: categories[1]
    } as EntryModel,
      {
        id: 44, name: `Uber`, description: `Sá Comé`, type: `expense`,
        amount: `15,00`, date: `28/11/2018`, paid: true, categoryId: categories[2].id, category: categories[2]
    } as EntryModel,
      {
        id: 55, name: `Cinema`, description: `Relachamento`, type: `expense`,
        amount: `30,00`, date: `28/11/2018`, paid: false, categoryId: categories[1].id, category: categories[1]
    } as EntryModel,
    ];
    return { categories, entries };
  }

}
