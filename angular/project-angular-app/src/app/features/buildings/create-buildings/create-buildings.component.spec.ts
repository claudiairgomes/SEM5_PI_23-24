import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBuildingsComponent } from './create-buildings.component';

describe('CreateBuildingsComponent', () => {
  let component: CreateBuildingsComponent;
  let fixture: ComponentFixture<CreateBuildingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBuildingsComponent]
    });
    fixture = TestBed.createComponent(CreateBuildingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
