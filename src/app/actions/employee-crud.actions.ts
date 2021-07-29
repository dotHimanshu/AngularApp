import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Employee } from '../model/interface/employee';

export enum EmployeeActionTypes {
  Load = '[Employee] Load',
  LoadSuccess = '[Employee] Load Success',
  LoadFailure = '[Employee] Load Failure',
  AddEmployee = '[Employee] Add',
  UpdateEmployee = '[Employee] Update',
  DeleteEmployee = '[Employee] Delete',
}

export const loadEmployee = createAction(EmployeeActionTypes.Load);

export const loadEmployeeSuccess = createAction(
  EmployeeActionTypes.LoadSuccess,
  props<{ data: Employee[] }>()
);

export const loadEmployeeFailure = createAction(
  EmployeeActionTypes.LoadFailure,
  props<{ error: Error }>()
);

export const addEmployee = createAction(
  EmployeeActionTypes.AddEmployee,
  props<{ data: Employee }>()
);

export const updateEmployee = createAction(
  EmployeeActionTypes.UpdateEmployee,
  props<{ data: Update<Employee> }>()
);
export const deleteEmployee = createAction(EmployeeActionTypes.DeleteEmployee,
  props<{data:string}>());

export const employeeActions = {
  loadEmployee,
  loadEmployeeSuccess,
  loadEmployeeFailure,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
