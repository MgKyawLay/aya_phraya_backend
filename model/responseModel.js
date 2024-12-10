class ResponseModel {
    static getDefaultMessage(statusCode) {
        const messages = {
            200: "Success",
            201: "Created successfully",
            400: "Bad Request",
            401: "Unauthorized",
            403: "Forbidden",
            404: "Not Found",
            409: "User already exists",
            500: "Internal Server Error",
        };
        return messages[statusCode] || "Unknown status code";
    }

    static success(res, message = null, data = {}, statusCode = 200) {
        return res.status(statusCode).json({
            isSuccess: true,
            message: message || this.getDefaultMessage(statusCode),
            data,
        });
    }

    static error(res, message = null, error = null, statusCode = 500) {
        return res.status(statusCode).json({
            isSuccess: false,
            message: message || this.getDefaultMessage(statusCode),
            error: error ? error.toString() : null,
        });
    }

    static notFound(res, message = null, statusCode = 404) {
        return res.status(statusCode).json({
            isSuccess: false,
            message: message || this.getDefaultMessage(statusCode),
            error: "Not found",
        });
    }

    static badRequest(res){
        return res.status(400).json({
            isSuccess: false,
            message: this.getDefaultMessage(400),
            error: "Bad request",
        });
    }
}

module.exports = ResponseModel;
