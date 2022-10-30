import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

@Injectable()
export class getMiddlewareJWT implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('In Aute Middelware');
    try {
      let token = req.headers.authorization;
      // verify request has token
      if (!token) {
        return res.status(401).send({ message: 'Invalid token' });
      }
      // remove Bearer if using Bearer Authorization mechanism
      token = token.split(' ')[1];
      console.log(token);
      jwt.verify(token, process.env.SECRET_KEY!);
      next();
    } catch (error) {
      if (error === 'TokenExpiredError') {
        res.status(401).send({ message: 'Expired token' });
        return;
      }
      res.status(500).send({ message: 'Failed to authenticate user' });
    }
  }
  
  async getMiddlewareJWT(req: Request, res: Response, next: NextFunction) {
    console.log('In Aute Middelware');
    try {
      let token = req.headers.authorization;
      // verify request has token
      if (!token) {
        return res.status(401).send({ message: 'Invalid token' });
      }
      // remove Bearer if using Bearer Authorization mechanism
      token = token.split(' ')[1];
      console.log(token);
      jwt.verify(token, process.env.SECRET_KEY!);
      next();
    } catch (error) {
      if (error === 'TokenExpiredError') {
        res.status(401).send({ message: 'Expired token' });
        return;
      }
      res.status(500).send({ message: 'Failed to authenticate user' });
    }
  }
}
