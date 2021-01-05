import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorsViewPanelComponent } from './administrators-view-panel.component';

describe('AdministratorsViewPanelComponent', () => {
  let component: AdministratorsViewPanelComponent;
  let fixture: ComponentFixture<AdministratorsViewPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorsViewPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorsViewPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
