---
title: "Por qué el 2FA todavía importa (aunque a veces sea una molestia)"
date: 2025-05-05
description: "La segunda llave de tu vida digital ya no es opcional. Aquí está por qué importa, y cómo reconstruí mi sistema después de que todo colapsó."
category: "Technology"
cover: "https://substack-post-media.s3.amazonaws.com/public/images/2cb8d048-17f8-41e0-8643-4ad73fa228c2_1536x1024.png"
lang: es
draft: false
substackUrl: "https://felipeaguilera.substack.com/p/why-2fa-still-matters-even-when-it"
---

La semana pasada escribí sobre contraseñas, passkeys y lo que solemos malentender sobre la seguridad "moderna". Ese artículo generó una reflexión, no solo técnica, sino personal.

Hasta hace muy poco, era usuario de 1Password hace años. Luego migré a Bitwarden buscando ahorrar dinero. Pero la interfaz no terminó de convencerme. Me di cuenta de que necesitaba algo más simple y más consistente entre mis herramientas, así que cambié de nuevo, esta vez a **Proton Pass**, donde ahora gestiono mi vida digital.

Puede sonar obsesivo, pero hay una razón: hace aproximadamente un año, me robaron el teléfono de las manos en Santiago. En unas pocas horas aprendí de la peor manera qué tan frágil es realmente nuestra configuración digital. Esa historia la guardo para más adelante, pero fue lo que desencadenó todos los cambios que he hecho desde entonces.

¿Uno de esos cambios? Una mejora seria en cómo uso la **autenticación de dos factores (2FA)**.

Este artículo continúa la reflexión de *Passkeys vs Contraseñas*. Pero hoy nos enfocamos en esa capa invisible, y frecuentemente molesta, que se sienta entre tu contraseña y el mundo: **el 2FA**.

---

### Qué es el 2FA y por qué todavía importa

El 2FA, autenticación de dos factores, parte de la idea de que una sola llave no es suficiente. Necesitas una segunda prueba de que eres *tú* quien está iniciando sesión, algo que solo tú puedes entregar.

Este "segundo factor" generalmente viene en una de tres formas:

- **Código SMS a tu teléfono**
  - Ventajas: fácil de usar, ampliamente soportado
  - Desventajas: vulnerable a SIM swapping e interceptación
- **Apps de autenticación** (como Proton Pass, Bitwarden, Google Authenticator)
  - Ventajas: seguro, funciona sin conexión, más privado
  - Desventajas: puede perderse sin respaldo adecuado
- **Tokens de hardware** (como YubiKey)
  - Ventajas: máxima protección, resistente al phishing
  - Desventajas: menos conveniente, necesitas tenerlo físicamente

¿Por qué importa? Porque las contraseñas, incluso las buenas, pueden robarse, adivinarse o filtrarse. Pero combinarlas con una capa separada te hace exponencialmente más seguro. Es como cerrar una puerta *y* necesitar una huella digital para abrirla.

---

### Cómo uso el 2FA ahora (y tú podrías también)

Mi sistema actual:

- Proton Pass como gestor de contraseñas y herramienta de 2FA (¡con 2FA activado para él mismo!)
- Respaldo encriptado de códigos de autenticación (por si acaso)
- Plan de recuperación del dispositivo en caso de pérdida o robo
- Eliminando progresivamente la verificación por SMS donde sea posible

¿Es perfecto? No. Pero es *mucho* mejor que antes, y duermo mejor sabiendo que un teléfono robado no significa automáticamente una vida robada.

---

### Reflexión final

La seguridad no es algo que notas cuando funciona, solo cuando falla.

El 2FA vive en esa zona intermedia: no lo suficientemente invisible como para olvidarlo, no lo suficientemente dramático como para temerle. Pero es la capa que le da poder real a tu contraseña. Y aunque puede frenarte unos segundos, podría ahorrarte horas, o días, de arrepentimiento.

Pronto compartiré la historia completa del robo del teléfono: qué se perdió, qué aprendí y cómo cambió mi relación con mi yo digital. Pero esta semana, simplifiquemos: revisa tu configuración de 2FA.

---
