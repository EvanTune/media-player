import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtTableComponent } from './et-table.component';

describe('EtTableComponent', () => {
  let component: EtTableComponent;
  let fixture: ComponentFixture<EtTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
