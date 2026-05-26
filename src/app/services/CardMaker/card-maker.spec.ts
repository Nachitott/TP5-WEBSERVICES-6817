import { TestBed } from '@angular/core/testing';

import { CardMaker } from './card-maker';

describe('CardMaker', () => {
  let service: CardMaker;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardMaker);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
