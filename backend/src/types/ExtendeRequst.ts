import { type Request } from "express";

export interface ExtendeRequst extends Request {
    user?:any;
}