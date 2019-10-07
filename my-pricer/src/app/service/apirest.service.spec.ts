/* tslint:disable:no-unused-variable */

import { TestBed, getTestBed , async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApirestService } from './apirest.service';
import { Obligation } from '../obligation';
import { HttpClientModule, HttpClient, HttpBackend } from '@angular/common/http';
import { post } from 'selenium-webdriver/http';

let basicUrl;

describe('Service: Apirest', () => {

  let service: ApirestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    basicUrl = 'https://localhost:44307/api/ratecurvecontroller';

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApirestService]
    });

    service = TestBed.get(ApirestService);
    httpMock = TestBed.get(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Connect to web api', async(
      inject([HttpClient, HttpTestingController], (http: HttpClient, backend: HttpTestingController) => {

        http.get(basicUrl).subscribe();

        backend.expectOne({
          url: basicUrl,
          method: 'GET'
        });
      })
    )
  );


  it('Post Obligation', () => {
    const curve = [
      {
        "Duree" : ["0,5","1,25","1,75","2,25","2,75","3,25","3,75","4,25","4,75","5,25","5,75","6,25","6,75","7,25","7,75","8,25","8,75","9,25","9,75","10,25","10,75","11,25","11,75","12,25","12,75","13,25","13,75","14,25","14,75","15,25"],"Date":"04/01/2011",
        "Taux" :[0.012003003,0.014773258,0.016408836,0.017938401,0.019373,0.020722545,0.021996976,0.023205329,0.024354961,0.0254512,0.026497345,0.027494884,0.028443849,0.029343209,0.030191272,0.030986054,0.0317256,0.032408254,0.03303286,0.033598918,0.034106668,0.034557142,0.034952154,0.035294263,0.035586697,0.035833254,0.036038186,0.036206071,0.03634168,0.036449845],
        "price" : 0.0}
      ];

    service.getRateCurves().subscribe(res => {
      expect(res).toEqual(this.curve);
    });

    const req = httpMock.expectOne(basicUrl);
    expect(req.request.method).toBe("GET");
    req.flush(curve);
  });
});
