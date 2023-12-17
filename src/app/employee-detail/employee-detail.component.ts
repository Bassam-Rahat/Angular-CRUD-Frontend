import { Component, ViewChild } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent {

  constructor(public empService:EmployeeService, public datePipe:DatePipe, public toast:ToastrService){}

@ViewChild(EmployeeFormComponent) emp : EmployeeFormComponent;

  ngOnInit(){
    this.empService.GetEmployee().subscribe(data => {
      this.empService.listEmployee = data;
    });
  }

  populateEmployee(selectedEmplaoyee:Employee){
    console.log(selectedEmplaoyee);

    let formattedDate = this.datePipe.transform(selectedEmplaoyee.doj, 'yyyy-MM-dd');
    selectedEmplaoyee.doj = formattedDate; 
    this.empService.employeeData = selectedEmplaoyee;

    if(this.emp.isSlide=='off')
      this.emp.slideController();
  }

  deleteEmployee(id: string | undefined){
    if (id === undefined) {
      console.error('Attempted to delete an employee with undefined ID');
      // Optionally, show an alert to the user or handle this case as needed
      return;
    }
  
    if(confirm('Are you really want to delete this record?')){
      this.empService.DeleteEmployee(id).subscribe(data => {
        console.log('Record Deleted');
        this.empService.GetEmployee().subscribe(data => {
          this.empService.listEmployee = data;
          this.toast.error('Deleted', 'Record deleted successfully')
        });
      },
      err => {
        console.log('Record not deleted');
        // Optionally, handle the error more explicitly here
      });
    }
  }
  
}
