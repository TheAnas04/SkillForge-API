import { ZodError } from "zod";
import { ValidationError } from "../lib/appError.js";

const validate = (schema)=>{
  return (req, _res, next) => {
    try {
      if(schema.params){
        req.params = schema.params.parse(req.params);
      }
      if(schema.body){
        req.body = schema.body.parse(req.body);
      }
      next();
    } catch (err) {
      if(err instanceof ZodError){
        ValidationError("Validation failed", err.errors);
      }
      next(err);
    }
  };
};

export default validate;