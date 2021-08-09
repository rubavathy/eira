import {AbstractControl, AsyncValidatorFn} from '@angular/forms';
import { map } from 'rxjs/operators';
import { CustomerDataService } from '../service/data/customer/customer-data.service';


export class PlantType {
  plantTypeId: number;
  plantType: string;
  shortName: String;
  description: String;
  active: boolean;
}

export class SiteType {
  siteTypeId: number;
  siteType: string;
  shortName: String;
  description: String;
  active: boolean;
}

export class PlantCapacity {
  plantCapacityId: number;
  plantCapacity: string;
  description: string;
  active: boolean;
}

export class Country {
  countryId: number;
  countryCode: string;
  countryName: string;
  active: boolean;
}


export class State {
  stateId: number;
  stateCode: string;
  stateName: string;
  active: boolean;
}

export class City {
  cityId: number;
  cityName: string;
  stateId: number;
  active: boolean;
}


export class CustomerType {
  customerTypeId : number;
  customerType : string;
  shortName : string;
  description : string;
  active : boolean;
}

export interface UserRole {
  roleId : number
  roleName : string
  description : string
  active : boolean
}



export function userExistsValidator(customerDataService: CustomerDataService):AsyncValidatorFn  {
    return (control: AbstractControl) => {
        return customerDataService.findUserByUsername(control.value)
            .pipe(
                map(user => user ? {userExists:true} : null)
            );
    }
}
