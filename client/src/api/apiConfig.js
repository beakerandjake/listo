// When running in development the API and the Client are served independently at different ports.
// When running in production, the API and the Client are served via the API at a single port.
// To handle this, the REACT_APP_API_ENDPOINT environment variable is provided.
// When this value is null, the apiBaseUrl will be relative to the current host, which works in production.
// When this value is provided (usually by .env.development file), the apiBaseUrl will be relative to the specified value.
export const apiBaseUrl = `${process.env.REACT_APP_API_ENDPOINT || ''}/api`;
