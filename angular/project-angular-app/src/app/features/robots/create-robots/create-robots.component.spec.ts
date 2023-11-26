import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRobotsComponent } from './create-robots.component';

describe('CreateRobotsComponent', () => {
  let component: CreateRobotsComponent;
  let fixture: ComponentFixture<CreateRobotsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateRobotsComponent]
    });
    fixture = TestBed.createComponent(CreateRobotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
