import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AppState} from '../../../app.reducer';
import {Store} from '@ngrx/store';
import * as actions from '../../todo.actions';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {

  textInput: FormControl;

  constructor(
    private store: Store<AppState>
  ) {
    this.textInput = new FormControl('Hola', Validators.required);
  }

  ngOnInit(): void {
  }

  agregar(): void {
    if (this.textInput.invalid) {return; }

    this.store.dispatch(actions.crear({texto: this.textInput.value}));
    this.textInput.reset();
  }
}
