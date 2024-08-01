import { Response } from 'express';

const successResponse = (
  res: Response,
  data: any,
  statusCode: number = 200,
  recordsTotal: number = 0
) => {
  return res.status(statusCode).json({
    code: statusCode,
    status: "OK",
    recordsTotal: recordsTotal,
    data: data,
    error: null
  });
}

const createdResponse = (
  res: Response,
  message: { message: string } = { message: "Resource created successfully." },
  recordsTotal: number = 1
) => {
  return res.status(201).json({
    code: 201,
    status: "CREATED",
    recordsTotal: recordsTotal,
    data: message,
    error: null
  });
}

export {
  successResponse,
  createdResponse
};
