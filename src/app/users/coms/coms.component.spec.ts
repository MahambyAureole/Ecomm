import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComsComponent } from './coms.component';

describe('ComsComponent', () => {
  let component: ComsComponent;
  let fixture: ComponentFixture<ComsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComsComponent]
    });
    fixture = TestBed.createComponent(ComsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
