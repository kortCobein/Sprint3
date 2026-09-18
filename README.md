<div align="center">

<table>
<tr>
<td align="center" width="50%"><img src="https://iokort.com/mcp/api/file.php?id=f6c82cd6-89ea-4f63-8574-75d569846d64" alt="Identidad institucional UTSJR" height="72" /></td>
<td align="center" width="50%"><img src="https://iokort.com/mcp/api/file.php?id=00087600-d213-423b-9647-4721383bf469" alt="Logotipo UTSJR" height="72" /></td>
</tr>
</table>

# Sprint 3

### Desarrollo de Aplicaciones · Frontend con React

<img src="https://img.shields.io/badge/UTSJR-Universidad%20Tecnológica-00245A?style=for-the-badge" alt="UTSJR" />
<img src="https://img.shields.io/badge/Sprint-3-009D81?style=for-the-badge" alt="Sprint 3" />
<img src="https://img.shields.io/badge/Estado-En%20desarrollo-2ea44f?style=for-the-badge" alt="Estado" />

<br><br>

<img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=000000" alt="JavaScript" />
<img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white" alt="Git" />
<img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub" />
<img src="https://img.shields.io/badge/SOLID-Arquitectura-7B61FF?style=flat-square" alt="SOLID" />

<br>

> **Sprint 3 · nuevo equipo · nuevo frontend en React · mismas historias de usuario y misma metodología de trabajo del sprint anterior.**

</div>

---

## Datos académicos

| | |
|:--|:--|
| **Universidad** | Universidad Tecnológica de San Juan del Río |
| **Carrera** | Ingeniería en Desarrollo de Software Multiplataforma |
| **Materia** | Desarrollo de Aplicaciones Móviles |
| **Cuatrimestre** | 4.º Cuatrimestre |
| **Grupo** | DSM1SM-25ERS |
| **Docente** | Othón Guzmán Docurro |
| **Sprint** | Sprint 3 |
| **Frontend** | React |

---

## Equipo

| # | Integrante | Alias mostrado |
|---:|---|---|
| 1 | **Víctor Fernando Olivares Heredia** | Vitor |
| 2 | **Jesús Alejandro Aguilar Hernández** | Keit |
| 3 | **Kurt Cobain Vázquez Sánchez** | Kort |
| 4 | **Santiago Ruiz Cedeño** | Santiago |
| 5 | **Pablo Emiliano Morales Luján** | Palito |

> El reparto definitivo de épicas e historias se documentará aquí cuando quede asignado. No se asumirá una asignación únicamente por el orden de la votación.

---

## Alcance funcional

Sprint 3 conserva las mismas doce historias de usuario trabajadas previamente:

| Épica | Historias | Alcance |
|---|---|---|
| **Épica 1 · Autenticación** | US01-US02 | Login, sesión y cierre de sesión |
| **Épica 2 · Catálogo** | US03-US05 | Catálogo, categorías y detalle de producto |
| **Épica 3 · Inventario** | US06-US08 | Crear, editar y eliminar productos |
| **Épica 4 · Compras** | US09-US10 | Agregar y gestionar carrito |
| **Épica 5 · Auditorías** | US11-US12 | Usuarios e histórico global de carritos |

Los criterios de aceptación funcionales se mantienen. La diferencia principal de este sprint es la implementación de un **frontend nuevo con React**.

---

## Metodología de trabajo

Se conserva el flujo de integración del sprint anterior:

```text
main
  ↑
develop
  ↑
feature/usXX-descripcion-integrante
```

- `main`: versión estable.
- `develop`: integración del sprint.
- `feature/*`: trabajo aislado por historia de usuario.
- Cada historia se integra mediante Pull Request hacia `develop`.
- No se desarrolla directamente sobre `main`.
- Los cambios compartidos deben ser pequeños, justificables y fáciles de revisar.

Ejemplo:

```bash
git fetch origin
git switch feature/us03-catalogo-nombre
git pull

git add .
git commit -m "feat(us03): implementar catalogo"
git push
```

---

## Organización del frontend React

La aplicación se organizará por dominio para que cada historia tenga responsabilidades claras:

```text
src/
├── app/
│   ├── routes/
│   └── providers/
├── core/
│   ├── api/
│   ├── config/
│   └── utils/
├── features/
│   ├── auth/
│   ├── catalog/
│   ├── inventory/
│   ├── cart/
│   └── audit/
├── components/
└── main.jsx
```

Dentro de cada feature pueden existir, según lo requiera la historia:

```text
features/<modulo>/
├── components/
├── pages/
├── hooks/
├── services/
└── repositories/
```

La intención es separar interfaz, estado/lógica, acceso a datos y comunicación HTTP para que el código sea fácil de explicar, probar e integrar.

---

## Principios de desarrollo

- Componentes React enfocados en presentación y composición.
- Hooks para lógica reutilizable y manejo de estado cuando corresponda.
- Servicios para comunicación HTTP.
- Repositorios o adaptadores para desacoplar el consumo de datos.
- Configuración de endpoints centralizada.
- Sin tokens, contraseñas ni secretos dentro del repositorio.
- Cada integrante debe poder explicar completamente el código de sus historias.
- Evitar lógica de negocio directamente dentro de componentes visuales grandes.
- Mantener commits identificables por historia de usuario.

Arquitectura conceptual:

```text
React UI
   ↓
Hooks / Estado
   ↓
Repository
   ↓
Service / API Client
   ↓
Configuración
   ↓
Backend / API
```

---

## Convención de commits

```text
feat(usXX): descripcion
fix(usXX): descripcion
refactor(usXX): descripcion
docs: descripcion
```

Ejemplos:

```text
feat(us01): implementar formulario de login
fix(us04): corregir filtro por categoria
refactor(us09): separar logica del carrito
docs: actualizar datos del equipo
```

---

<div align="center">

**Universidad Tecnológica de San Juan del Río**  
Ingeniería en Desarrollo de Software Multiplataforma · 4.º Cuatrimestre

`React` · `JavaScript` · `SOLID` · `Git` · `GitHub`

<br>

**Sprint 3**

</div>
