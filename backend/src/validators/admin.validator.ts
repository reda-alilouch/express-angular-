import { z } from 'zod';

export const createAdminSchema = z.object({
  name: z.string().trim().min(2, 'Nom trop court').max(50),
  email: z.string().trim().toLowerCase().email('Email invalide').nullish(),
  password: z.string().trim().min(6, 'Mot de passe trop court'),
  role: z.enum(['ADMIN', 'GESTIONNAIRE']),
});

export const updateAdminSchema = createAdminSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Au moins un champ est requis',
  });

export const adminIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const listAdminQuerySchema = z.object({
  search: z.string().trim().optional(), // nom, prénom ou téléphone
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});