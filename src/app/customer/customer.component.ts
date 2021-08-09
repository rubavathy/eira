import { mimeType } from '../validators/fileType.validator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerDataService } from '../service/data/customer/customer-data.service';
import { CompanyMinDetails } from '../shared/companyMinDetails';
import { DataService } from '../shared/Data.service';
import { CustomerTableComponent } from './table/customer-table/customer-table.component';
import { CrossFieldErrorMatcher } from '../validators/crossField.errormatcher';
import { CustomValidators } from '../validators/checkIfValidName.validator';

// export class Customer {
//   customerId: number;
//   customerName: string;
//   customerAddress: string;
//   countryId: number;
//   stateId: number;
//   cityId: number;
//   pincode: string;
//   phoneNumber: string;
//   email: string;
//   primaryContactName: string;
//   primaryContactEmail: string;
//   primaryContactMobileNumber: string;
//   gstCompliant: boolean;
//   gstOrVatNumber: string;
//   panOrTaxNo: string;
//   active: boolean;
//   companyId: number;
// }

@Component({
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  countries = [];
  states = [];
  cities = [];
  selectedCountry: any;
  selectedState: any;

  errorMatcher = new CrossFieldErrorMatcher();

  customerForm = this.fb.group(
    {
      customerId: -1,
      customerCode: null,
      customerName: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Z ]+$'),
        ]),
      ],
      customerAddress: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(300),
        ]),
      ],
      description: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(1500),
        ]),
      ],

      countryId: [null, Validators.required],
      stateId: [null, Validators.required],
      cityId: [null, Validators.required],
      customerTypeId: [null, Validators.required],
      pincode: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
        ]),
      ],
      phoneNumber: [
        null,
        Validators.compose([
          Validators.minLength(10),
          Validators.maxLength(15),
          Validators.pattern('^[0-9 ]*$'),
        ]),
      ],
      email: [
        null,
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            '^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$'
          ),
        ],
      ],
      primaryContactName: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z ]+$'),
        ]),
      ],
      primaryContactEmail: [
        null,
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            '^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$'
          ),
        ],
      ],
      primaryContactMobileNumber: [
        null,
        Validators.compose([
          Validators.minLength(10),
          Validators.maxLength(15),
          Validators.pattern('^[0-9 ]*$'),
        ]),
      ],
      gstCompliant: [false, Validators.required],
      gstOrVatNumber: null,
      panOrTaxNo: [null, Validators.required],

      active: [false, Validators.required],
      companyId: [null, Validators.required],
    },
    {
      asyncValidators: [
        CustomValidators.verifyIfNameAlreadyExistsValidator(
          'customerName',
          'customerId',
          this.customerDataService
        ),
      ],
      updateOn: 'blur',
    }
  );

  imageForm: FormGroup = this.fb.group({
    customerImage: ['', Validators.compose([Validators.required]), mimeType],
  });
  imagePreview: string = '';

  customerData: any;
  companies: CompanyMinDetails[];

  customerTypes: any;

  files: File[] = [];

  @ViewChild(CustomerTableComponent)
  private customerTableComponent: CustomerTableComponent;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private customerDataService: CustomerDataService,
    private dataService: DataService,
    public dialog: MatDialog
  ) {}

  onSubmit() {
    console.log(this.customerForm);
    if (this.customerForm.valid) {
      this.saveCustomer();
    } else {
      this.showSnackBar('Not a Valid Customer!');
    }
  }

  showSnackBar(msg: any) {
    this.snackBar.open(msg, 'Close', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  saveCustomer() {
    var customerJsonData = this.customerForm.value;

    var companyId = customerJsonData.companyId;
    customerJsonData.company = {
      companyId: companyId,
    };
    console.log(JSON.stringify(customerJsonData));

    if (this.customerForm.get('customerId').value === -1) {
      if (typeof this.imageForm.value.customerImage == 'object') {
        this.customerDataService
          .createCustomerWithLogo(this.getCustomerData())
          .subscribe(
            (data) => {
              console.log(data);
              this.showSnackBar('Customer created Successfully!');
              this.customerTableComponent.refresh();

              this.customerForm.reset();
              this.resetForm();
            },
            (err) => {
              console.log(err);
              this.showSnackBar(err.error.message);
            }
          );
      } else {
        this.customerDataService
          .createCustomer(this.getCustomerData())
          .subscribe(
            (data) => {
              console.log(data);
              this.showSnackBar('Customer created Successfully!');
              this.customerTableComponent.refresh();

              this.customerForm.reset();
              this.resetForm();
            },
            (err) => {
              console.log(err);
              this.showSnackBar(err.error.message);
            }
          );
      }
    } else {
      if (typeof this.imageForm.value.customerImage == 'object') {
        this.customerDataService
          .updateCustomerWithLogo(this.getCustomerData())
          .subscribe(
            (data) => {
              console.log(data);
              this.showSnackBar('Customer details Updated Successfully!');
              this.customerTableComponent.refresh();

              this.customerForm.reset();
              this.resetForm();
            },
            (err) => {
              console.log(err);
              this.showSnackBar(err.error.message);
            }
          );
      } else {
        this.customerDataService
          .updateCustomer(this.getCustomerData())
          .subscribe(
            (data) => {
              console.log(data);
              this.showSnackBar('Customer details Updated Successfully!');
              this.customerTableComponent.refresh();

              this.customerForm.reset();
              this.resetForm();
            },
            (err) => {
              console.log(err);
              this.showSnackBar(err.error.message);
            }
          );
      }
    }
  }

  onEdit(row) {
    this.customerDataService
      .getCustomerById(row.customerId)
      .subscribe((data) => {
        console.log(data);

        this.customerData = data;
        this.customerData['companyId'] = data['company'];
        delete this.customerData['company'];

        var customerTempData = this.customerData;
        console.log(data);
        delete customerTempData.companyLogo;
        delete customerTempData.logoContentLength;
        delete customerTempData.logoContentType;

        this.customerForm.setValue(customerTempData);
        this.imageForm.setValue({ customerImage: '' });

        this.getStatesByCountry(this.customerData['countryId']);
        this.getCitiesByState(this.customerData['stateId']);
      });
  }

  resetForm() {
    this.customerForm.get('companyId').clearValidators();
    this.customerForm.get('companyId').updateValueAndValidity();

    this.customerForm.get('customerId').clearValidators();
    this.customerForm.get('customerId').updateValueAndValidity();

    this.customerForm.get('customerName').clearValidators();
    this.customerForm.get('customerName').updateValueAndValidity();

    this.customerForm.get('customerAddress').clearValidators();
    this.customerForm.get('customerAddress').updateValueAndValidity();

    this.customerForm.get('customerTypeId').clearValidators();
    this.customerForm.get('customerTypeId').updateValueAndValidity();

    this.customerForm.get('countryId').clearValidators();
    this.customerForm.get('countryId').updateValueAndValidity();

    this.customerForm.get('stateId').clearValidators();
    this.customerForm.get('stateId').updateValueAndValidity();

    this.customerForm.get('cityId').clearValidators();
    this.customerForm.get('cityId').updateValueAndValidity();

    this.customerForm.get('pincode').clearValidators();
    this.customerForm.get('pincode').updateValueAndValidity();

    this.customerForm.get('email').clearValidators();
    this.customerForm.get('email').updateValueAndValidity();

    this.customerForm.get('primaryContactName').clearValidators();
    this.customerForm.get('primaryContactName').updateValueAndValidity();

    this.customerForm.get('primaryContactEmail').clearValidators();
    this.customerForm.get('primaryContactEmail').updateValueAndValidity();

    this.customerForm.get('panOrTaxNo').clearValidators();
    this.customerForm.get('panOrTaxNo').updateValueAndValidity();

    this.customerForm.get('description').clearValidators();
    this.customerForm.get('description').updateValueAndValidity();

    this.customerForm.reset();

    this.imageForm.setValue({ customerImage: '' });
    this.imageForm.clearAsyncValidators();
    this.imageForm.clearValidators();
    this.imageForm.reset();

    this.files = [];
  }

  getCountries() {
    this.dataService.getCountries().subscribe((response) => {
      this.countries = response;
    });
  }

  getCompanies() {
    this.customerDataService.getCompanyMinDetails().subscribe((response) => {
      this.companies = response;
    });
  }

  getCustomerTypes() {
    this.customerDataService.getCustomerTypes().subscribe((response) => {
      this.customerTypes = response;
    });
  }

  getStatesByCountry(countryId: any) {
    this.dataService.getStatesByCountryId(countryId).subscribe((response) => {
      this.states = response;
    });
  }

  getCitiesByState(stateId) {
    this.dataService.getCitiesByStateId(stateId).subscribe((response) => {
      this.cities = response;
    });
  }

  ngOnInit(): void {
    this.getCountries();
    this.getCompanies();
    this.getCustomerTypes();
  }

  onChangeGSTComplaint(event: any) {
    if (this.customerForm.controls['gstCompliant'].value == true) {
      this.customerForm.controls['gstOrVatNumber'].validator =
        Validators.compose([Validators.required]);
    } else {
      this.customerForm.controls['gstOrVatNumber'].validator =
        Validators.compose([]);
    }
    this.customerForm.controls['gstOrVatNumber'].updateValueAndValidity();
  }

  onImagePiceked(event: Event) {
    const file = (event.target as HTMLInputElement).files?.item(0);
    this.imageForm.patchValue({ customerImage: file });
    this.imageForm.get('customerImage')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file as File);
  }

  getUserData(): FormData | object {
    if (typeof this.imageForm.value.customerImage == 'object') {
      const customerData = new FormData();
      customerData.append('file', this.imageForm.value.customerImage);
      customerData.append(
        'customer',
        JSON.stringify({ ...this.customerForm.value })
      );
      return customerData;
    } else {
      const customerData: object = {
        ...this.customerForm.value,
        customerImage: this.imageForm.value.customerImage,
      };
      return customerData;
    }
  }

  onSelect(event) {
    if (this.files.length === 0) {
      this.files.push(...event.addedFiles);
      console.log(event);

      const file = event.addedFiles[0];
      this.imageForm.patchValue({ customerImage: file });
      this.imageForm.get('customerImage')?.updateValueAndValidity();
      console.log(typeof this.imageForm.value.customerImage);
    } else {
      this.showSnackBar('Remove the Pre-existing Logo First');
    }
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  getCustomerData(): FormData | object {
    const image = this.imageForm.value.customerImage;
    console.log(image);
    if (typeof image == 'object') {
      const customerData = new FormData();
      customerData.append('file', image);
      customerData.append(
        'customerString',
        JSON.stringify({ ...this.customerForm.value })
      );
      console.log(JSON.stringify({ ...this.customerForm.value }));
      return customerData;
    } else {
      return {
        ...this.customerForm.value,
        customerImage: this.imageForm.value.customerImage,
      };
    }
  }
}
