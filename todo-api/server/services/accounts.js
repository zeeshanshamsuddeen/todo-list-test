const config = require('../config');
const utils = require('../shared/utils');
const db = require('../db/dbModule');
const tasks = require('./tasks');

const requiredFieldsForAccount = ['password', 'email'];

const validateAuthFields = (updatedValues) => {
  const updateObject = {};
  let success = true;
  let error;

  for (let i = 0; i < requiredFieldsForAccount.length; i += 1) {
    const field = requiredFieldsForAccount[i];
    if (utils.common.checkObjectHasKey(updatedValues, field)) {
      updateObject[field] = updatedValues[field];
    } else {
      error = `${field} missing`;
      success = false;
      break;
    }
  }

  /* Field Level Validations */
  if (!updatedValues.email || !utils.validation.validateEmail(updatedValues.email)) {
    error = 'Invalid Email ID';
    success = false;
  }

  return { success, updateObject, error };
};

const generateToken = (userId) => {
  const tokenData = { userId };
  const { secret, issuer, audience } = config.tokens.webUser;
  return utils.token.generate(tokenData, secret, issuer, audience);
};

const register = async (updatedValues) => {
  const validationResult = validateAuthFields(updatedValues);
  const { success, updateObject, error } = validationResult;
  if (!success) {
    return { success: false, error };
  }

  const userId = utils.common.getUUID();
  updateObject.userId = userId;
  updateObject.passwordDigest = utils.common.hashPassword(updateObject.password);
  await db.accounts.addOne(updateObject);
  await tasks.createUser(userId, updatedValues);
  return { success: true };
};

const login = async (loginDetails) => {
  const { email, password } = loginDetails;
  const { passwordDigest, userId } = await db.accounts.findOneWithLean({ email });
  if (!utils.common.checkPassword(password, passwordDigest)) {
    return { success: false, error: 'Incorrect Password/Email' };
  }
  return { success: true, userId };
};

module.exports = {
  register,
  login,
  generateToken,
};
