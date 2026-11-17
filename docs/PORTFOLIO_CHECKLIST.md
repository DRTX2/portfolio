# Checklist del portafolio (requisitos del revisor)

Estado al 16-nov-2026. ✅ cumplido · 🟡 depende de una acción tuya · ⬜ pendiente.

## Información personal
| Requisito | Estado | Dónde |
|---|---|---|
| Nombre | ✅ | Hero |
| Objetivo profesional | ✅ | About → bloque "Objetivo profesional" (EN/ES) |
| Educación superior | ✅ | Sección Education (UTA + certificaciones) |
| Hoja de vida clara y resumida (1–2 hojas) | ✅ | PDF de 2 páginas. Botón "Resume" en el hero y "Ver hoja de vida (2 páginas)" en About (modal con vista previa + descarga) |

## Experiencia
| Requisito | Estado | Dónde |
|---|---|---|
| Empresas | ✅ | Sección Experience (StayFlow Cloud, SMARTMEDIC, Freelance) |
| Proyectos | ✅ | Sección Projects con filtro por stack (Node.js, .NET, Java, React/Next.js, Angular, PHP, Mensajería, Nube/DevOps), calculado desde las tecnologías de cada proyecto |
| Personales / en equipo / clientes | ⬜ por decisión tuya | Quitaste las etiquetas del portafolio. Si el revisor lo exige, puedes indicarlo en la descripción de cada proyecto |
| Colaboradores con crédito | ⬜ por decisión tuya | Quitado de las tarjetas. **Recomendación:** dales crédito en el README de cada repo de equipo (sección "Team"), así cumples sin recargar el portafolio |

## Cada proyecto
| Requisito | Estado | Nota |
|---|---|---|
| Descripción | ✅ | Tarjeta + modal "Overview" (problema, retos, soluciones) |
| Imágenes / video / link | ✅ | Galería en lightbox. Los "Live App" caídos están ocultos (ver abajo) |
| Repositorio de GitHub | 🟡 | Todos los enlaces responden 200 **excepto Hookrelay y Flagship: haz push de esos repos** |
| Tecnologías | ✅ | Chips con íconos (devicon fijado a v2.17.0, todos verificados) |

## Contacto
| Requisito | Estado | Nota |
|---|---|---|
| Formulario de contacto | ⬜ por decisión tuya | Quitado. Ojo: en GitHub Pages sí puede funcionar con un servicio externo (FormSubmit/Formspree) sin backend propio; está en el historial si lo quieres recuperar |
| Redes profesionales | ✅ | LinkedIn, GitHub, email (los íconos estaban rotos por un bug en About.astro; corregido) |

## Otros
| Requisito | Estado | Nota |
|---|---|---|
| Hobbies / intereses | ✅ | Sección "Más allá del código": Ciberseguridad/CTF y Lectura/aprendizaje continuo (lo que elegiste) |
| Nada de imágenes rotas ni errores de servidor | ✅ | Verificado con Playwright: 0 imágenes rotas en la página. 3 "Live App" ocultos (StayFlow y MAO no responden, Iron Zone sin DNS); reactívalos en `src/data/projects.ts` cuando vuelvas a desplegar |
| Diseño basado en ejemplos / estructura | ✅ | Orden típico de portafolios de ingeniería: Hero → Sobre mí (objetivo + CV) → Experiencia → Proyectos (filtrables) → Habilidades → Educación → Intereses → Contacto |
| Información igual en todas las redes | 🟡 | Ver "Textos canónicos" abajo |
| Resumen del portafolio en el perfil | 🟡 | README de perfil (`apps/github-profile`) actualizado localmente con Hookrelay y Flagship. **Haz push** |
| Repositorios documentados | 🟡 | Hookrelay y Flagship tienen documentación completa. Revisa que tus otros repos fijados tengan al menos un README con qué es, stack, cómo correrlo y capturas |

## Textos canónicos (copiar igual en LinkedIn, GitHub y CV)

> El portafolio ahora dice **4+ años** (estadística y meta-descripción), como pediste. **Tu CV (`cv.md`) y tu README de GitHub dicen "3+"**: actualízalos a 4+ para que coincidan.

**Titular** (elige uno y úsalo en todas partes; tu `cv.md` recomienda no usar "Senior" como cargo histórico):
- `Full-Stack & Cloud Engineer · Node.js · NestJS · React · .NET` (consistente con tu README de GitHub)
- o `Senior Full-Stack & Cloud Engineer` (lo que dice hoy el hero del portafolio); si lo usas, que diga lo mismo en LinkedIn

**Resumen (EN):**
> Full-stack & cloud engineer (Node.js, NestJS, React, .NET, Spring Boot). 4+ years designing, shipping and operating production web systems: APIs, data, CI/CD and cloud. I own features end to end, from API and data design to deployment and production support. Portfolio: https://drtx2.github.io/portfolio/

**Resumen (ES):**
> Ingeniero full-stack y cloud (Node.js, NestJS, React, .NET, Spring Boot). Más de 4 años diseñando, entregando y operando sistemas web en producción: APIs, datos, CI/CD y nube. Me hago cargo de funcionalidades de punta a punta, desde el diseño de APIs y datos hasta el despliegue y el soporte en producción. Portafolio: https://drtx2.github.io/portfolio/

**En LinkedIn:** mismo titular, el resumen anterior en "Acerca de", las mismas fechas y cargos que la sección Experience, el portafolio en "Destacados" y Hookrelay y Flagship en "Proyectos".

## Antes de publicar (actualizado 17-nov-2026)
1. Crear y subir `DRTX2/hookrelay`, `DRTX2/flagship` y `DRTX2/atalaya` (aún no existen en GitHub; gitleaks limpio en los tres): `gh repo create DRTX2/<repo> --public --source . --push` dentro de cada carpeta.
2. `DRTX2/nimbus` y `DRTX2/jarvis` son privados: hazlos públicos o quita esos enlaces.
3. Push del README de perfil (ya dice 4+) y cambiar "3+" a "4+" en CV y LinkedIn.
4. Revisar y hacer commit de Nexus (llamadas) y Kuntur (paleta + pago anticipado), que quedaron sin commit.
5. READMEs de `note-app` y del repo de elecciones (GitLab): pendientes.
6. Commit y deploy del portafolio.
