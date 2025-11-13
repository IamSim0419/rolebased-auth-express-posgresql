import { Request, Response } from "express";
import * as userService from "../services/user.service";

// Controller to handle user registration
export async function register(req: Request, res: Response) {
  try {
    const userData = req.body;
    console.log("user:", userData);

    // Call the service to register the user
    const { user, token } = await userService.registerUser({
      email: userData.email, // Mio@email.com
      password: userData.password, // 123456
      name: userData.name, // Mio
      role: userData.role, // Admin
    });

    res.status(201).json({ user, token });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

// Controller to handle user login
export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const { user, token } = await userService.loginUser(email, password);

    res.json({ user, token });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
}

// Controller to handle user logout
export async function logout(_req: Request, res: Response) {
  res.json({
    message: "User logged out successfully. Please remove your token.",
  });
}
