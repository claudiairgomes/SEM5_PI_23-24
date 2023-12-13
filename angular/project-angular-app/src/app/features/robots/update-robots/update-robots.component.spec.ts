import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRobotsComponent } from './update-robots.component';

describe('UpdateRobotsComponent', () => {
  let component: UpdateRobotsComponent;
  let fixture: ComponentFixture<UpdateRobotsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateRobotsComponent]
    });
    fixture = TestBed.createComponent(UpdateRobotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
