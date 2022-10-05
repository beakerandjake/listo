import listApi from './listApi';
import itemApi from './itemApi';

// TODO swap based on config

class ApiError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode;
    }
    
    static createFromFetchResponse({statusText, statusCode}) {
        return new ApiError(statusText, statusCode);
    }
}

export { 
    listApi, 
    itemApi,
    ApiError
};
