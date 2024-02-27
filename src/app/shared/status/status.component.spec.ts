import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusComponent } from './status.component';
import { Status } from '../../app.constant';

describe('StatusComponent', () => {
  let component: StatusComponent;
  let fixture: ComponentFixture<StatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusComponent],
    });
    fixture = TestBed.createComponent(StatusComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isAlive to true when status is "alive"', () => {
    component.status = Status.ALIVE;
    component.ngOnInit();
    expect(component.isAlive).toBe(true);
    expect(component.isUnknown).toBe(false);
  });

  it('should set isUnknown to true when status is "unknown"', () => {
    component.status = Status.UNKNOWN;
    component.ngOnInit();
    expect(component.isAlive).toBe(false);
    expect(component.isUnknown).toBe(true);
  });

  it('should convert status to lowercase during initialization', () => {
    component.status = 'ALiVe'; // Mixed case
    component.ngOnInit();
    expect(component.status).toBe(Status.ALIVE.toLowerCase());
  });

  it('should handle not match any status', () => {
    component.status = 'invalid_status';
    component.ngOnInit();
    expect(component.isAlive).toBe(false);
    expect(component.isUnknown).toBe(false);
  });
});
