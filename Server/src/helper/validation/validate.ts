import { Request, Response } from "express";
import Ajv, { JSONSchemaType } from "ajv";
import ajvFormats from "ajv-formats";
import { HttpStatus } from "../config/httpStatus";

const ajv = new Ajv({ allErrors: true });
ajvFormats(ajv);

const validate = (schema: JSONSchemaType<any>) => {
  return (req: Request, res: Response, next: Function) => {
    const validate = ajv.compile(schema);
    const valid = validate({ ...req.body, ...req.query });

    if (!valid) {
      return res
        .status(HttpStatus.HTTP_BAD_REQUEST)
        .json({ error: validate.errors });
    }

    next();
  };
};

export default validate;
