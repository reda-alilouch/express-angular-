import { Role } from "../enums/adminRole";
import { z } from "zod";
import {
  createAdminSchema,
  updateAdminSchema,
  listAdminQuerySchema,
} from "../validators/admin.validator";

export type CreateAdminDto = z.infer<typeof createAdminSchema>;
export type UpdateAdminDto = z.infer<typeof updateAdminSchema>;
export type ListAdminQuery = z.infer<typeof listAdminQuerySchema>;

export interface AdminResponse {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
