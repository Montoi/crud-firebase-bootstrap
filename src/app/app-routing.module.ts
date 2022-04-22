import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component';
import { ListEmployeesComponent } from './components/list-employees/list-employees.component';

const routes: Routes = [
  {path: '', component:ListEmployeesComponent },
  {path: 'list-employee', component: ListEmployeesComponent},
  {path: 'employee', component: EmployeeComponent},
  {path: 'editEmployee/:id', component: EmployeeComponent},
  {path: '**', component:ListEmployeesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
