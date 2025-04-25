/**
 * @file SignInSide
 * @description este componente importa y utiliza los componentes "content" y "SignInCard" y es el componente que se llama para hacer de todo el login
 *
 * @authors
 * - Nombre del Autor 1 <asmendoza@emcali.com.co>
 *
 * @copyright VERTIEM 2025
 */

import SignInCard from "./SignInCard";
import Content from "./Content";

export default function SignInSide() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fondo con imagen */}
      <div className="fixed inset-0 -z-10 bg-[url('/images/FondoEmcali.webp')] bg-cover bg-center dark:bg-[url('/images/Fondomododark.webp')]" />

      {/* Contenido principal */}
      <main className="flex flex-col justify-center flex-grow mt-[max(40px-var(--template-frame-height,0px),0px)] h-[calc((1-var(--template-frame-height,0))*100%)]">
        <div className="flex flex-col justify-center gap-6 sm:gap-12 p-2 sm:p-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-center gap-6 sm:gap-12">
            {/* Cambiar el orden en pantallas pequeñas */}
            <Content className="md:order-1 order-2" />
            <SignInCard className="md:order-2 order-1" />
          </div>
        </div>
      </main>
    </div>
  );
}
