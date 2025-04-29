/**
 * @file entities.types.ts
 * @description Hook personalizado para todas las entidades del negocio
 */

// Entidades básicas y sus variantes

export interface User {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  ultimo_acceso?: string | null;
  estado?: number;
}

export interface UserData {
  id: number;
  email: string;
  nombre: string;
  rol: string;
}

export interface UserFormData {
  nombre: string;
  email: string;
  rol: string;
  password: string;
}
