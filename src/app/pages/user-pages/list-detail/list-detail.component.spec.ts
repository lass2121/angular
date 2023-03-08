import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ListDetailComponent } from './list-detail.component';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';

describe('ListDetailComponent', () => {
  let component: ListDetailComponent;
  let fixture: ComponentFixture<ListDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        CalendarModule,
        CardModule,
        ReactiveFormsModule,
        SkeletonModule,
      ],
      declarations: [ListDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call submitFormBooking function', () => {
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

    component.submitFormBooking();
    fixture.detectChanges();
  });

  it('should call calculateTotal with empty value duration', () => {
    component.formBookingDetail.value.duration = null;
    component.calculateTotal();
    fixture.detectChanges();

    expect(component.totalAmount).toEqual(0);
  });

  it('should call showTopCenter function', () => {
    component.messageService.add({
      key: 'tc',
      severity: 'warn',
      summary: 'Error',
      detail: 'sds',
    });

    component.showTopCenter('');
    fixture.detectChanges();
    expect(Object.keys(component.messageService).length).toBe(4);
  });

  it('should call getHours function', () => {
    component.getHours('', 2);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call checkAvailablePc function', () => {
    component.checkAvailablePc();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
