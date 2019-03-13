import {Request, Response} from "express"
import {jsonifyError} from "@alphab/utils"

abstract class DomainError extends Error {
  public message: string
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    Error.captureStackTrace(this, this.constructor)
  }
}

export class InternalException extends DomainError {
  error: Error
  requestId?: string
  constructor(error: Error) {
    super(error.message)
    this.error = jsonifyError(error)
    Object.setPrototypeOf(this, InternalException.prototype)
  }
}

export class ApiException extends DomainError {
  constructor(res: Response, message: string, status: number = 500) {
    super(message)
    res.status(status)
    Object.setPrototypeOf(this, ApiException.prototype)
  }
}

export class ResourceNotFoundException extends ApiException {
  constructor(req: Request, res: Response) {
    super(res, `Resource ${req.originalUrl} was not found.`, 404)
    Object.setPrototypeOf(this, ResourceNotFoundException.prototype)
  }
}

export interface ExpressError {
  error: object
  statusCode: number
}
