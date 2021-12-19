declare module '@ioc:Adonis/Core/Response' {
  interface ResponseContract {
    sendSuccess(data: any, message?: string, status?: number): any
    sendError(data: any, errors: Error[], message?: string, status?: number, code?: string): any
  }
}
