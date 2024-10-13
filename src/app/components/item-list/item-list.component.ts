import { AsyncPipe, JsonPipe, NgFor, NgIf, NgStyle } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TableModule } from 'primeng/table';
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
  check() {
    this.items$.subscribe((items) => console.log('items', items));
  }
  complete(item: Item) {
    item.updatedDate = new Date().toDateString();
    this.store.dispatch(editItem({ item: item }));
  }
}
