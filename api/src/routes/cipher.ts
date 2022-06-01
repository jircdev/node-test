import { Router } from "express";
import { decrypt, encrypt } from "../controllers/cipher";

export const cipherRouter = Router();

cipherRouter.post("/encrypt", [], encrypt);
cipherRouter.post("/decrypt", [], decrypt);
