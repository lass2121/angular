import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IcafeManagementService } from 'src/app/services/icafe-management/icafe-management.service';
import { MessageService } from 'primeng/api';
import * as _ from 'lodash';

@Component({
  selector: 'app-sidebar-add-icafe',
  templateUrl: './sidebar-add-icafe.component.html',
  styleUrls: ['./sidebar-add-icafe.component.css'],
  providers: [MessageService],
})
export class SidebarAddIcafeComponent implements OnInit, OnChanges {
  @Input() province = {
    nama: '',
    id: '',
  };
  @Input() city = {
    id: '',
    id_provinsi: '',
    nama: '',
  };

  @Input() icafe: any = {};

  @Output() getIcafe = new EventEmitter();

  displaySidebarCafe = false;

  constructor(
    public icafeManagementService: IcafeManagementService,
    public messageService: MessageService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (!_.isEmpty(this.icafe)) {
      this.formIcafe.setValue({
        name: this.icafe.name,
        totalPc: this.icafe.totalPc,
        description: this.icafe.description,
      });
    }
  }

  ngOnInit() {}

  formIcafe = new FormGroup({
    name: new FormControl('', [Validators.required]),
    totalPc: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  addIcafe() {
    if (!_.isEmpty(this.icafe)) {
      const payload = {
        createdAt: this.icafe.createdAt,
        name: this.formIcafe.value.name,
        description: this.formIcafe.value.description,
        totalPc: this.formIcafe.value.totalPc,
        provinceId: this.province.id,
        cityId: this.city.id,
      };

      this.icafeManagementService.updateIcafe(this.icafe.id, payload);
      this.icafeManagementService.visibleSidebar = false;
      this.icafe = {};
      this.showTopCenter('Data i-cafe baru sukses diubah');
      this.getIcafe.emit();
    } else {
      const payload = {
        createdAt: Date.now(),
        name: this.formIcafe.value.name,
        description: this.formIcafe.value.description,
        totalPc: this.formIcafe.value.totalPc,
        provinceId: this.province.id,
        cityId: this.city.id,
      };

      this.icafeManagementService.createNewIcafe(payload);
      this.icafeManagementService.visibleSidebar = false;
      this.showTopCenter('Data i-cafe baru sukses dibuat');
      this.getIcafe.emit();
    }
  }

  deleteIcafe() {
    this.icafeManagementService.deleteIcafe(this.icafe.id);
    this.displaySidebarCafe = false;
    this.icafeManagementService.visibleSidebar = false;
    this.showTopCenter('Data i-cafe berhasil dihapus');
    this.getIcafe.emit();
  }

  checkValidation(formParam: string) {
    return this.formIcafe.get(formParam);
  }

  showTopCenter(detail: string) {
    this.messageService.add({
      key: 'tc',
      severity: 'success',
      summary: 'Berhasil',
      detail: detail,
    });
  }

  removeSelectedIcafe() {
    this.icafe = {};
    this.formIcafe.setValue({
      name: '',
      totalPc: '',
      description: '',
    });
  }
}
