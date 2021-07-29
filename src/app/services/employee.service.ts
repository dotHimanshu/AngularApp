import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/interface/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  readonly uri = 'http://localhost:3004';

  constructor(private httpClient: HttpClient) {}

  getAllEmployees() {
    return this.httpClient.get<Employee[]>(`${this.uri}/employees`);
  }

  getEmployee(empId: number) {
    return this.httpClient.get<Employee>(`${this.uri}/employees/${empId}`);
  }

  addEmployee(emp: Employee) {
    return this.httpClient.post<Employee>(`${this.uri}/employees`, emp);
  }

  updateEmployee(
    empId: string | number,
    emp: Partial<Employee>
  ): Observable<any> {
    return this.httpClient.put<Employee>(`${this.uri}/employees/${empId}`, emp);
  }

  deleteEmployee(empId: number | string) {
    return this.httpClient.delete(`${this.uri}/employees/${empId}`);
  }
}
