import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollProductComponent } from './enroll-product.component';

describe('EnrollProductComponent', () => {
  let component: EnrollProductComponent;
  let fixture: ComponentFixture<EnrollProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
