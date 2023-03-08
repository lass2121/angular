import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { AboutUsComponent } from './about-us.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('AboutUsComponent', () => {
  let component: AboutUsComponent;
  let fixture: ComponentFixture<AboutUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CardModule,
        CarouselModule,
        DialogModule,
        MenubarModule,
        ToastModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      declarations: [AboutUsComponent, NavbarComponent, LoginFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
