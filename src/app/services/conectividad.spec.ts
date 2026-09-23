import { TestBed } from '@angular/core/testing';
import { Conectividad } from './conectividad';

describe('Conectividad', () => {
  let service: Conectividad;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Conectividad);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
