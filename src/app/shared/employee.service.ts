import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Designation, Employee } from './employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private myHttp:HttpClient) { }
  employeeURL = 'https://localhost:44397/api/Employees';
  designationURL = 'https://localhost:44397/api/Designations';
  listEmployee:Employee[]=[];
  listDesignation:Designation[]=[];

  employeeData:Employee = new Employee();

  // Employee http methods
  AddEmployee(){
    return this.myHttp.post(this.employeeURL,this.employeeData)
  }

  UpdateEmployee(){
    return this.myHttp.put(`${this.employeeURL}/${this.employeeData.id}`,this.employeeData)
  }

  GetEmployee():Observable<Employee[]>
  {
    return this.myHttp.get<Employee[]>(this.employeeURL)
  }

  DeleteEmployee(Id:string){
    return this.myHttp.delete(`${this.employeeURL}/${Id}`)
  }

  // Designation http methods
  GetDesignation():Observable<Designation[]>
  {
    return this.myHttp.get<Designation[]>(this.designationURL)
  }  

  DeleteDesignation(Id:number){
    return this.myHttp.delete(`${this.designationURL}/${Id}`)
  }
}
