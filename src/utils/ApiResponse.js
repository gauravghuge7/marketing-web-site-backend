
class ApiResponse {
    constructor(statuscode,message, data, success=true) {
        this.statuscode = statuscode;
        this.message = message;
        this.data = data;
        this.success = success;
        this.success = statuscode <400;
    }
}

export default ApiResponse;