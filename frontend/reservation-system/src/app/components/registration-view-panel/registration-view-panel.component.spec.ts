import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationViewPanelComponent } from './registration-view-panel.component';

describe('RegistrationViewPanelComponent', () => {
  let component: RegistrationViewPanelComponent;
  let fixture: ComponentFixture<RegistrationViewPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationViewPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationViewPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
