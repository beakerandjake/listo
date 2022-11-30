const override = process.env.REACT_APP_API_ENDPOINT;

export const getApiBaseUrl = () => {
  const host = override;

  return `${host}/api`;
};
