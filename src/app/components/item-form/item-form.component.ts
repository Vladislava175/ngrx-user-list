import { NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Item } from '../../models/item.model';
@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [
    ColorPickerModule,
    ReactiveFormsModule,
    NgIf,
    IconFieldModule,
    InputTextareaModule,
  ],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.css',
})
export class ItemFormComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    console.log('Method ngOnChanges.', changes);
    if (changes['label']) {
      this.label = changes['label'].currentValue;
    }
    if (changes['item']) {
      this.item = changes['item'].currentValue;
      this.init();
    }
  }
  formGroup!: FormGroup;
  @Input() label = '';
  @Output() labelChange = new EventEmitter<string>();

  @Input() item!: Item | null;
  @Output() itemChange = new EventEmitter<any>();
  @Output() visibilityChange = new EventEmitter<boolean>();

  ngOnInit() {
    this.init();
  }
  init() {
    this.formGroup = new FormGroup({
      id: new FormControl(this.item?.id || this.getRandomNumber(50, 100)),
      color: new FormControl(this.item?.color || null),
      name: new FormControl(this.item?.name || ''),
      description: new FormControl(this.item?.description || ''),
      createdDate: new FormControl(
        this.item?.createdDate || new Date().toISOString().split('T')[0]
      ),
      createdBy: new FormControl(this.item?.createdBy || 'Test vlada'),
    });
  }
  save() {
    let item = this.formGroup.value;
    this.formGroup.reset();
    this.itemChange.emit({
      object: item,
      isNew: this.label.includes('Create'),
    });
  }
  cancel() {
    this.formGroup.reset();
    this.visibilityChange.emit(false);
  }
  // TODO check that not exist
  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
