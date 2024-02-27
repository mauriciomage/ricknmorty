import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MainService } from './main.service';
import { Main, Character } from '../interfaces/main.interface';
import { MockMain } from '../mock/mock';
import { config } from '../../app.constant';

describe('MainService', () => {
  let service: MainService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MainService],
    });
    service = TestBed.inject(MainService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get items successfully via GET', () => {
    const mockData: Main = MockMain;

    service.getItems(1).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${config.serviceExt}${config.serviceRoot}${config.URL_CHARACTERS}?page=1`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockData);
  });

  it('should get items by name successfully via GET', () => {
    const mockData: Main = MockMain;

    service.getItemsByName('rick').subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${config.serviceExt}${config.serviceRoot}${config.URL_CHARACTERS}?name=rick`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockData);
  });


  it('should get details successfully via GET', () => {
    const mockData: Character = MockMain.results[0];

    service.getDetails(1).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${config.serviceExt}${config.serviceRoot}${config.URL_CHARACTERS}/1`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockData);
  });
});
