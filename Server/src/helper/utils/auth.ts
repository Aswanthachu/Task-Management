import * as express from "express";
import * as jwt from "jsonwebtoken";
import { HttpStatus } from "../config/httpStatus";

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
) {
  if (securityName === "api_key") {
    return new Promise((resolve, reject) => {
      const apiKey = request.header("X-API-Key");
      const clientId = request.header("Client-Id");
      if (
        apiKey ===
          (process.env.API_KEY ||
            "DollarUae_4c8a9bf6fe9b4821b6a36c5b9530b6e9") &&
        clientId ===
          (process.env.API_CLIENT_ID || "3b9f574b7e9d45c4a7e59b7ca755842a")
      ) {
        return resolve(true);
      } else {
        reject({
          status: HttpStatus.HTTP_UNAUTHORIZED,
          message: "Unauthorized",
        });
      }
    });
  }

  if (securityName === "jwt") {
    const token =
      request.body.token ||
      request.query.token ||
      request.headers["x-access-token"];

    return new Promise((resolve, reject) => {
      if (!token) {
        return reject({
          status: HttpStatus.HTTP_UNAUTHORIZED,
          message: "Unauthorized",
        });
      }
      jwt.verify(token, "[secret]", function (err: any, decoded: any) {
        if (err) {
          return reject({
            status: HttpStatus.HTTP_UNAUTHORIZED,
            message: "Unauthorized",
          });
        } else {
          return resolve(true);
        }
      });
    });
  }
}
