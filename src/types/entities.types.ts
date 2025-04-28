/**
 * @file entities.types.ts
 * @description Hook personalizado para todas las entidades del negocio
 */

// Entidades básicas y sus variantes

export interface User {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
  ultimo_acceso?: string | null;
  estado?: number;
}

export interface UserData {
  id: number;
  correo: string;
  nombre: string;
  rol: string;
}

export interface UserFormData {
  nombre: string;
  correo: string;
  rol: string;
  password: string;
}
