//como es tan sensible equivocarse en el user,home,shop reducer escribiendo el actiontype, se crea este objeto, y se llama después en el reducer hacendo instancia a este objeto.

const UserActionTypes = {
  GOOGLE_SIGN_IN_START:'GOOGLE_SIGN_IN_START',
  EMAIL_SIGN_IN_START:'EMAIL_SIGN_IN_START',
  SIGN_IN_SUCCESS:'SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE:'SIGN_IN_FAILURE',
  CHECK_USER_SESSION:'CHECK_USER_SESSION',
  SIGN_OUT_START:'SIGN_OUT_START',
  SIGN_OUT_SUCCESS:'SIGN_OUT_SUCCESS',
  SIGN_OUT_FAILURE:'SIGN_OUT_FAILURE'
};

export default UserActionTypes;