import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
declare const validate: (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => void;
export default validate;
