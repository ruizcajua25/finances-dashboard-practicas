import { clsx, type ClassValue } from "clsx"
import { pbkdf2Sync, randomBytes } from "crypto";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function encryptPassword(password: string) {
  // texto aleatorio
  const salt = randomBytes(16).toString('hex');

  // password + salt => hash
  const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

  // guardamos el salt y el hash juntos para poder verificar la contraseña en el login
  return `${salt}:${hash}`;
}

export function fetchApi (url : string, options?: object) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  console.log(`${apiUrl+url}`)
  return fetch(`${apiUrl}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json', // ¡Esto es vital!
      ...options?.headers // Mantiene los headers extra si pasas alguno
    }
  });
}

