import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pollo } from './pollo';

describe('Pollo', () => {
  let component: Pollo;
  let fixture: ComponentFixture<Pollo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pollo],
    }).compileComponents();

    fixture = TestBed.createComponent(Pollo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
