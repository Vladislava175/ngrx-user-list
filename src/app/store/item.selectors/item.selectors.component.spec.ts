import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSelectorsComponent } from './item.selectors.component';

describe('ItemSelectorsComponent', () => {
  let component: ItemSelectorsComponent;
  let fixture: ComponentFixture<ItemSelectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemSelectorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemSelectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
