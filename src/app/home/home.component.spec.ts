import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeComponent } from './home.component';
import { MainService } from '../shared/services/main.service';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { Main, Character } from '../shared/interfaces/main.interface';
import { storeInfo } from './home.actions';
import { MockMain } from '../shared/mock/mock';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockMainService: jasmine.SpyObj<MainService>;
  let mockStore: jasmine.SpyObj<Store>;
  let formBuilder: FormBuilder;
  let formMock: FormGroup;

  beforeEach(waitForAsync(() => {
    mockMainService = jasmine.createSpyObj('MainService', ['getItems', 'getItemsByName', 'getErrorSubject']);
    mockStore = jasmine.createSpyObj('Store', ['dispatch', 'pipe', 'select']);

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [ReactiveFormsModule, StoreModule.forRoot({})],
      providers: [
        { provide: MainService, useValue: mockMainService },
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    
    formBuilder = new FormBuilder();
    formMock = formBuilder.group({
      search: ['rick']
    });

    component.searchForm = formMock;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load items on init', () => {
    const mockData: Main = MockMain;
    mockMainService.getItems.and.returnValue(of(mockData));
    component.ngOnInit();
    expect(component.data$).toBeDefined();
    expect(mockMainService.getItems).toHaveBeenCalled();
    expect(mockStore.dispatch).toHaveBeenCalledWith(storeInfo({ data: mockData }));
  });

  it('should filter by name',() => {
    const mockData: Main = MockMain;
    mockMainService.getItemsByName.and.returnValue(of(mockData));
    const searchValue = component.searchForm.get('search')?.value;
    
    component.filterByName();
    
    expect(mockMainService.getItemsByName).toHaveBeenCalledWith(searchValue);
    expect(component.data$).toBeDefined();
    expect(component.isFilter).toBeTrue();
  });

  it('should clear searchForm, update data$, and set isFilter to false', () => {
    const mockSearchForm = jasmine.createSpyObj('FormGroup', ['setValue']);
    spyOn(component, 'clear').and.callThrough();
  
    (component as any).searchForm = { get: () => mockSearchForm } as any;
  
    component.clear();
  
    expect(mockSearchForm.setValue).toHaveBeenCalledWith('');
    expect(component.isFilter).toBeFalse();
  });

  it('should navigate to details page with the correct item ID', () => {
    const mockRouter = TestBed.inject(Router);
  
    const mockItem: Character = MockMain.results[0];
    component.goToDetails(mockItem);
  
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/details/1']);
  });


  it('should not return an error typing the correct value in search box', () => {
    const search = new FormControl('rick');
    const result = component.getHasValidFormat(search);

    expect(result).toBe(false);
  });
});
