class ServerResponse {
  success: boolean;
  message: string;
  data: object;
  error: object;
  status: number;

  constructor(
    success: boolean,
    message?: string,
    data?: object,
    error?: object,
    status?: number,
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.error = error;
    this.status = status;
  }

  toJSON() {
      return {
          success: this.success,
          message: this.message,
          data: this.data,
          error: this.error
      }
  }
}

export class FailureResponse extends ServerResponse {
    constructor(
        message?: string,
        error?: object,
        status?: number,
    ) {
        super(
            false,
            message || 'Received a bad request',
            undefined,
            error,
            status || 500,
        )
    }
}

export class SuccessResponse extends ServerResponse {
    constructor(
        message?: string,
        data?: object,
        status?: number,
    ) {
        super(
            true,
            message || "Request successfull",
            data,
            undefined,
            status || 200,
        )
    }
}

export class Unauthroized extends FailureResponse {
    constructor() {
        super(
            'You are not authorized to perform this action',
            { unauthorized: true },
            401,
        )
    }
}

export default ServerResponse;
