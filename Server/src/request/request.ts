import { JSONSchemaType } from "ajv";

const adminViewQuerySchema: JSONSchemaType<{
  param: string;
  countryCode: string;
  stateCode: string;
  branchType: string;
  sortBy: string;
  order: string;
  page: number;
  limit: number;
}> = {
  type: "object",
  properties: {
    param: { type: "string", minLength: 1 },
    countryCode: { type: "string", minLength: 1 },
    stateCode: { type: "string", minLength: 1 },
    branchType: { type: "string", minLength: 1 },
    sortBy: { type: "string", minLength: 1 },
    order: { type: "string", minLength: 1 },
    page: { type: "number" },
    limit: { type: "number" },
  },
  required: [],
  additionalProperties: false,
};

const stateQuerySchema: JSONSchemaType<{ countryCode: string }> = {
  type: "object",
  properties: {
    countryCode: { type: "string", minLength: 1 },
  },
  required: ["countryCode"],
  additionalProperties: false,
};

const updateByIdSchema: JSONSchemaType<{
  countryCode: string;
  countryName: string;
  name: string;
  address: string;
  contactNo: string;
  telephoneNo: string;
  emailId: string;
  hoursToGetReady: number;
  description: string;
  message: string;
  googleLocationUrl: string;
  branchType: {
    branchTypeId: string;
    name: string;
    attachment: {
      attachmentId: string;
      imageString: string;
    };
  };
}> = {
  type: "object",
  properties: {
    countryCode: { type: "string", minLength: 1 },
    countryName: { type: "string", minLength: 1 },
    name: { type: "string", minLength: 1 },
    address: { type: "string", minLength: 1 },
    contactNo: { type: "string", minLength: 1 },
    telephoneNo: { type: "string", minLength: 1 },
    emailId: { type: "string", minLength: 1, format: "email" },
    hoursToGetReady: { type: "number" },
    description: { type: "string", minLength: 1 },
    message: { type: "string", minLength: 1 },
    googleLocationUrl: { type: "string", minLength: 1 },
    branchType: {
      type: "object",
      properties: {
        branchTypeId: { type: "string", minLength: 1 },
        name: { type: "string", minLength: 1 },
        attachment: {
          type: "object",
          properties: {
            attachmentId: { type: "string", minLength: 1 },
            imageString: { type: "string", format: "url" },
          },
          required: ["attachmentId", "imageString"],
          additionalProperties: true,
        },
      },
      required: ["branchTypeId", "name", "attachment"],
      additionalProperties: true,
    },
  },
  required: [
    "countryCode",
    "countryName",
    "name",
    "address",
    "contactNo",
    "telephoneNo",
    "emailId",
    "hoursToGetReady",
    "description",
    "message",
    "googleLocationUrl",
    "branchType",
  ],
  additionalProperties: true,
};

export { stateQuerySchema, adminViewQuerySchema, updateByIdSchema };
