import { createAction, props } from '@ngrx/store';
import { Item } from '../models/item.model';

export const loadItems = createAction('[Item] Load Items');
export const loadItemsSuccess = createAction(
  '[Item] Load Items Success',
  props<{ items: Item[] }>()
);
export const loadItemsFailure = createAction(
  '[Item] Load Items Failure',
  props<{ error: string }>()
);
export const addItem = createAction('[Item] Add Item', props<{ item: Item }>());
export const editItem = createAction(
  '[Item] Edit Item',
  props<{ item: Item }>()
);
export const filterByName = createAction(
  '[Item] Filter By Name',
  props<{ name: string }>()
);
