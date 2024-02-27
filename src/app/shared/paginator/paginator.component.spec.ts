import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginatorComponent } from './paginator.component';
import { Location } from '@angular/common';
import { config } from '../../app.constant';
import { MockMain } from '../mock/mock';

describe('PaginatorComponent', () => {
  let fixture: ComponentFixture<PaginatorComponent>;
  let component: PaginatorComponent;
  let locationMock: jasmine.SpyObj<Location>;

  beforeEach(() => {
    locationMock = jasmine.createSpyObj('Location', ['back']);

    TestBed.configureTestingModule({
      declarations: [PaginatorComponent],
      providers: [{ provide: Location, useValue: locationMock }],
    });

    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate current page on init', () => {
    const pagination = MockMain.info;
    component.pagination = pagination;

    fixture.detectChanges();

    expect(component.currentPage).toBe(1);
  });

  it('should emit nextEvent on goNextPage', () => {
    const pagination = MockMain.info;
    component.pagination = pagination;
    spyOn(component.nextEvent, 'emit');

    fixture.detectChanges();
    component.goNextPage();

    expect(component.nextEvent.emit).toHaveBeenCalledWith(2);
  });

  it('should emit prevEvent on goPrevPage', () => {
    const pagination = MockMain.info;
    component.pagination = pagination;
    spyOn(component.prevEvent, 'emit');

    fixture.detectChanges();
    component.goPrevPage();

    expect(component.prevEvent.emit).toHaveBeenCalledWith(1);
  });

  it('should call location.back() on ACTION_BACK', () => {
    component.onAction(config.ACTION_BACK);
  
    expect(locationMock.back).toHaveBeenCalled();
  });
});
