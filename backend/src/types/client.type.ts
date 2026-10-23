import { z } from 'zod';
import {
  createClientSchema,
  updateClientSchema,
  listClientQuerySchema,
} from '../validators/client.validator';

export type CreateClientDto = z.infer<typeof createClientSchema>;
export type UpdateClientDto = z.infer<typeof updateClientSchema>;
export type ListClientQuery = z.infer<typeof listClientQuerySchema>;

// Ce que l'API renvoie
export interface ClientResponse {
  id: number;
  nom: string;
  prenom: string;
  email: string | null;
  telephone: string;
  createdAt: Date;
  updatedAt: Date;
}
