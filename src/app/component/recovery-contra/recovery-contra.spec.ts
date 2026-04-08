import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryContra } from './recovery-contra';

describe('RecoveryContra', () => {
  let component: RecoveryContra;
  let fixture: ComponentFixture<RecoveryContra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecoveryContra],
    }).compileComponents();

    fixture = TestBed.createComponent(RecoveryContra);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
