import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Todo} from '../../models/todo.model';
import {FormControl, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../../app.reducer';
import * as actions from '../../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  checkCompletado: FormControl;
  textInput: FormControl;

  editando: boolean = false;

  @ViewChild('inputFisico') textInputFisico: ElementRef;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.checkCompletado = new FormControl(this.todo.completado);
    this.textInput =  new FormControl(this.todo.texto, Validators.required);
    this.checkCompletado.valueChanges.subscribe(value => {
      this.store.dispatch(actions.toggle({id: this.todo.id}));
    });
  }

  editar(): void {
    this.editando = true;

    this.textInput.setValue(this.todo.texto);
    setTimeout(() => {
      this.textInputFisico.nativeElement.select();
    }, 1);

  }

  terminarEdicion(): void {
    this.editando = false;
    if (this.textInput.invalid) {return; }
    if (this.textInput.value === this.todo.texto) {return; }
    this.store.dispatch(actions.editar({
      id: this.todo.id,
      texto: this.textInput.value
    }));
  }

  borrar(): void {
    this.store.dispatch(actions.borrar({id: this.todo.id}));
  }

}
