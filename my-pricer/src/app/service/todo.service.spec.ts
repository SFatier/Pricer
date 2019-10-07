/* tslint:disable:no-unused-variable */
import {
  HttpClientTestingModule, HttpTestingController
} from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TodoService } from './todo.service';

// describe('Service: Todo', () => {

//   let service, http, backend;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [ HttpClientTestingModule ],
//       providers: [TodoService]
//     });
//   });

//   beforeEach(inject([TodoService, HttpClient, HttpTestingController], (
//       conf: TodoService,
//       _h: HttpClient,
//       _b: HttpTestingController
//   ) => {
//       service = conf;
//       http = _h;
//       backend = _b;
//   }));

//   afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
//     httpMock.verify();
//   }));

//   it('should get data', () => {
//     service.getInfo('param').subscribe(res => {
//         expect(res).toBe('pan');
//     });
//     const req = backend.expectOne({
//         url: '/url?param=param',
//         method: 'GET'
//     });
//     req.flush('pan', { status: 200, statusText: 'ok' });
//   });
// });
