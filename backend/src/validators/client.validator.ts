import { z } from 'zod';

// Téléphone marocain : 0612345678 ou +212612345678 (espaces et tirets acceptés en entrée)
const telephoneSchema = z
  .string()
  .trim()
  .transform((v) => v.replace(/[\s.-]/g, ''))
  .refine((v) => /^(?:\+212|0)[5-7]\d{8}$/.test(v), {
    message: 'Numéro de téléphone invalide',
  });

export const createClientSchema = z.object({
  nom: z.string().trim().min(2, 'Nom trop court').max(50),
  prenom: z.string().trim().min(2, 'Prénom trop court').max(50),
  email: z.string().trim().toLowerCase().email('Email invalide').nullish(),
  telephone: telephoneSchema,
});

export const updateClientSchema = createClientSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Au moins un champ est requis',
  });

export const clientIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const listClientQuerySchema = z.object({
  search: z.string().trim().optional(), // nom, prénom ou téléphone
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});