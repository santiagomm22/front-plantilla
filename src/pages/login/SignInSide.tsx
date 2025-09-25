import SignInCard from "./SignInCard";
import Content from "./Content";
import { useEffect } from "react";

export default function SignInSide() {
  useEffect(() => {
    // 🌿 FONDO MINIMALISTA - Verde casi imperceptible
    const applyMinimalistGreenBackground = () => {
      // Limpiar efectos anteriores
      document
        .querySelectorAll(
          ".green-effects-layer, .exaggerated-overlay, .subtle-pattern, .moderate-green-pattern, .pastel-pattern"
        )
        .forEach((el) => el.remove());

      // FONDO PRINCIPAL - Verde minimalista
      document.documentElement.style.setProperty(
        "background",
        `
  linear-gradient(180deg, 
    #E6EBE6 0%,      
    #F5FFF5 31%,     
    #E3FAE3 78%,    
    #FFFFFF 100%     
  )`,
        "important"
      );

      document.documentElement.style.setProperty(
        "background-size",
        "100% 100%",
        "important"
      );
      document.documentElement.style.setProperty(
        "background-attachment",
        "fixed",
        "important"
      );
      document.documentElement.style.setProperty(
        "background-repeat",
        "no-repeat",
        "important"
      );
      document.documentElement.style.setProperty(
        "min-height",
        "100vh",
        "important"
      );

      // BODY TRANSPARENTE
      document.body.style.setProperty("background", "transparent", "important");
      document.body.style.setProperty(
        "background-color",
        "transparent",
        "important"
      );

      // SIN PATRÓN - Completamente limpio
    };

    applyMinimalistGreenBackground();
  }, []);
  return (
    <section className="relative min-h-screen flex flex-col section-glass">
      {/* Background Pattern para efecto glass */}
      <div className="absolute inset-0 bg-grid-gray-100/50 bg-[size:60px_60px] opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-white/80" />

      <img
        src="/images/PajaroEMCALIcolor.png"
        alt="Background Image Color"
        className="absolute top-[20%] right-0 transform -translate-y-1/2 w-200 opacity-8 z-0 object-contain"
      />

      <img
        src="/images/PajaroEMCALIcolor (2).png"
        alt="Background Image Color"
        className="absolute top-[57%] left transform -translate-y-1/2 w-250 opacity-7 z-0 object-contain"
      />

      {/* Contenido principal */}
      <main className="relative flex flex-col justify-center flex-grow z-30">
        <div className="flex flex-col justify-center gap-6 sm:gap-12 p-2 sm:p-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-center gap-6 sm:gap-12">
            {/* Cambiar el orden en pantallas pequeñas */}
            <Content className="md:order-1 order-2 z-1" />
            <SignInCard className="md:order-2 order-1 z-1" />
          </div>
        </div>
      </main>
    </section>
  );
}
