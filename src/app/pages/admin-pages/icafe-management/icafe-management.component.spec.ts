import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CardModule } from 'primeng/card';
import { IcafeManagementComponent } from './icafe-management.component';
import { DropdownModule } from 'primeng/dropdown';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SidebarAddIcafeComponent } from '../../../components/sidebar-add-icafe/sidebar-add-icafe.component';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IcafeManagementService } from 'src/app/services/icafe-management/icafe-management.service';

describe('IcafeManagementComponent', () => {
  let component: IcafeManagementComponent;
  let fixture: ComponentFixture<IcafeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CardModule,
        DropdownModule,
        SidebarModule,
        ToastModule,
        FormsModule,
        ButtonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      declarations: [IcafeManagementComponent, SidebarAddIcafeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IcafeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onChangeCountry', () => {
    const event = {
      value: {
        id_provinsi: '',
        id: '',
      },
    };

    component.onChangeCountry(event);
    let onChangeCountry = spyOn(component, 'onChangeCountry');
    fixture.detectChanges();

    expect(component).toBeTruthy();
    // expect(onChangeCountry).toHaveBeenCalled();
  });

  it('should call onChangeCity', () => {
    const event = {
      value: {
        id_provinsi: '',
        id: '',
      },
    };

    component.onChangeCity(event);

    let onChangeCountry = spyOn(component, 'onChangeCity');
    fixture.detectChanges();
    expect(component).toBeTruthy();
    // expect(onChangeCity).toHaveBeenCalled();
  });

  it('should call getFilteredIcafe', () => {
    component.getFilteredIcafe(1, 2);
    fixture.detectChanges();
  });

  it('should call showEditSidebar', () => {
    component.showEditSidebar('');
    fixture.detectChanges();
  });
});
