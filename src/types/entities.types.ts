/**
 * @file entities.types.ts
 * @description Hook personalizado para todas las entidades del negocio
 */

// Entidades básicas y sus variantes

export interface User {
  id: number;
  nombre: string;
  email: string;
  rol: Role;
  ultimo_acceso?: string | null;
  estado?: number;
}

export interface UserData {
  id: number;
  email: string;
  nombre: string;
  rol: Role;
}

export interface UserFormData {
  nombre: string;
  email: string;
  rol: Role;
  password: string;
}

export interface Role {
  id: number;
  nombre: string;
  descripcion: string;
}
