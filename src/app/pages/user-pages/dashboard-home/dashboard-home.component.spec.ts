import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardModule } from 'primeng/card';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MenubarModule } from 'primeng/menubar';
import { DashboardHomeComponent } from './dashboard-home.component';
import { DashboardCardComponent } from '../../../components/dashboard-card/dashboard-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/services/users/user.service';
import { of } from 'rxjs';

describe('DashboardHomeComponent', () => {
  let component: DashboardHomeComponent;
  let fixture: ComponentFixture<DashboardHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CardModule,
        HttpClientTestingModule,
        MenubarModule,
        RouterTestingModule,
      ],
      declarations: [DashboardHomeComponent, DashboardCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should getIcafeManagementService in ngOnInit', () => {
  //   let service = fixture.debugElement.injector.get(UserService);
  //   service.user
  //   spyOn(service, 'user')
  //   fixture.detectChanges();
  // });
});
