import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardModule } from 'primeng/card';
import { DashboardAdminHomeComponent } from './dashboard-admin-home.component';
import { DashboardCardComponent } from '../../../../components/dashboard-card/dashboard-card.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardAdminHomeComponent', () => {
  let component: DashboardAdminHomeComponent;
  let fixture: ComponentFixture<DashboardAdminHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardModule, RouterTestingModule],
      declarations: [DashboardAdminHomeComponent, DashboardCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardAdminHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
