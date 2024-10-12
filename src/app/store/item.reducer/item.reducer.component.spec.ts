import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemReducerComponent } from './item.reducer.component';

describe('ItemReducerComponent', () => {
  let component: ItemReducerComponent;
  let fixture: ComponentFixture<ItemReducerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemReducerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemReducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
