interface ApiRequestErrorArg {
  errorMessage: string;
}

class ApiRequestError extends Error {
  constructor({ errorMessage }: ApiRequestErrorArg) {
    super(errorMessage);
  }
}

export default ApiRequestError;
