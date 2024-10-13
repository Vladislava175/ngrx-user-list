import { createReducer, on } from '@ngrx/store';
import { Item } from '../models/item.model';
import {
  addItem,
  editItem,
  filterByName,
  loadItems,
  loadItemsFailure,
  loadItemsSuccess,
} from './item.actions';

export interface ItemState {
  items: Item[];
  filteredItems: Item[];
  loading: boolean;
  error: string | null;
}

export const initialState: ItemState = {
  items: [],
  filteredItems: [],
  loading: false,
  error: null,
};

export const itemReducer = createReducer(
  initialState,
  on(loadItems, (state) => ({ ...state, loading: true, error: null })),
  on(loadItemsSuccess, (state, { items }) => ({
    ...state,
    items,
    loading: false,
    error: null,
  })),
  on(loadItemsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(addItem, (state, { item }) => ({
    ...state,
    items: [...state.items, item],
    filteredItems: [...state.items, item]
  })),
  on(editItem, (state, { item }) => ({
    ...state,
    items: state.items.map((i) => (i.id === item.id ? item : i)),
    filteredItems: state.filteredItems.map((i) => (i.id === item.id ? item : i))
  })),
  on(filterByName, (state, { name }) => ({
    ...state,
    filteredItems: state.items.filter((item) =>
      item.name.toLowerCase().includes(name.toLowerCase())
    ),
  }))
);
