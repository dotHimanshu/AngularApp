import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Employee } from '../model/interface/employee';
import {
  employeeAdapter,
  employeeFeatureKey,
  EmployeeState,
} from '../reducers/employee.reducer';

const getEmployeeState =
  createFeatureSelector<EmployeeState>(employeeFeatureKey);

const { selectIds, selectAll } = employeeAdapter.getSelectors();

export const selectEmployeeIds = createSelector(getEmployeeState, selectIds);

export const selectAllEmployee = createSelector(getEmployeeState, selectAll);

export const selectEmployeeLoaded = createSelector(
  getEmployeeState,
  (state) => state.loaded
);

export const selectEmployeeFailure = createSelector(
  getEmployeeState,
  (state) => state.error
);
