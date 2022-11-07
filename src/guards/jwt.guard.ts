import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';


const validateRequest = async (
  req: Request,
  //res: Response,
  //next: NextFunction,
): Promise<boolean> => {
  console.log('In Aute Middelware');
  try {
    let token = req.headers.authorization;
    // verify request has token
    if (!token) {
      //return res.status(401).send({ message: 'Invalid token' });
      return false;
    }
    // remove Bearer if using Bearer Authorization mechanism
    token = token.split(' ')[1];
    console.log(token);
    jwt.verify(token, process.env.SECRET_KEY!);
    //next();
    return true;
  } catch (error) {
    if (error === 'TokenExpiredError') {
      //res.status(401).send({ message: 'Expired token' });
      return false;
    }
    //res.status(500).send({ message: 'Failed to authenticate user' });
    return false;
  }
};

@Injectable()
export class AuthJwtGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}

