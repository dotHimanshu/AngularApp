import * as fromEmployeeCrud from './employee-crud.actions';

describe('loadEmployeeCruds', () => {
  it('should return an action', () => {
    expect(fromEmployeeCrud.loadEmployeeCruds().type).toBe('[EmployeeCrud] Load EmployeeCruds');
  });
});
