import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { employeeActions } from '../actions/employee-crud.actions';
import { Employee } from '../model/interface/employee';
import { employeeFeatureKey } from '../reducers/employee.reducer';
import { selectAllEmployee } from '../selectors/employee.selectors';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employee: Employee;
  isEmployeeAdd: boolean = false;
  employees$: Observable<Employee[]>;

  tableHeaderColumns = ['name', 'department', 'salary', 'actions'];

  constructor(
    private readonly empStore: Store<{ [employeeFeatureKey]: Employee[] }>
  ) {
    this.employees$ = this.empStore.pipe(select(selectAllEmployee));
    this.getEmployees();
  }

  ngOnInit(): void {}

  getEmployees() {
    this.empStore.dispatch(employeeActions.loadEmployee());
  }

  editEmployee(emp: Employee) {
    console.log({ ...emp });
    this.employee = { ...emp };
  }

  addEmployee() {
    this.isEmployeeAdd = true;
    this.employee = {
      name: '',
      department: '',
    };
  }

  deleteEmployee(empId) {
    this.empStore.dispatch(employeeActions.deleteEmployee({ data: empId }));
  }
}
