import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auditor } from './auditor';

describe('Auditor', () => {
  let component: Auditor;
  let fixture: ComponentFixture<Auditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Auditor],
    }).compileComponents();

    fixture = TestBed.createComponent(Auditor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
