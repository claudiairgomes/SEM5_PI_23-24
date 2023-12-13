import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CreatePassagesComponent } from './create-passages.component';
import { PassageService } from 'src/app/Services/passages.service';
import { of, throwError } from 'rxjs';

describe('CreatePassagesComponent', () => {
  let component: CreatePassagesComponent;
  let fixture: ComponentFixture<CreatePassagesComponent>;
  let passageServiceSpy: jasmine.SpyObj<PassageService>;

  beforeEach(() => {
    passageServiceSpy = jasmine.createSpyObj('PassageService', ['createPassage']);

    TestBed.configureTestingModule({
      declarations: [CreatePassagesComponent],
      providers: [{ provide: PassageService, useValue: passageServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePassagesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createPassage on button click', fakeAsync(() => {
    const mockPassage = {
      id:'a',
      name:'Test Name',
      fromFloor: 'Test FromFloor',
      toFloor: 'Test ToFloor',
      description: 'Test Description',
    };

    passageServiceSpy.createPassage.and.returnValue(of(mockPassage));

    // Set passage properties
    component.passage = mockPassage;

    // Trigger button click
    component.createPassage();
    tick();

    expect(passageServiceSpy.createPassage).toHaveBeenCalledWith(mockPassage);
    expect(window.alert).toHaveBeenCalledWith('Passage created successfully!');
  }));

  it('should show error alert if createPassage fails', fakeAsync(() => {
    const mockError = new Error('Test Error');

    passageServiceSpy.createPassage.and.returnValue(throwError(mockError));

    // Trigger button click
    component.createPassage();
    tick();

    expect(passageServiceSpy.createPassage).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Error creating passage...');
  }));
});
