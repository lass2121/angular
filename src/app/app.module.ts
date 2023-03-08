import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { TableModule } from 'primeng/table';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DragDropModule } from 'primeng/dragdrop';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { SkeletonModule } from 'primeng/skeleton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SplitterModule } from 'primeng/splitter';
import { CarouselModule } from 'primeng/carousel';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { DashboardComponent } from './pages/user-pages/dashboard/dashboard.component';
import { DashboardHomeComponent } from './pages/user-pages/dashboard-home/dashboard-home.component';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
import { ListComponent } from './pages/user-pages/list/list.component';
import { OrderStatusComponent } from './pages/user-pages/order-status/order-status.component';
import { AdminComponent } from './pages/admin-pages/admin/admin.component';
import { DashboardAdminHomeComponent } from './pages/admin-pages/dashboard-admin-home/dashboard-admin-home.component';
import { ListDetailComponent } from './pages/user-pages/list-detail/list-detail.component';
import { IcafeManagementComponent } from './pages/admin-pages/icafe-management/icafe-management.component';
import { SidebarAddIcafeComponent } from './components/sidebar-add-icafe/sidebar-add-icafe.component';
import { OrderStatusAdminComponent } from './pages/admin-pages/order-status-admin/order-status-admin.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { httpInterceptorProviders } from '../app/interceptors';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    NavbarComponent,
    LoginFormComponent,
    DashboardComponent,
    DashboardHomeComponent,
    DashboardCardComponent,
    ListComponent,
    OrderStatusComponent,
    AdminComponent,
    ListDetailComponent,
    IcafeManagementComponent,
    SidebarAddIcafeComponent,
    OrderStatusAdminComponent,
    AboutUsComponent,
    DashboardAdminHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule,
    BrowserAnimationsModule,
    MenubarModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    DialogModule,
    ReactiveFormsModule,
    SplitButtonModule,
    SidebarModule,
    DropdownModule,
    FormsModule,
    TableModule,
    InputTextareaModule,
    DragDropModule,
    CalendarModule,
    RadioButtonModule,
    InputNumberModule,
    SelectButtonModule,
    HttpClientModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    SkeletonModule,
    InputSwitchModule,
    SplitterModule,
    CarouselModule,
  ],
  bootstrap: [AppComponent],
  providers: [httpInterceptorProviders],
})
export class AppModule {}
