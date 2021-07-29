import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  RequiredValidator,
  Validators,
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { employeeActions } from '../actions/employee-crud.actions';
import { Employee } from '../model/interface/employee';
import { employeeFeatureKey } from '../reducers/employee.reducer';
import { selectAllEmployee } from '../selectors/employee.selectors';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
})
export class EmployeeDetailComponent implements OnInit {
  @Input() employeeId: number;
  @Input() emp: Employee;
  @Input() isAdd: boolean = false;
  private lastEmpCount = -1;

  empForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    salary: new FormControl(''),
  });

  constructor(
    private readonly empStore: Store<{ [employeeFeatureKey]: Employee[] }>
  ) {
    const sub = this.empStore.pipe(select(selectAllEmployee)).subscribe({
      next: (employees) => {
        if (employees.length > 0) {
          this.lastEmpCount = employees.length;
          sub.unsubscribe();
        }
      },
    });
  }

  ngOnInit(): void {}

  editEmp() {
    this.empStore.dispatch(
      employeeActions.updateEmployee({
        data: {
          id: this.emp.id,
          changes: {
            name: this.emp.name,
            department: this.emp.department,
            salary: this.emp.salary,
          },
        },
      })
    );
    this.emp = null;
  }

  addEmployee() {
    if (this.empForm.invalid) {
      return;
    }
    this.emp.id = ++this.lastEmpCount;
    this.empStore.dispatch(employeeActions.addEmployee({ data: this.emp }));
    this.emp = null;
    this.isAdd = false;
  }

  get name() {
    return this.empForm.get('name');
  }
  get department() {
    return this.empForm.get('department');
  }
}
