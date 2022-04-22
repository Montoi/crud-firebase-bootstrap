import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit{

  ngOnInit(): void {
    this.getEmployees()
  }
  

  employees:any[]=[]
  constructor(private toastr: ToastrService,
    private __employeeService:EmployeeServiceService) {
    
   }

   getEmployees(){
    this.__employeeService.getEmployees().subscribe(data => {
      this.employees = [];
      data.forEach((element:any) => {
        this.employees.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
   }

   deleteEmployee(id:string){
     this.__employeeService.deleteEmployee(id).then(()=>{
       console.log('Employee deleted')
       this.toastr.error('Employee was eliminated sucessfully','Employee eliminated' )
     }).catch(error => {
       console.log(error)
     })
   }

  

}
