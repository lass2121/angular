import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OrderStatusAdminComponent } from './order-status-admin.component';
import { TableModule } from 'primeng/table';
import { RadioButtonModule } from 'primeng/radiobutton';
import { IcafeManagementService } from 'src/app/services/icafe-management/icafe-management.service';

describe('OrderStatusAdminComponent', () => {
  let component: OrderStatusAdminComponent;
  let fixture: ComponentFixture<OrderStatusAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TableModule, RadioButtonModule],
      declarations: [OrderStatusAdminComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderStatusAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateOrderStatus', () => {
    let data = {
      createdAt: '',
      name: '',
      userId: '',
      locationId: '',
      pcNumber: '',
      dateBooking: '',
      duration: '',
      totalAmount: '',
      icafeName: '',
      icafeAddress: '',
    };

    component.updateOrderStatus(data);
    fixture.detectChanges();
    let service = fixture.debugElement.injector.get(IcafeManagementService);
    spyOn(service, 'updateOrderStatus');
    service.updateOrderStatus('1', data, 'admin');

    expect(service.updateOrderStatus).toHaveBeenCalled();
  });

  it('should call updateOrderStatus', () => {
    component.convertToDate(new Date());
    fixture.detectChanges();
  });
});
