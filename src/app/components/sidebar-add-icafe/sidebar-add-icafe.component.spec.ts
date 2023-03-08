import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SidebarAddIcafeComponent } from './sidebar-add-icafe.component';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { SimpleChanges } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IcafeManagementService } from 'src/app/services/icafe-management/icafe-management.service';
import { of } from 'rxjs';

describe('SidebarAddIcafeComponent', () => {
  let component: SidebarAddIcafeComponent;
  let fixture: ComponentFixture<SidebarAddIcafeComponent>;
  let simpleChanges: SimpleChanges;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SidebarModule,
        ToastModule,
        ReactiveFormsModule,
        ButtonModule,
        BrowserAnimationsModule,
        SkeletonModule,
        DialogModule,
      ],
      declarations: [SidebarAddIcafeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarAddIcafeComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

  it('should call removeSelectedIcafe function', () => {
    component.removeSelectedIcafe();
    fixture.detectChanges();

    expect(Object.keys(component.icafe).length).toBe(0);
  });

  it('should call deleteIcafe function', () => {
    let service = fixture.debugElement.injector.get(IcafeManagementService);
    spyOn(service, 'deleteIcafe').and.returnValue();
    component.deleteIcafe();
    fixture.detectChanges();

    expect(service.visibleSidebar).toBeFalsy;
  });

  it('should call addIcafe function with icafe is not empty', () => {
    let service = fixture.debugElement.injector.get(IcafeManagementService);
    component.icafe = { name: '' };
    spyOn(service, 'updateIcafe');

    component.addIcafe();
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should call addIcafe function with icafe is not empty', () => {
    let service = fixture.debugElement.injector.get(IcafeManagementService);
    component.icafe = {};
    spyOn(service, 'createNewIcafe');

    component.addIcafe();
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
