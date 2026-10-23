import { Admin } from "../models/admin.model";
import { CreateAdminDto } from "../types/admin.type";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const data = req.body as CreateAdminDto;
    if (!data.name || !data.email || !data.password || !data.role) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }
    const passwordHash = await bcrypt.hash(data.password, 10);
    const admin = await Admin.create({
      name: data.name,
      email: data.email,
      password: passwordHash,
      role: data.role,
    });
    return res.status(201).json({ message: "Admin créé avec succès", admin });
  } catch (error) {
    return res.status(500).json({ message: "Erreur lors de la création de l'admin" });
  }
};
export const login = async (req: Request, res: Response) => {};
