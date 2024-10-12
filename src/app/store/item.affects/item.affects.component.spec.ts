import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAffectsComponent } from './item.affects.component';

describe('ItemAffectsComponent', () => {
  let component: ItemAffectsComponent;
  let fixture: ComponentFixture<ItemAffectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemAffectsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemAffectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
