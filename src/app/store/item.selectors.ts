import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemState } from './item.reducer';

export const selectItemState = createFeatureSelector<ItemState>('items');

export const selectItems = createSelector(
  selectItemState,
  (state: ItemState) => state?.items || []
);
export const selectLoading = createSelector(
  selectItemState,
  (state: ItemState) => state?.loading || false
);
export const selectError = createSelector(
  selectItemState,
  (state: ItemState) => state?.error || null
);
