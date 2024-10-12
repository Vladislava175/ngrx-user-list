import { AsyncPipe, JsonPipe, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Item } from '../../models/item.model';
import { editItem, loadItems } from '../../store/item.actions';
import {
  selectError,
  selectItems,
  selectItemState,
  selectLoading,
} from '../../store/item.selectors';
import { AppState } from '../../store/store';
// primeng
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [NgFor, NgIf, NgStyle, AsyncPipe, JsonPipe, TableModule, IconFieldModule, InputIconModule ],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css',
})
export class ItemListComponent implements OnInit {
  items$!: Observable<Item[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  store: Store<AppState> = inject(Store<AppState>);
  /**
   *
   */
  constructor() {

  }
  ngOnInit(): void {
    this.loadItems();

    this.items$ = this.store.select(selectItems);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  
    this.items$.subscribe((items) => console.log('Items:', items));
    this.error$.subscribe((error) => console.log('Error:', error));
  
    this.store
      .select(selectItemState)
      .subscribe((state) => console.log('State after action:', state));
  }

  loadItems() {
    this.store.dispatch(loadItems());
  }
  check() {
    this.items$.subscribe((items) => console.log('items', items));
  }
  complete(item: Item) {
    item.updatedDate = new Date().toDateString();
    this.store.dispatch(editItem({ item: item }));
  }
}
