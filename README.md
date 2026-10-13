# Website Alshorouk

Monorepo for the Alshorouk website.

```
Website-Alshorouk/
├── apps/
│   ├── frontend/          React + Vite
│   └── backend/           NestJS
├── packages/
│   └── shared-types/
├── docs/
│   ├── architecture/
│   ├── api/
│   └── deployment/
├── scripts/
├── package.json
└── README.md
```

## Run

```bash
npm install
npm run dev:frontend
npm run dev:backend
```

`npm run dev:frontend` starts Vite at http://localhost:5080. `npm run dev:backend` starts NestJS at http://localhost:5070.

Existing pages are in `apps/frontend/src/pages/public`. `pages/portal` and `pages/admin` are reserved. Backend modules match the same domains and are registered from `apps/backend/src/app.module.ts`.
