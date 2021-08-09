import { CustomerDataService } from 'src/app/service/data/customer/customer-data.service';
import { AsyncValidatorFn, FormGroup } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

export class CustomValidators {
  // static passwordMustMatch(controlName: string, matchingControlName: string) {
  //   return (formGroup: FormGroup) => {
  //     const control = formGroup.controls[controlName];
  //     const matchingControl = formGroup.controls[matchingControlName];

  //     if (matchingControl.errors && !matchingControl.errors.mustMatch) {
  //       return;
  //     }

  //     if (control.value !== matchingControl.value) {
  //       matchingControl.setErrors({ matchFail: true });
  //     } else {
  //       matchingControl.setErrors(null);
  //     }
  //   };
  // }

  static verifyIfNameAlreadyExistsValidator(
    controlName: string,
    idControlName: string,
    customerDataService: CustomerDataService
  ): AsyncValidatorFn {
    return (
      formGroup: FormGroup
    ):
      | Observable<ValidationErrors | null>
      | Promise<ValidationErrors | null> => {
      const control = formGroup.controls[controlName];
      const idControl = formGroup.controls[idControlName];

      console.log(idControl.value);
      if (idControl.value === -1) {
        if (controlName === 'companyName') {
          return new Promise((resolve) => {
            setTimeout(() => {
              if (control.value == '') {
                resolve(null);
              } else {
                customerDataService
                  .ifCompanyNameExists(control.value)
                  .subscribe(
                    () => {
                      resolve({
                        alreadyExists: true,
                      });
                    },
                    () => {
                      resolve(null);
                    }
                  );
              }
            }, 500);
          });
        } else if ((controlName = 'customerName')) {
          return new Promise((resolve) => {
            setTimeout(() => {
              if (control.value == '') {
                resolve(null);
              } else {
                customerDataService
                  .ifCustomerNameExists(control.value)
                  .subscribe(
                    () => {
                      resolve({
                        alreadyExists: true,
                      });
                    },
                    () => {
                      resolve(null);
                    }
                  );
              }
            }, 500);
          });
        } else if ((controlName = 'siteName')) {
          return new Promise((resolve) => {
            setTimeout(() => {
              if (control.value == '') {
                resolve(null);
              } else {
                customerDataService.ifSiteNameExists(control.value).subscribe(
                  () => {
                    resolve({
                      alreadyExists: true,
                    });
                  },
                  () => {
                    resolve(null);
                  }
                );
              }
            }, 500);
          });
        }
      } else {
        return new Promise((resolve) => {
          resolve(null);
        });
      }
    };
  }
}
