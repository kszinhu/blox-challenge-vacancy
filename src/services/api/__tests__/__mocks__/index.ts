import curricularUnitsResponse from "./curricularUnits.json";
import loginSuccessResponse from "./loginSuccess.json";
import loginFailedResponse from "./loginError.json";
import registerSuccessResponse from "./registerSuccess.json";
import registerFailedResponse from "./registerFailed.json";

// rename removing 'Response' suffix from the file name  and export all mocks to be used in tests
export {
  curricularUnitsResponse as curricularUnits,
  loginSuccessResponse as loginSuccess,
  loginFailedResponse as loginFailed,
  registerSuccessResponse as registerSuccess,
  registerFailedResponse as registerFailed,
};
