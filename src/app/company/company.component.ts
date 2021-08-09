import { CustomValidators } from '../validators/checkIfValidName.validator';
import { mimeType } from '../validators/fileType.validator';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerDataService } from '../service/data/customer/customer-data.service';
import { DataService } from '../shared/Data.service';
import { CompanyTableComponent } from './table/company-table/company-table.component';
import { CrossFieldErrorMatcher } from '../validators/crossField.errormatcher';

@Component({
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CompanyComponent implements OnInit {
  countries = [];
  states = [];
  cities = [];
  selectedCountry: any;
  selectedState: any;
  initialCountry: string = 'in';
  files: File[] = [];
  errorMatcher = new CrossFieldErrorMatcher();

  ng2TelInputOptions = { initialCountry: 'in' };
  companyForm = this.fb.group(
    {
      companyId: -1,
      companyName: [
        null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Z ]+$'),
        ],
      ],
      companyAddress: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(300),
        ]),
      ],
      countryId: [null, Validators.required],
      stateId: [null, Validators.required],
      cityId: [null, Validators.required],
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
          Validators.required,
          Validators.pattern('^[0-9 ]*$'),
          Validators.minLength(9),
          Validators.maxLength(15),
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
          Validators.minLength(9),
          Validators.maxLength(15),
          Validators.pattern('^[0-9 ]*$'),
        ]),
      ],
      gstCompliant: [false, Validators.required],
      gstOrVatNumber: null,
      panOrTaxNo: [null, Validators.required],
      active: [false, Validators.required],
      companyCode: null,
      description: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(1500),
        ]),
      ],
    },
    {
      asyncValidators: [
        CustomValidators.verifyIfNameAlreadyExistsValidator(
          'companyName',
          'companyId',
          this.customerDataService
        ),
      ],
      updateOn: 'blur',
    }
  );

  imageForm: FormGroup = this.fb.group({
    companyImage: ['', Validators.compose([Validators.required]), mimeType],
  });
  ifCompanyNameExists = false;

  imagePreview: string = '';

  companyData: any;

  @ViewChild(CompanyTableComponent)
  private companyTableComponent: CompanyTableComponent;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private customerDataService: CustomerDataService,
    private dataService: DataService,
    public dialog: MatDialog
  ) {}

  onSubmit() {
    console.log(this.companyForm);
    if (this.companyForm.valid) {
      this.saveCompany();
    }
  }

  showSnackBar(msg: any) {
    this.snackBar.open(msg, 'Close', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  saveCompany() {
    var companyJsonData = this.companyForm.value;

    // console.log(JSON.stringify(companyJsonData));
    if (this.companyForm.get('companyId').value === -1) {
      if (typeof this.imageForm.value.companyImage === 'object') {
        console.log(typeof this.imageForm.value.companyImage);
        this.customerDataService
          .createCompanyWithLogo(this.getCompanyData())
          .subscribe(
            (data) => {
              console.log(data);
              this.showSnackBar('Company created Successfully!');
              this.companyTableComponent.refresh();

              this.companyForm.reset();
              this.resetForm();
            },
            (err) => {
              console.log(err);
              this.showSnackBar(err.error.message);
              // this.showSnackBar(err.error);
            }
          );
      } else {
        this.customerDataService.createCompany(this.getCompanyData()).subscribe(
          (data) => {
            console.log(data);
            this.showSnackBar('Company created Successfully!');
            this.companyTableComponent.refresh();

            this.companyForm.reset();
            this.resetForm();
          },
          (err) => {
            console.log(err);
            this.showSnackBar(err.error.message);
            // this.showSnackBar(err.error);
          }
        );
      }
    } else {
      if (typeof this.imageForm.value.companyImage === 'object') {
        this.customerDataService
          .updateCompanyWithLogo(this.getCompanyData())
          .subscribe(
            (data) => {
              console.log(data);
              this.showSnackBar('Company details Updated Successfully!');
              this.companyTableComponent.refresh();

              this.companyForm.reset();
              this.resetForm();
            },
            (err) => {
              console.log(err);
              this.showSnackBar(err.error.message);
            }
          );
      } else {
        this.customerDataService.updateCompany(this.getCompanyData()).subscribe(
          (data) => {
            console.log(data);
            this.showSnackBar('Company details Updated Successfully!');
            this.companyTableComponent.refresh();

            this.companyForm.reset();
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
    this.customerDataService.getCompanyById(row.companyId).subscribe((data) => {
      console.log(data);
      this.companyData = data;
      var companyTempData = this.companyData;

      console.log(data);
      delete companyTempData.companyLogo;
      delete companyTempData.logoContentLength;
      delete companyTempData.logoContentType;

      this.companyForm.setValue(companyTempData);
      this.imageForm.setValue({ companyImage: '' });

      this.getStatesByCountry(this.companyData['countryId']);
      this.getCitiesByState(this.companyData['stateId']);
    });
  }

  resetForm() {
    this.companyForm.get('companyId').clearValidators();
    this.companyForm.get('companyId').updateValueAndValidity();

    this.companyForm.get('companyName').clearValidators();
    this.companyForm.get('companyName').updateValueAndValidity();

    this.companyForm.get('companyAddress').clearValidators();
    this.companyForm.get('companyAddress').updateValueAndValidity();

    this.companyForm.get('countryId').clearValidators();
    this.companyForm.get('countryId').updateValueAndValidity();

    this.companyForm.get('stateId').clearValidators();
    this.companyForm.get('stateId').updateValueAndValidity();

    this.companyForm.get('cityId').clearValidators();
    this.companyForm.get('cityId').updateValueAndValidity();

    this.companyForm.get('pincode').clearValidators();
    this.companyForm.get('pincode').updateValueAndValidity();

    this.companyForm.get('email').clearValidators();
    this.companyForm.get('email').updateValueAndValidity();

    this.companyForm.get('primaryContactName').clearValidators();
    this.companyForm.get('primaryContactName').updateValueAndValidity();

    this.companyForm.get('primaryContactEmail').clearValidators();
    this.companyForm.get('primaryContactEmail').updateValueAndValidity();

    this.companyForm.get('panOrTaxNo').clearValidators();
    this.companyForm.get('panOrTaxNo').updateValueAndValidity();

    this.companyForm.get('phoneNumber').clearValidators();
    this.companyForm.get('phoneNumber').updateValueAndValidity();

    this.companyForm.get('description').clearValidators();
    this.companyForm.get('description').updateValueAndValidity();

    this.companyForm.get('gstOrVatNumber').clearValidators();
    this.companyForm.get('gstOrVatNumber').updateValueAndValidity();
    // this.companyForm.clearValidators();
    // this.companyForm.clearAsyncValidators();
    // this.companyForm.updateValueAndValidity();

    this.files = [];
    this.companyForm.reset();

    this.imageForm.setValue({ companyImage: '' });
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

  getStatesByCountry(countryId: any) {
    this.dataService.getStatesByCountryId(countryId).subscribe((response) => {
      this.states = response;
    });
    this.updateFlag(countryId);
  }

  getCitiesByState(stateId) {
    this.dataService.getCitiesByStateId(stateId).subscribe((response) => {
      this.cities = response;
    });
  }

  ngOnInit(): void {
    console.log('in OnInit');

    this.getCountries();
  }

  onChangeGSTComplaint(event: any) {
    if (this.companyForm.controls['gstCompliant'].value == true) {
      this.companyForm.controls['gstOrVatNumber'].validator =
        Validators.compose([Validators.required]);
    } else {
      this.companyForm.controls['gstOrVatNumber'].validator =
        Validators.compose([]);
    }
    this.companyForm.controls['gstOrVatNumber'].updateValueAndValidity();
  }

  updateCountry(data: any) {
    console.log(data);
    //this.companyForm.controls["country"].setValue("sdfsdf");
  }
  updateFlag(data: any) {
    console.log(this.companyForm.controls['countryId'].value);
    this.countries.forEach((element) => {
      if (element.countryId === this.companyForm.controls['countryId'].value) {
        this.initialCountry = element.countryCode.toLowerCase();
        this.companyForm.controls['phoneNumber'].updateValueAndValidity();
      }
    });
  }

  telInputObject(obj) {
    console.log(obj);
    obj.setCountry('in');
  }

  onSelect(event) {
    console.log(event);
    if (this.files.length === 0) {
      this.files.push(...event.addedFiles);
      console.log(event);
      const file = event.addedFiles[0];
      this.imageForm.patchValue({ companyImage: file });
      this.imageForm.get('companyImage')?.updateValueAndValidity();
      console.log(typeof this.imageForm.value.companyImage);
    } else {
      this.showSnackBar('Remove the Pre-existing Logo First');
    }
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  getCompanyData(): FormData | object {
    const image = this.imageForm.value.companyImage;
    console.log(image);
    if (typeof image == 'object') {
      const companyData = new FormData();

      companyData.append('file', image);
      companyData.append(
        'companyString',
        JSON.stringify({ ...this.companyForm.value })
      );
      console.log(JSON.stringify({ ...this.companyForm.value }));
      return companyData;
    } else {
      return {
        ...this.companyForm.value,
        companyImage: this.imageForm.value.companyImage,
      };
    }
  }

  getError() {
    console.log(this.companyForm.errors);
    console.log(this.companyForm.errors?.alreadyExists);
    return this.companyForm.errors?.alreadyExists;
  }
}
