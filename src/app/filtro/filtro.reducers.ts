import {Action, createReducer, on, State} from '@ngrx/store';
import {filtrosValidos, setFiltro} from './filtro.actions';


export const initialState: filtrosValidos = 'todos';

const _filtroReducer = createReducer(
  initialState,
  // @ts-ignore
  on(setFiltro, (state, {filtro}) => filtro),
);

export function filtroReducer(state, action: Action) {
  return _filtroReducer(state, action);
}
