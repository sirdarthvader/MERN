//Register User...

import { TEST_DISPATCH } from './types';

export const registeruser = data => {
  return {
    type: TEST_DISPATCH,
    payload: data,
  };
};
