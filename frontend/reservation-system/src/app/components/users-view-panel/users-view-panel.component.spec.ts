import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersViewPanelComponent } from './users-view-panel.component';

describe('UsersViewPanelComponent', () => {
  let component: UsersViewPanelComponent;
  let fixture: ComponentFixture<UsersViewPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersViewPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersViewPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
