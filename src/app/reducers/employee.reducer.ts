import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { employeeActions } from '../actions/employee-crud.actions';
import { Employee } from '../model/interface/employee';

export const employeeFeatureKey = 'employee';

export interface EmployeeState extends EntityState<Employee> {
  loaded: boolean;
  error?: Error;
}

export const employeeAdapter: EntityAdapter<Employee> =
  createEntityAdapter<Employee>({
    selectId: (employee) => employee.id,
  });

export interface EmployeePartialState {
  readonly [employeeFeatureKey]: EmployeeState;
}

export const employeeInitialState: EmployeeState =
  employeeAdapter.getInitialState({
    loaded: false,
    error: null,
  });

const _employeeReducer = createReducer(
  employeeInitialState,
  on(employeeActions.loadEmployeeSuccess, (state, { data }) => {
    return employeeAdapter.addMany(data, {
      ...state,
      loaded: true,
    });
  }),
  on(employeeActions.loadEmployeeFailure, (state, { error }) => {
    return {
      ...state,
      error,
    };
  }),
  on(employeeActions.addEmployee, (state, { data }) => {
    return employeeAdapter.addOne(data, {
      ...state,
      loaded: true,
    });
  }),
  on(employeeActions.updateEmployee, (state, { data }) => {
    return employeeAdapter.updateOne(data, {
      ...state,
      loaded: true,
    });
  }),
  on(employeeActions.deleteEmployee, (state, { data }) => {
    return employeeAdapter.removeOne(data, {
      ...state,
      loaded: true,
    });
  })
);

export function employeeReducer(
  state: EmployeeState | undefined,
  action: Action
) {
  return _employeeReducer(state, action);
}
