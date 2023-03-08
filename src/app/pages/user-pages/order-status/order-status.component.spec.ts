import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OrderStatusComponent } from './order-status.component';
import { TableModule } from 'primeng/table';

describe('OrderStatusComponent', () => {
  let component: OrderStatusComponent;
  let fixture: ComponentFixture<OrderStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TableModule],
      declarations: [OrderStatusComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderStatusComponent);
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
  });

  it('should call convertDate', () => {
    component.convertToDate(new Date());
    fixture.detectChanges();
  });
});
