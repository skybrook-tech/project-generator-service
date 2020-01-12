declare namespace Express {
  export interface Response {
    locals: any;
  }

  export interface Request {
    locals: any;
    vhost: any;
  }
}
