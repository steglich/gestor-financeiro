import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { EntriesModule } from '../entries.module';
import { EntryService } from '../shared/entry.service';

import { switchMap } from 'rxjs/operators';

import toastr from 'toastr';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent implements OnInit {

  private currentAction: string;
  pageTitle: string;
  entryForm: FormGroup;
  submittingForm: boolean;

  constructor(
    private entrySevice: EntryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
    ) {}

  ngOnInit() {
    this.setCurrentAction();
    this.buildEntryForm();
    this.loadEntry();
  }

  private setCurrentAction() {
    if (this.route.snapshot.url[0].path === `new`) {
      this.currentAction = `new`;
      this.pageTitle = `Cadastro de Lançameto`;
    } else {
      this.currentAction = `edit`;
      this.pageTitle = `Edição de Lançamento.`;
    }
  }

  private buildEntryForm() {
    this.entryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(4)]],
      description: [null, [Validators.required, Validators.minLength(4)]],
      type: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [null, [Validators.required]],
      categoryId: [null, [Validators.required]]
    });
  }

  private loadEntry() {
    if (this.currentAction === `edit`) {
      this.route.paramMap.pipe(
        switchMap(params => this.entrySevice.getById(+params.get(`id`)))
      ).subscribe(entry => {
        this.entryForm.patchValue(entry);
      }, () => this.actionsMessage(`error`, `Ocorreu erro tente mais tarde!`));
    }
  }

  submitForm() {
    this.submittingForm = true;
    this.currentAction === `new` ? this.sendEntry(`create`) : this.sendEntry(`update`);
  }

  private sendEntry(send) {
    const params = Object.assign(new EntriesModule(), this.entryForm.value);
    this.entrySevice[send](params).subscribe(() => {
      this.actionsMessage(`success`, `Lançamento salvo com sucesso!`);
      this.router.navigateByUrl(`/entries`);
    }, () => {
      this.actionsMessage(`error`, `Erro ao salvar Lançamento!`);
      this.submittingForm = false;
    });
  }

  private actionsMessage(alert, message) {
    toastr[alert](message);
  }

}
