import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagersViewPanelComponent } from './managers-view-panel.component';

describe('ManagersViewPanelComponent', () => {
  let component: ManagersViewPanelComponent;
  let fixture: ComponentFixture<ManagersViewPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagersViewPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagersViewPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
