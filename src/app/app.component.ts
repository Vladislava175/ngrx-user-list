import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { SidebarModule } from 'primeng/sidebar';
import { Observable } from 'rxjs';
import { HeaderComponent } from './components/header/header.component';
import { ItemFormComponent } from './components/item-form/item-form.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { Item } from './models/item.model';
import { addItem, editItem, loadItems } from './store/item.actions';
import {
  selectError,
  selectItems,
  selectLoading,
} from './store/item.selectors';
import { AppState } from './store/store';
export const CREATE_LABEL = 'Create New';
export const EDIT_LABEL = 'Edit Item';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ItemListComponent,
    ItemFormComponent,
    SidebarModule,
    HeaderComponent,
    NgIf,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  sidebarVisible: boolean = false;
  updatedValue!: Item | null;
  store: Store<AppState> = inject(Store<AppState>);
  items$!: Observable<Item[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  label = CREATE_LABEL;
  ngOnInit(): void {
    this.loadItems();

    this.items$ = this.store.select(selectItems);
    this.store.select(selectItems).subscribe((res) => {
      console.log('subscribe', res);
    });
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }
  loadItems() {
    this.store.dispatch(loadItems());
  }
  addValue(event: any) {
    this.updatedValue = event.object as Item;
    if (event.isNew) {
      this.store.dispatch(addItem({ item: this.updatedValue }));
    } else {
      this.updatedValue.updatedDate = new Date().toISOString().split('T')[0];
      this.store.dispatch(editItem({ item: this.updatedValue }));
    }

    this.visibilityChange(false);
    this.updatedValue = null;
    this.label = CREATE_LABEL;
  }
  updateValue(event: Item) {
    this.updatedValue = event;
    console.log('updatedValue', this.updatedValue);
    this.label = EDIT_LABEL;
    this.visibilityChange(true);
  }
  visibilityChange(event: boolean) {
    this.sidebarVisible = event;
  }
}
