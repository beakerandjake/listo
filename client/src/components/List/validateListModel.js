import { icons } from 'services/iconLibrary';

const VALIDATION_CONSTANTS = {
  nameMaxLength: 50,
  nameMinLength: 3,
};

/**
 * Validates the fields of a list to see if it can be posted to the API for creation.
 * @param {string} name
 * @param {string} icon
 * @returns
 */
export const validateListModel = (name, iconName) => {
  const trimmedName = name?.trim();

  if (
    !trimmedName ||
    trimmedName.length < VALIDATION_CONSTANTS.nameMinLength ||
    trimmedName.length > VALIDATION_CONSTANTS.nameMaxLength
  ) {
    return false;
  }

  if (!iconName) {
    return false;
  }

  return true;
};

export const listValidationConstants = { ...VALIDATION_CONSTANTS };
