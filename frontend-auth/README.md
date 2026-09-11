# SITU · Frontend Auth

Interface de autenticação (Login + Cadastro) do **SITU — Inteligência Territorial**.
Qualidade de produto comercial: UX, acessibilidade (WCAG AA), microinterações discretas e código organizado, pronto para o backend **Spring Boot + JWT**.

> Direção visual e todas as decisões de design estão em **[`DESIGN.md`](./DESIGN.md)**.

## Stack

React 19 · Vite 6 · Tailwind CSS v4 · React Router DOM 7 · React Hook Form · Zod · Lucide React.

## Rodando localmente

Pré-requisito: **Node 18+** (recomendado Node 20).

```bash
npm install
cp .env.example .env      # ajuste VITE_API_URL quando o backend existir
npm run dev               # http://localhost:5173
```

Build de produção:

```bash
npm run build && npm run preview
```

## Rotas

| Rota | Página |
|---|---|
| `/` | redireciona para `/login` |
| `/login` | Login |
| `/signup` | Cadastro |

## Estrutura

```
src/
├── components/
│   ├── ui/        Button, LoadingButton, Input, PasswordInput, Checkbox, Divider, FormError, SocialButton
│   ├── brand/     Logo, ThemeBackground (assinatura: curvas de nível)
│   └── auth/      AuthCard, LoginForm, SignupForm, PasswordStrength
├── pages/         LoginPage, SignupPage
├── layouts/       AuthLayout (split branding + formulário)
├── routes/        router.jsx
├── hooks/         useAuth, usePasswordStrength
├── context/       AuthContext (token/usuário)
├── services/      api.js (fetch + JWT), auth.service.js (login/register)
├── utils/         cn, cpf (máscara + validação), validators (schemas Zod)
└── types/         auth.js (JSDoc typedefs)
```

## Integração com o backend

- Defina `VITE_API_URL` no `.env`.
- Em `src/services/auth.service.js`, **descomente** os blocos `apiRequest(...)` e remova os `throw` de "não implementado". Os endpoints esperados são `POST /auth/login` e `POST /auth/register`.
- Nenhuma chamada falsa é feita hoje — os formulários validam e montam o payload/DTO real, prontos para envio.

## Design tokens

Definidos uma única vez em `src/index.css` via `@theme` do Tailwind v4 (cores, tipografia, radius, sombra) — trocar a marca é editar um bloco.
