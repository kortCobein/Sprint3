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

## Arquitectura base

La aplicación separa dominio, infraestructura, lógica de aplicación y presentación. El componente principal no conoce detalles de `fetch` ni de FakeStoreAPI; las dependencias se conectan en un punto de composición (`createProductService`). Esto permite sustituir la API o el cliente HTTP sin modificar la UI.

```text
src/
├─ app/
├─ core/
│  └─ http/
└─ features/
   └─ products/
      ├─ application/
      ├─ domain/
      ├─ infrastructure/
      └─ ui/
```

## Ramas de trabajo

- `feature/kort`
- `feature/victor`
- `feature/jesus`
- `feature/santiago`
- `feature/pablo`

Cada integrante trabaja en su rama. La integración se realiza hacia `main` mediante revisión antes de mezclar cambios.
