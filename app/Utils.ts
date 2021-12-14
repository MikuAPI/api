/**
 * This is where we define all of our utilities that get used
 * throughout the application.
 */

/**
 * A class to return a JSON response using an object. Returning the code and the message.
 */
export class JsonResponse {
  /**
   * The code of the response.
   */
  code: number;
  message: string;
}

export class ErrorJsonResponse {
  /**
   * The code of the response.
   */
  constructor (
    public code: number,
    public message: string,
    public errors: any
  ) {}
}
