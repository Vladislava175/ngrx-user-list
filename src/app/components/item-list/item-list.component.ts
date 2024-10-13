import { AsyncPipe, JsonPipe, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Item } from '../../models/item.model';
import { filterByName, loadItems } from '../../store/item.actions';
import { AppState } from '../../store/store';
// primeng
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TableModule } from 'primeng/table';
import { selectFilteredItems } from '../../store/item.selectors';
@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgStyle,
    AsyncPipe,
    JsonPipe,
    TableModule,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
  ],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css',
})
export class ItemListComponent {
  @Input() items$!: Observable<Item[]>;
  @Input() loading$!: Observable<boolean>;
  @Input() error$!: Observable<string | null>;
  @Input() selectedItem!: Item;
  @Output() selectedItemChange = new EventEmitter<Item>();

  store: Store<AppState> = inject(Store<AppState>);
  /**
   *
   */
  constructor() {}

  loadItems() {
    this.store.dispatch(loadItems());
  }
  filterGlobal(event: any) {
    console.log('event', event);
    const filterValue = event.target.value;
    this.store.dispatch(filterByName({ name: filterValue }));
    this.items$ = this.store.select(selectFilteredItems);
  }
}
