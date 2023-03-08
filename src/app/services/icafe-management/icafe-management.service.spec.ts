import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IcafeManagementService } from './icafe-management.service';
import { of } from 'rxjs';

describe('IcafeManagementService', () => {
  let service: IcafeManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(IcafeManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getCityDDL function', () => {
    spyOn(service, 'getCityDDL').and.returnValue();

    service.getCityDDL('');

    service.dataCity.subscribe((data) =>
      expect(data).toBeGreaterThanOrEqual(0)
    );
  });

  it('should call getProvinceDDL function', () => {
    spyOn(service, 'getProvinceDDL').and.returnValue();

    service.getProvinceDDL();

    service.dataProvince.subscribe((data) =>
      expect(data).toBeGreaterThanOrEqual(0)
    );
  });

  it('should call getIcafeLocation function', () => {
    spyOn(service, 'getIcafeLocation').and.returnValue();

    service.getIcafeLocation();

    service.dataCity.subscribe((data) =>
      expect(data).toBeGreaterThanOrEqual(0)
    );
  });

  it('should call getSingleIcafeLocation function', () => {
    spyOn(service, 'getSingleIcafeLocation').and.returnValue();

    service.getSingleIcafeLocation('1');

    service.icafe.subscribe((data) => expect(data).toEqual({}));
  });

  it('should call createNewIcafe function', () => {
    service.createNewIcafe('1');

    spyOn(service, 'createNewIcafe');

    expect(service.createNewIcafe).toHaveBeenCalled;
  });

  it('should call deleteIcafe function', () => {
    service.deleteIcafe('1');

    spyOn(service, 'deleteIcafe');

    expect(service.deleteIcafe).toHaveBeenCalled;
  });

  it('should call updateIcafe function', () => {
    service.updateIcafe('1', '1');

    spyOn(service, 'updateIcafe');

    expect(service.updateIcafe).toHaveBeenCalled;
  });

  it('should call getOrderStatus function with userId', () => {
    service.getOrderStatus('1');

    spyOn(service, 'getOrderStatus');

    expect(service.getOrderStatus).toHaveBeenCalled;
  });
});
