// src/components/layouts/ThemeToggle.tsx
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";

export function ThemeToggle() {
  const setTheme = (theme: string) => {
    if (theme === "system") {
      // Si el tema es "sistema", verifica la preferencia del sistema
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (prefersDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      // Opcional: Guarda la preferencia en localStorage
      localStorage.setItem("theme", "system");
    } else {
      // Si el tema es "light" o "dark", aplica directamente
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem("theme", theme);
    }
  };

  // Obtiene el tema actual para mostrar el ícono correcto
  const currentTheme = localStorage.getItem("theme") || "system";
  const isDark =
    currentTheme === "dark" ||
    (currentTheme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun
            className={`h-[1.2rem] w-[1.2rem] transition-all ${
              isDark ? "-rotate-90 scale-0" : "rotate-0 scale-100"
            }`}
          />
          <Moon
            className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
              isDark ? "rotate-0 scale-100" : "rotate-90 scale-0"
            }`}
          />
          <span className="sr-only">Cambiar tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Oscuro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
