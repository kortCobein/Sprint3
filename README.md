<div align="center">

# Sprint 3

### Desarrollo de Aplicaciones · Frontend con React + TypeScript

<img src="https://img.shields.io/badge/UTSJR-Universidad%20Tecnológica-00245A?style=for-the-badge" alt="UTSJR" />
<img src="https://img.shields.io/badge/Sprint-3-009D81?style=for-the-badge" alt="Sprint 3" />
<img src="https://img.shields.io/badge/Estado-En%20desarrollo-2ea44f?style=for-the-badge" alt="Estado" />

</div>

## Equipo

- Kurt Cobain Vazquez Sanchez
- Victor Fernando Olivares Heredia
- Jesús Alejandro Aguilar Hernández
- Santiago Ruiz Cedeño
- Pablo Emiliano Morales Luján

## Stack

- React 19
- TypeScript
- Vite
- ESLint

## Ejecutar el proyecto

```bash
npm install
npm run dev
```

Validaciones:

```bash
npm run build
npm run lint
```

## Organización por épicas e historias

La organización de trabajo sigue el mismo esquema utilizado en Sprint 2: una carpeta por integrante/épica y, dentro de ella, una carpeta por historia de usuario.

```text
src/features/
├─ e1_victor/
│  ├─ epica01.md
│  ├─ hist01_login_perfiles/
│  └─ hist02_logout_credenciales/
├─ e2_jesus/
│  ├─ epica02.md
│  ├─ hist03_catalogo_general/
│  ├─ hist04_filtrar_categoria/
│  └─ hist05_detalle_producto/
├─ e3_kort/
│  ├─ epica03.md
│  ├─ hist06_agregar_producto/
│  ├─ hist07_editar_producto/
│  └─ hist08_eliminar_producto/
├─ e4_santiago/
│  ├─ epica04.md
│  ├─ hist09_agregar_carrito/
│  └─ hist10_gestionar_carrito/
└─ e5_pablo/
   ├─ epica05.md
   ├─ hist11_listar_usuarios/
   └─ hist12_historico_carritos/
```

Cada historia contiene un `index.ts` que expone únicamente los módulos relacionados con esa historia. La implementación existente se conserva para mantener estables los imports y no romper la aplicación durante la reorganización.

## Arquitectura base

La aplicación separa dominio, infraestructura, lógica de aplicación y presentación. El componente principal no conoce detalles de `fetch` ni de FakeStoreAPI; las dependencias se conectan en puntos de composición.

## Ramas de trabajo

- `feature/kort`
- `feature/victor`
- `feature/jesus`
- `feature/santiago`
- `feature/pablo`

Cada integrante trabaja en su rama. La integración se realiza hacia `main` mediante revisión antes de mezclar cambios.
