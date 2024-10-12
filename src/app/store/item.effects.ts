import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ItemService } from '../services/item.service';
import { loadItems, loadItemsFailure, loadItemsSuccess } from './item.actions';

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
  constructor(private actions$: Actions, private service: ItemService) {}
}
