import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificaComponent } from './certifica.component';

describe('CertificaComponent', () => {
  let component: CertificaComponent;
  let fixture: ComponentFixture<CertificaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CertificaComponent]
    });
    fixture = TestBed.createComponent(CertificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
