import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DetailsComponent } from './details.component';
import { MainService } from '../shared/services/main.service';
import { Store, StoreModule } from '@ngrx/store';
import { storeDetails } from './details.actions';
import { makeSelectDetailById } from './details.selectors';
import { MockMain } from '../shared/mock/mock';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

fdescribe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let mockService: jasmine.SpyObj<MainService>;
  let mockMainService: jasmine.SpyObj<MainService>;
  let mockStore: Store;

  beforeEach(() => {
    
    TestBed.configureTestingModule({
      declarations: [DetailsComponent],
      imports: [ReactiveFormsModule, StoreModule.forRoot({}), SharedModule],
      providers: [
        { provide: MainService, useValue: mockMainService },
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' }), 
          }
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
