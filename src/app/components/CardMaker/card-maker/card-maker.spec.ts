import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMaker } from './card-maker';

describe('CardMaker', () => {
  let component: CardMaker;
  let fixture: ComponentFixture<CardMaker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardMaker],
    }).compileComponents();

    fixture = TestBed.createComponent(CardMaker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
