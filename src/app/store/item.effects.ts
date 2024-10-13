import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ItemService } from '../services/item.service';
import {
  addItem,
  editItem,
  loadItems,
  loadItemsFailure,
  loadItemsSuccess,
} from './item.actions';

@Injectable()
export class ItemsEffects {
  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadItems),
      mergeMap(() =>
        this.service.getItems().pipe(
          map((items) => loadItemsSuccess({ items })),
          catchError((error) => of(loadItemsFailure({ error: error })))
        )
      )
    )
  );
  // addItem$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(addItem),
  //     mergeMap(({ item }) =>
  //       this.service.addItem(item).pipe(
  //         map((addedItem) => loadItems()),
  //         catchError((error) => of(loadItemsFailure({ error })))
  //       )
  //     )
  //   )
  // );
  // editItem$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(editItem),
  //     mergeMap(({ item }) =>
  //       this.service.editItem(item).pipe(
  //         map(() => loadItems()),
  //         catchError((error) => of(loadItemsFailure({ error })))
  //       )
  //     )
  //   )
  // );
  constructor(private actions$: Actions, private service: ItemService) {}
}
