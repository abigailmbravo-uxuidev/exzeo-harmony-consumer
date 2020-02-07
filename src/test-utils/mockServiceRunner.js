import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

const jestResolve = (result, error) =>
  jest.fn(() =>
    error ? Promise.reject(result) : Promise.resolve({ data: { result } })
  );

export const mockServiceRunner = (result, error) => {
  serviceRunner.callService = jestResolve(result, error);
};
