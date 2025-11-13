import { Request, Response } from "express";
import * as userService from "../services/user.service";

export async function listUsers(req: Request, res: Response) {
  const users = await userService.getAllUsers();
  res.json({ users });
}
