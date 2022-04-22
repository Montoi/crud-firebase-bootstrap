import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  createEmployee: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  title = 'Add Employee'

  constructor(private route:ActivatedRoute,
    private toastr: ToastrService,
    private router:Router,
    private fb:FormBuilder, 
    private __employeeService:EmployeeServiceService) {
    this.createEmployee = this.fb.group({
        name: ['', Validators.required],
        lastName: ['', Validators.required],
        document:['', Validators.required],
        salary: ['', Validators.required],
    })
    this.id = this.route.snapshot.paramMap.get('id')
   }

  ngOnInit(): void {
    this.setValues()
  }

  addEmployee(){
    this.submitted = true;
    if (this.createEmployee.invalid) {
      return;
    }
    const employee: any = {
      name: this.createEmployee.value.name,
      lastName: this.createEmployee.value.lastName,
      document: this.createEmployee.value.document,
      salary: this.createEmployee.value.salary,
      creationDate: new Date(),
      actualizationDate: new Date()
    }
  this.loading = true
    this.__employeeService.createEmployee(employee).then(() => {
      this.toastr.success('Employee registered sucessfully!', 'Employee registered');
      this.loading = false
      this.router.navigate(['list-employee'])
    }).catch(error => {
      console.log(error);
    })
  }

  editEmployee(){
    this.submitted = true;

    if (this.createEmployee.invalid) {
      return;
    }

    if (this.id === null ) {
      this.addEmployee();
    }else{
      this.loading = true
      const employee: any = {
        name: this.createEmployee.value.name,
        lastName: this.createEmployee.value.lastName,
        document: this.createEmployee.value.document,
        salary: this.createEmployee.value.salary,
        actualizationDate: new Date()
      }
      this.__employeeService.updateEmployee(this.id, employee).then(()=> {
        this.loading = false
        this.toastr.info('The employee has been modificated sucessfully','Employee modificated');
      }); this.router.navigate(['/list-employee']);

    }


  }

  setValues(){
  
    if(this.id !==null){
      this.title = 'Edit Employee'
      this.loading = true
      this.__employeeService.getEmployee(this.id).subscribe(data => {
        this.createEmployee.setValue({
          name: data.payload.data()['name'],
          lastName: data.payload.data()['lastName'],
          document: data.payload.data()['document'],
          salary: data.payload.data()['salary']
          
        })
        this.loading = false
      })
    }
  }

}
