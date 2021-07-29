import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { dispatch } from 'rxjs/internal/observable/pairs';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import { employeeActions } from '../actions/employee-crud.actions';
import { Employee } from '../model/interface/employee';
import { EmployeeService } from '../services/employee.service';

@Injectable()
export class EmployeeEffects {
  public loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeeActions.loadEmployee),
      mergeMap(() =>
        this.employeeService.getAllEmployees().pipe(
          map(
            (res: Employee[]) =>
              employeeActions.loadEmployeeSuccess({ data: res }),
            catchError(() => of({ type: employeeActions.loadEmployeeFailure }))
          )
        )
      )
    )
  );

  public updateEmployees$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(employeeActions.updateEmployee),
        mergeMap((action) => {
          return this.employeeService.updateEmployee(
            action.data.id,
            action.data.changes
          );
        })
      ),
    { dispatch: false }
  );

  public addEmployees$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(employeeActions.addEmployee),
        mergeMap((action) => {
          return this.employeeService.addEmployee(action.data);
        })
      ),
    { dispatch: false }
  );

  public deleteEmployees$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(employeeActions.deleteEmployee),
        mergeMap((action) => {
          return this.employeeService.deleteEmployee(action.data);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private employeeService: EmployeeService
  ) {}
}
