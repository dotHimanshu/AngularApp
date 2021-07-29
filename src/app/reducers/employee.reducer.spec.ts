import { employeeReducer, employeeInitialState } from './employee.reducer';

describe('EmployeeCrud Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = employeeReducer(employeeInitialState, action);

      expect(result).toBe(employeeInitialState);
    });
  });
});
