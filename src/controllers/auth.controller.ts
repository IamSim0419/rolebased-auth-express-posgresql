import { Request, Response } from "express";
import * as userService from "../services/user.service";

export async function register(req: Request, res: Response) {
  try {
    const { email, password, name, role } = req.body;
    const { user, token } = await userService.registerUser({
      email, // Mio@email.com
      password, // 123456
      name, // Mio
      role, // Admin
    });

    res.status(201).json({ user, token });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const { user, token } = await userService.loginUser(email, password);

    res.json({ user, token });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
}
