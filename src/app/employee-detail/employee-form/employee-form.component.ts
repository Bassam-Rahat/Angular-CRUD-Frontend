import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/shared/employee.model';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {
  constructor(public empService:EmployeeService, public toast:ToastrService){}

@ViewChild('checkbox1') checkbox : ElementRef;
isSlide:string='Off';

  ngOnInit(){
    this.empService.employeeData.gender = 'male';

    this.empService.GetDesignation().subscribe(data => {
      this.empService.listDesignation = data;
    });
  }

  submit(form:NgForm){
    if (Number(this.empService.employeeData.id) === 0)
      this.insertEmployee(form);
    else
     this.updateEmployee(form);
  }

  insertEmployee(myForm:NgForm){
    this.empService.AddEmployee().subscribe(data => {
      this.resetForm(myForm);
      this.refreshData();
      console.log('Employee Inserted Successfully');
      this.toast.success('Saved', 'Record saved successfully');
    })
  }

  updateEmployee(myForm:NgForm){
    this.empService.UpdateEmployee().subscribe(data => {
      this.resetForm(myForm);
      this.refreshData();
      console.log('Employee updated Successfully');
      this.toast.warning('Saved', 'Record updated successfully')
    })
  }

  resetForm(myForm:NgForm){
    myForm.form.reset();
    this.empService.employeeData = new Employee();
    this.slideController();
  }

  refreshData(){
    this.empService.GetEmployee().subscribe(result =>{
      this.empService.listEmployee = result;
    })
  }

  slideController() {
    if (this.checkbox.nativeElement.checked) {
      this.checkbox.nativeElement.checked = false;
      this.isSlide = 'Off';
    } else {
      this.checkbox.nativeElement.checked = true;
      this.isSlide = 'On';
    }
  }
}