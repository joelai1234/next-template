export const ValidEmailReg =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.[0-9]{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/;

// export const ValidPasswordReg = /^[a-zA-Z0-9!#$@^%&?]{8,20}$/;
export const ValidPasswordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{10,40}$/;
export const ValidUsernameReg = /^[a-zA-Z0-9]{2,60}$/;
export const PasswordPattern = {
  atLeast1Lowercase: {
    regex: /^(?=.*[a-z])/,
    message: `At least 1 lowercase alphabetical character`,
  },
  atLeast1Uppercase: {
    regex: /^(?=.*[A-Z])/,
    message: `At least 1 uppercase alphabetical character`,
  },
  atLeast1Numeric: {
    regex: /^(?=.*[0-9])/,
    message: `At least 1 numeric character`,
  },
  lengthRange: {
    regex: /^(?=.{10,40}$)/,
    message: `Password length should between 10 and 40 charters`,
  },
};
