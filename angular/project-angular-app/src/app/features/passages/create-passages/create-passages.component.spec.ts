import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePassagesComponent } from './create-passages.component';

describe('CreatePassagesComponent', () => {
  let component: CreatePassagesComponent;
  let fixture: ComponentFixture<CreatePassagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePassagesComponent]
    });
    fixture = TestBed.createComponent(CreatePassagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
