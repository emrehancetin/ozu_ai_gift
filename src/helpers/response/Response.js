import CustomError from "./CustomError";

class Response {
  success;
  data;
  error;

  constructor(success, data, error) {
    this.success = success;
    this.data = data;
    this.error = error;
  }

  static getSuccess(data) {
    return new Response(true, data, null);
  }

  static getError(err, status) {
    return new Response(false, null, new CustomError(err, status));
  }

  static getCustomError(err) {
    return new Response(false, null, err);
  }

  static getMessageError(message, status) {
    return new Response(
      false,
      null,
      CustomError.getWithMessage(message, status)
    );
  }
}

export default Response;
