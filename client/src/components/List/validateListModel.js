const VALIDATION_CONSTANTS = {
  nameMaxLength: 50,
  nameMinLength: 3,
};

/**
 * Validates the fields of a list to see if it can be posted to the API for creation.
 * @param {*} name
 * @param {*} icon
 * @returns
 */
export const validateListModel = (name, icon) => {
  if (
    !name ||
    name.length < VALIDATION_CONSTANTS.nameMinLength ||
    name.length > VALIDATION_CONSTANTS.nameMaxLength
  ) {
    return false;
  }

  if (!icon?.iconName) {
    return false;
  }

  return true;
};

export const listValidationConstants = { ...VALIDATION_CONSTANTS };
