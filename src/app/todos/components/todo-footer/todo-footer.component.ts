import { Component, OnInit } from '@angular/core';
import {AppState} from '../../../app.reducer';
import {Store} from '@ngrx/store';
import * as actions from '../../../filtro/filtro.actions';
import {borrarCompletados} from '../../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  fitlroActual: actions.filtrosValidos = 'todos';
  filtros: actions.filtrosValidos[] = ['todos', 'completados', 'pendientes'];

  pendientes: number = 0;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.subscribe(state => {
      this.fitlroActual = state.filtro;
      this.pendientes = state.todos.filter(todo => !todo.completado).length;
    });
  }

  cambiarFiltro(filtro: actions.filtrosValidos): void {
    this.store.dispatch(actions.setFiltro({filtro}));
  }

  borrarCompletados(): void {
    this.store.dispatch(borrarCompletados());
  }

}
