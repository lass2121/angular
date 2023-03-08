import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListComponent } from './list.component';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CardModule,
        DropdownModule,
        FormsModule,
      ],
      declarations: [ListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onChangeCountry function', () => {
    const event = {
      value: {
        id_provinsi: '',
        id: '',
      },
    };
    component.onChangeCountry(event);
    let onChangeCountry = spyOn(component, 'onChangeCountry');
    fixture.detectChanges();

    // expect(component).toBeTruthy();
  });

  it('should call onChangeCity function', () => {
    const event = {
      value: {
        id_provinsi: '',
        id: '',
      },
    };
    component.onChangeCity(event);
    let onChangeCountry = spyOn(component, 'onChangeCity');
    fixture.detectChanges();
  });

  it('should call navigateDetailList function', () => {
    const event = {
      value: {
        id_provinsi: '',
        id: '',
      },
    };
    const routerSpy = spyOn(router, 'navigateByUrl');

    component.navigateDetailList(event);
    let onChangeCountry = spyOn(component, 'onChangeCity');
    fixture.detectChanges();
    expect(routerSpy).toHaveBeenCalled();
  });
});
