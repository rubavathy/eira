import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompanyTableItem } from 'src/app/company/table/company-table/company-table.component';
import { CustomerTableItem } from 'src/app/customer/table/customer-table/customer-table.component';
import { DataLoggerTableItem } from 'src/app/datalogger/table/dataLogger-table/dataLogger-table.component';
import {
  PlantCapacity,
  PlantType,
  SiteType,
  UserRole,
} from 'src/app/shared/common-classes';
import { CompanyMinDetails } from 'src/app/shared/companyMinDetails';
import { RegionData } from 'src/app/shared/dialog/region-dialog/region-dialog.component';
import { EquipmentCategory } from 'src/app/shared/equipment-category';
import { EquipmentType } from 'src/app/shared/equipment-type';
import { SiteTableItem } from 'src/app/site/table/site-table/site-table.component';
import { environment } from 'src/environments/environment';
import { EquipmentCategoryTableItem } from 'src/app/equipment-category/equipment-category-table/equipment-category-table.component';
import { StandardisedErrorCodeTableItem } from 'src/app/standardised-error-code/standardised-error-code-table/standardised-error-code-table.component';
import { Observable } from 'rxjs';
import { UserPermission } from 'src/app/shared/userPermission.interface';
import { UserPermissionMappingData } from 'src/app/shared/userPermissionMapping.interface';

@Injectable({
  providedIn: 'root',
})
export class CustomerDataService {
  constructor(private http: HttpClient) {}

  getAllCustomers(companyId: number) {
    return this.http.get<CustomerTableItem[]>(
      `${environment.apiUrl}/customer/getCustomerDetails/${companyId}`
    );
  }

  createCustomer(customer) {
    return this.http.post(`${environment.apiUrl}/customer/add`, customer);
  }

  createCustomerWithLogo(customer) {
    return this.http.post(
      `${environment.apiUrl}/customer/addWithLogo`,
      customer
    );
  }

  updateCustomer(customer) {
    return this.http.put(`${environment.apiUrl}/customer`, customer);
  }

  updateCustomerWithLogo(customer) {
    return this.http.put(`${environment.apiUrl}/customer/updateLogo`, customer);
  }

  getCustomerById(customerId: any) {
    return this.http.get(`${environment.apiUrl}/customer/${customerId}`);
  }

  getAllPlantTypes() {
    return this.http.get<PlantType[]>(`${environment.apiUrl}/plantType/getAll`);
  }

  getAllSiteTypes() {
    return this.http.get<SiteType[]>(`${environment.apiUrl}/siteType/getAll`);
  }

  getAllPlantCapacity() {
    return this.http.get<PlantCapacity[]>(
      `${environment.apiUrl}/site/getPlantCapacity`
    );
  }

  getSiteDetails() {
    return this.http.get<SiteTableItem[]>(
      `${environment.apiUrl}/site/getSiteDetails`
    );
  }

  createSite(site) {
    return this.http.post(`${environment.apiUrl}/site/add`, site);
  }

  updateSite(site) {
    return this.http.put(`${environment.apiUrl}/site`, site);
  }

  getSiteImagesById(id: number) {
    return this.http.get(`${environment.apiUrl}/siteImages/${id}`);
  }

  createSiteWithImage(site) {
    return this.http.post(`${environment.apiUrl}/site/addWithImage`, site);
  }

  updateSiteWithImage(site) {
    return this.http.put(`${environment.apiUrl}/site/updateWithImage`, site);
  }

  getSiteById(siteId: any) {
    return this.http.get(`${environment.apiUrl}/site/getById/${siteId}`);
  }

  getAllSiteDetails(companyId: any) {
    return this.http.get(`${environment.apiUrl}/site/getAll/${companyId}`);
  }
  getAllSites() {
    return this.http.get(`${environment.apiUrl}/site/getAll`);
  }

  createCompany(company) {
    return this.http.post(`${environment.apiUrl}/company/add`, company);
  }

  createCompanyWithLogo(company) {
    return this.http.post(`${environment.apiUrl}/company/addWithLogo`, company);
  }

  updateCompany(company) {
    return this.http.put(`${environment.apiUrl}/company`, company);
  }

  updateCompanyWithLogo(company) {
    return this.http.put(`${environment.apiUrl}/company/updateLogo`, company);
  }

  getCompanyById(companyId: any) {
    return this.http.get(`${environment.apiUrl}/company/getById/${companyId}`);
  }

  getCompanyDetails() {
    return this.http.get<CompanyTableItem[]>(
      `${environment.apiUrl}/company/getCompanyDetails`
    );
  }

  getCompanyMinDetails() {
    return this.http.get<CompanyMinDetails[]>(
      `${environment.apiUrl}/company/getCompanyMinDetails`
    );
  }

  getCustomerTypes() {
    return this.http.get(`${environment.apiUrl}/customerType/getAll`);
  }

  createRegion(region) {
    return this.http.post(`${environment.apiUrl}/region/add`, region);
  }

  getRegions() {
    return this.http.get<RegionData>(`${environment.apiUrl}/region/getAll`);
  }

  createSiteType(sitetype) {
    return this.http.post(`${environment.apiUrl}/siteType/add`, sitetype);
  }

  getEquipmentDetailsBySite(siteId: any) {
    return this.http.get(
      `${environment.apiUrl}/equipment/getEquipmentDetails/${siteId}`,
      { observe: 'response' }
    );
  }

  createEquipment(equipment) {
    return this.http.post(`${environment.apiUrl}/equipment/add`, equipment);
  }

  updateEquipment(equipment) {
    return this.http.put(`${environment.apiUrl}/equipment`, equipment);
  }

  getEquipmentById(equipmentId: any) {
    return this.http.get(`${environment.apiUrl}/equipment/${equipmentId}`);
  }

  getAllEquipmentTypesByEquipmentCategory(categoryId: any) {
    return this.http.get<EquipmentType[]>(
      `${environment.apiUrl}/equipmentType/getAllByEquipmentCategory/${categoryId}`
    );
  }

  getAllEquipmentCategories() {
    return this.http.get<EquipmentCategoryTableItem[]>(
      `${environment.apiUrl}/equipmentCategory/getAll`
    );
  }

  createDataLogger(dataLogger: any) {
    return this.http.post(`${environment.apiUrl}/datalogger/add`, dataLogger);
  }

  updateDataLogger(dataLogger) {
    return this.http.put(`${environment.apiUrl}/datalogger`, dataLogger);
  }

  getDataLoggerById(dataLoggerId: any) {
    return this.http.get(`${environment.apiUrl}/datalogger/${dataLoggerId}`);
  }

  getDataLoggers() {
    return this.http.get<DataLoggerTableItem[]>(
      `${environment.apiUrl}/datalogger/getAll`
    );
  }

  getEquipmentTypeDetailsByCategory(categoryId: any) {
    return this.http.get(
      `${environment.apiUrl}/equipmentType/getAllByEquipmentCategory/${categoryId}`,
      { observe: 'response' }
    );
  }

  createEquipmentType(equipmentType) {
    return this.http.post(
      `${environment.apiUrl}/equipmentType/add`,
      equipmentType
    );
  }

  updateEquipmentType(equipmentType) {
    return this.http.put(`${environment.apiUrl}/equipmentType`, equipmentType);
  }

  getEquipmentTypeById(equipmentTypeId: any) {
    return this.http.get(
      `${environment.apiUrl}/equipmentType/${equipmentTypeId}`
    );
  }

  getAllEquipmentTypes() {
    return this.http.get(`${environment.apiUrl}/equipmentType/getAll`);
  }

  getAllByEquipmentCategory(categoryId) {
    return this.http.get(
      `${environment.apiUrl}/equipmentType/getAllByEquipmentCategory/${categoryId}`
    );
  }

  createEquipmentCategory(equipmentcategory) {
    return this.http.post(
      `${environment.apiUrl}/equipmentCategory/add`,
      equipmentcategory
    );
  }
  getEquipmentCategoryById(equipmentCategoryId: any) {
    return this.http.get(
      `${environment.apiUrl}/equipmentCategory/${equipmentCategoryId}`
    );
  }

  updateEquipmentCategory(equipmentCategory) {
    return this.http.put(
      `${environment.apiUrl}/equipmentCategory`,
      equipmentCategory
    );
  }

  getAllEquipmentCategoryGroups() {
    return this.http.get(`${environment.apiUrl}/equipmentCategoryGroup/getAll`);
  }

  completeUserRegistration(userAndCompany): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user/signup`, userAndCompany);
  }

  getAllStandardisedErrorCodeByCategoryId(categoryId) {
    return this.http.get<StandardisedErrorCodeTableItem[]>(
      `${environment.apiUrl}/errorcode/getErrorCodesByEquipmentCategory/${categoryId}`
    );
  }

  getAllStandardisedErrorCodeByEquipmentTypeId(equipmentTypeId) {
    return this.http.get<StandardisedErrorCodeTableItem[]>(
      `${environment.apiUrl}/errorcode/getErrorCodesByEquipmentType/${equipmentTypeId}`
    );
  }
  getStandardisedErrorCodeById(errorCodeId) {
    return this.http.get(`${environment.apiUrl}/errorcode/${errorCodeId}`);
  }

  getSiteCountDetails() {
    return this.http.get(`${environment.apiUrl}/site/getSiteCount`);
  }

  getTicketDetailsByStatus(status) {
    return this.http.get(
      `${environment.apiUrl}/ticket/getCountByStatus/${status}`
    );
  }

  createTicket(ticket) {
    return this.http.post(`${environment.apiUrl}/ticket/add`, ticket);
  }

  getTicketCategories() {
    return this.http.get(`${environment.apiUrl}/ticketcategory/getAll`);
  }

  getTicketCategoriesByType(ticketType) {
    return this.http.get(
      `${environment.apiUrl}/ticketcategory/getCategoriesByType/${ticketType}`
    );
  }

  getAllTicketCategories() {
    return this.http.get(`${environment.apiUrl}/ticketcategory/getAll`);
  }

  findUserByUsername(username) {
    return this.http.get<Boolean>(
      `${environment.apiUrl}/user/findByUsername/${username}`
    );
  }

  searchTickets(searchCriteria) {
    return this.http.post(
      `${environment.apiUrl}/ticket/search`,
      searchCriteria,
      { observe: 'response' }
    );
  }

  createUserDetail(userdetail) {
    return this.http.post(`${environment.apiUrl}/userdetail/add`, userdetail);
  }
  updateUserMaster(userMaster) {
    return this.http.put(`${environment.apiUrl}/user`, userMaster);
  }

  getAllUsers() {
    return this.http.get(`${environment.apiUrl}/user/getUserDetails`);
  }

  getUserMasterById(userMasterId: any) {
    return this.http.get(`${environment.apiUrl}/user/${userMasterId}`);
  }

  getUserRoleById(roleId: any) {
    return this.http.get(`${environment.apiUrl}/userRole/${roleId}`);
  }
  getAllUserRoles() {
    return this.http.get<UserRole[]>(`${environment.apiUrl}/userRole/getAll`);
  }

  createUserRoleDetail(userroledetail) {
    return this.http.post(`${environment.apiUrl}/userRole/add`, userroledetail);
  }

  updateUserRole(userRole) {
    return this.http.put(`${environment.apiUrl}/userRole`, userRole);
  }

  getAllRoles() {
    return this.http.get(`${environment.apiUrl}/userRole/getAll`);
  }

  getAllUserPermissions() {
    return this.http.get(`${environment.apiUrl}/userPermission/getAll`);
  }

  getPermissionById(id: number) {
    return this.http.get(`${environment.apiUrl}/userPermission/${id}`);
  }

  updatePermissionById(permission: UserPermission) {
    return this.http.put(`${environment.apiUrl}/userPermission/`, permission);
  }

  addUserPermission(userPermission: UserPermission) {
    return this.http.post(
      `${environment.apiUrl}/userPermission/add`,
      userPermission
    );
  }

  ifCompanyNameExists(stringVal: string) {
    return this.http.get(`${environment.apiUrl}/company/${stringVal}`);
  }

  ifCustomerNameExists(stringVal: string) {
    return this.http.get(`${environment.apiUrl}/customer/${stringVal}`);
  }
  ifSiteNameExists(stringVal: string) {
    return this.http.get(`${environment.apiUrl}/site/${stringVal}`);
  }

  getAllRolesForUserPermissionMapping() {
    return this.http.get(`${environment.apiUrl}/userRolePermissionMap/getAll`);
  }
  updateUSerPermission(role: UserPermissionMappingData) {
    return this.http.put(`${environment.apiUrl}/userRolePermissionMap/`, role);
  }

  getAllUsersForUserSiteMapping() {
    return this.http.get(`${environment.apiUrl}/userSiteMap/getAll`);
  }

  updateUserForUserSiteMapping(data) {
    return this.http.put(`${environment.apiUrl}/userSiteMap`, data);
  }
}
