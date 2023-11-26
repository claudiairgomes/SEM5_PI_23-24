import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateElevatorsComponent } from './create-elevators.component';

describe('CreateElevatorsComponent', () => {
  let component: CreateElevatorsComponent;
  let fixture: ComponentFixture<CreateElevatorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateElevatorsComponent]
    });
    fixture = TestBed.createComponent(CreateElevatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
