import { Action, ActionReducer } from '@ngrx/store';
import { ItemsEffects } from './item.effects';
import { itemReducer, ItemState } from './item.reducer';

export interface AppState {
  items: ItemState;
}

export interface AppStore {
  items: ActionReducer<ItemState, Action>;
}

export const appStore: AppStore = {
  items: itemReducer,
};

export const appEffects = [ItemsEffects];
