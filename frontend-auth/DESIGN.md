# SITU Auth — Planejamento & Design System

Interface de autenticação (Login + Cadastro) para o **SITU — Inteligência Territorial**.
Stack: React 19 · Vite · Tailwind CSS v4 · React Router DOM 7 · React Hook Form · Zod · Lucide React.

---

## 1. Conceito e direção visual

O produto é uma plataforma de **inteligência territorial** (dados de município, setores censitários, mapas). A tela de auth precisa transmitir **confiança institucional** — sensação de banco/fintech/órgão de dados — sem cair no genérico.

Direção escolhida: **Light clean** (referência de qualidade: Stripe, Notion, Supabase). Fundo claro tipo papel, tipografia forte, hairlines sutis, **um único accent**.

**Elemento-assinatura:** o painel esquerdo de branding usa um motivo de **curvas de nível topográficas** (linhas de contorno, como um mapa de elevação da serra de Tianguá), desenhadas em SVG de traço fino. Não é decoração aleatória — codifica o mundo do produto (território/relevo). Junto, um chip mono com a coordenada real de Tianguá (`-3.7314, -40.9917`). É a coisa memorável; o resto fica quieto e disciplinado.

**Risco estético justificado:** as curvas de nível animam um "desenho" lento no load (como um plotter traçando um mapa). É sutil, respeita `prefers-reduced-motion`, e reforça a identidade cartográfica em vez de um gradiente genérico.

---

## 2. Arquitetura da interface

```
AuthLayout (split 2 colunas, 100vh)
├── [Desktop ≥1024px] Painel esquerdo — Branding
│     ThemeBackground (curvas de nível) + Logo + tagline + prova social + coordenada
└── Painel direito — Área do formulário (scroll interno só se necessário)
      └── AuthCard
            ├── Header (Logo compacto — só mobile, Título, Subtítulo)
            ├── <Outlet/>  → LoginForm | SignupForm
            └── Footer (link alternado Login/Cadastro)
```

- **Desktop/Notebook:** branding à esquerda, form à direita.
- **Tablet:** branding encolhe; em `< 1024px` o painel de branding some, form ocupa 100% e centraliza.
- **Mobile:** só o form, logo compacto no topo, zero scroll horizontal.

---

## 3. Hierarquia visual

1. **Título** (`Entrar` / `Criar conta`) — Inter Tight 600, o maior peso da tela.
2. **Subtítulo** — muted, contextualiza a ação.
3. **Campos** — foco máximo de interação; label sempre visível (não placeholder-as-label).
4. **CTA primário** — único botão preenchido com o accent; âncora visual da ação principal.
5. **Ações secundárias** (esqueci senha, lembrar-me, social, link alternar) — peso reduzido, nunca competem com o CTA.

Ritmo por **grid de 8px** (espaçamentos em múltiplos de 8 — `gap-2/4/6/8`).

---

## 4. Fluxo do usuário

```
/login  ──"Criar conta"──►  /signup
   ▲                            │
   └────────"Fazer login"───────┘

Login:  digita → validação on-blur → submit → LoadingButton → success/error
Signup: digita → validação em tempo real (onChange) → força de senha ao vivo
        → aceite dos termos habilita CTA → submit → redireciona p/ /login (ou app)
```

Rota `/` redireciona para `/login`. Estrutura pronta para uma rota protegida futura via `AuthContext`.

---

## 5. Componentização (nenhum componente > ~150 linhas)

| Componente | Responsabilidade única |
|---|---|
| `AuthLayout` | Split branding/form + `<Outlet/>` |
| `ThemeBackground` | Assinatura visual (curvas de nível SVG) |
| `AuthCard` | Container do form: título, subtítulo, slot |
| `Logo` | Marca SVG + wordmark (props `size`, `mark-only`) |
| `Button` | Base (variants: `primary`, `ghost`, `outline`) |
| `LoadingButton` | Button + estado `loading`/`disabled` |
| `Input` | Label + campo + erro + estados; encaminha `ref` (RHF) |
| `PasswordInput` | Input + mostrar/ocultar |
| `PasswordStrength` | Medidor de força ao vivo |
| `Checkbox` | Checkbox acessível (lembrar-me / termos) |
| `Divider` | Separador "ou" |
| `FormError` | Mensagem de erro de campo/form (aria-live) |
| `SocialButton` | Botão de provedor (Google/GitHub) |
| `LoginForm` / `SignupForm` | Orquestram RHF + Zod + serviço |

**Princípios:** SRP (cada componente uma responsabilidade), sem duplicação (utilitário `cn`), sem CSS externo (só Tailwind), props tipadas por JSDoc + Zod como fonte de verdade.

---

## 6. Design System (tokens — todos em Tailwind v4 `@theme`)

### Paleta
| Token | Hex | Uso |
|---|---|---|
| `canvas` | `#FBFBFA` | fundo papel |
| `surface` | `#FFFFFF` | cards/campos |
| `ink` | `#10231B` | texto principal (pine-black) |
| `muted` | `#5B6B63` | texto secundário |
| `subtle` | `#8A968F` | placeholder/hint |
| `line` | `#E7E9E4` | hairlines/bordas |
| `primary` | `#0F7A54` | accent único (CTA, foco) |
| `primary-hover` | `#0C6344` | hover do CTA |
| `primary-soft` | `#EAF4EF` | tint de foco/seleção |
| `danger` | `#B42318` | erro |
| `success` | `#067647` | sucesso/força alta |

Contraste: `ink` sobre `surface` ≈ 15:1; `primary` sobre branco ≈ 4.6:1 (texto/ícone AA); botão usa texto branco sobre `primary` (AA). Estados de erro nunca dependem só de cor (ícone + texto).

### Tipografia
- **Display:** Inter Tight (600/700) — títulos, wordmark. Tracking levemente negativo.
- **Texto/UI:** Inter (400/500/600).
- **Mono utilitária:** JetBrains Mono — eyebrow, coordenada, chips de dado.
- Escala: `text-xs 12 · sm 14 · base 15 · lg 18 · 2xl 24 · 3xl 30`.

### Espaçamento — grid 8px
Múltiplos de 8 (`2/4/6/8/10/12`). Padding do card `p-8` desktop, `p-6` mobile.

### Radius
`--radius-md 10px` (campos/botões) · `lg 14px` · `xl 20px` (card) · `full` (pills).

### Sombra (discreta)
`shadow-card` = `0 1px 2px rgba(16,35,27,.04), 0 12px 32px -16px rgba(16,35,27,.10)`. Nada exagerado.

### Ícones
Lucide React, `1.5px` stroke, tamanho `18–20px`, cor herdada.

### Animação (tokens)
```
--ease-out: cubic-bezier(0.23, 1, 0.32, 1)      /* entradas/saídas UI */
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)  /* movimento na tela */
durations: press 120ms · input/focus 160ms · erro 200ms · rota 240ms · contorno 1200ms+
```

---

## 7. Estados dos componentes

- **Input/PasswordInput:** default · hover (borda `ink/20`) · focus (ring `primary` + `primary-soft`) · error (borda `danger` + msg) · success (borda `success`) · disabled.
- **Button/LoadingButton:** default · hover · active (scale press) · focus-visible (ring) · loading (spinner + `aria-busy`) · disabled.
- **Checkbox:** unchecked · checked (accent) · focus-visible · disabled.
- **PasswordStrength:** vazio · fraca · média · forte (cor + label + barra).

---

## 8. Microinterações (todas transform/opacity, ver `animate-apple`)

| Interação | Ferramenta | Curva/Duração | Propósito |
|---|---|---|---|
| Foco de campo | CSS transition | ease · 160ms | feedback |
| Press do CTA | CSS transition (`active:scale`) | 120ms | feedback |
| Erro aparece | transition (não keyframe) | ease-out · 200ms | state indication |
| Mostrar/ocultar senha | troca instantânea de ícone | — | feedback |
| Medidor de força | `transform: scaleX` (origin left) | ease-out · 200ms | state indication |
| Transição de rota login↔signup | opacity+translateY curto | ease-out · 240ms | spatial |
| Curvas de nível (load) | CSS animation (off-main-thread) | ≥1200ms | delight (raro) |

Tudo desativa movimento sob `prefers-reduced-motion` (mantém opacidade/cor, remove translate/scale). Hover motion protegido por `@media (hover:hover)`.

---

## 9. Estratégia de validação

- **Fonte única de verdade:** schemas **Zod** em `utils/validators.js`.
- **React Hook Form** com `zodResolver`.
- **Login:** validação `onBlur` + no submit (menos ruído).
- **Cadastro:** `onChange` (tempo real) — email, CPF (algoritmo dos dígitos verificadores), senha (força), confirmação (refine de igualdade), termos (obrigatório).
- **CPF:** máscara `000.000.000-00` no input + validação real dos dígitos.
- **Erros:** mensagens claras, em PT, na voz da interface (dizem o que corrigir), `aria-live="polite"`.
- **Nenhuma chamada falsa:** `services/auth.service.js` expõe `login()`/`register()` com a assinatura pronta para o backend **Spring Boot + JWT**; hoje só valida e loga o payload/lança "não implementado".

---

## 10. Acessibilidade (WCAG AA)

- `label` associado a cada campo (`htmlFor`/`id`), `aria-invalid`, `aria-describedby` para erro.
- `autocomplete` correto (`email`, `current-password`, `new-password`, `given-name`, `family-name`).
- Foco **sempre visível** (`focus-visible` ring), ordem de tab lógica, navegação 100% por teclado.
- `aria-busy` no botão em loading; `aria-live` nas mensagens.
- Alvos de toque ≥ 44px; contraste AA; erro comunicado por texto+ícone (não só cor).
- Botão mostrar/ocultar senha com `aria-label` dinâmico e `aria-pressed`.

---

## 11. Organização de pastas

```
frontend-auth/
├── index.html                 # fontes (Inter/Inter Tight/JetBrains Mono)
├── package.json · vite.config.js · jsconfig.json · .env.example · .gitignore
└── src/
    ├── main.jsx · App.jsx · index.css   # index.css = tokens @theme + base
    ├── routes/router.jsx
    ├── layouts/AuthLayout.jsx
    ├── pages/{LoginPage,SignupPage}.jsx
    ├── components/
    │   ├── ui/{Button,LoadingButton,Input,PasswordInput,Checkbox,Divider,FormError,SocialButton}.jsx
    │   ├── brand/{Logo,ThemeBackground}.jsx
    │   └── auth/{AuthCard,LoginForm,SignupForm,PasswordStrength}.jsx
    ├── hooks/{usePasswordStrength,useAuth}.js
    ├── context/AuthContext.jsx
    ├── services/{api,auth.service}.js
    ├── utils/{cn,cpf,validators}.js
    └── types/auth.js          # JSDoc typedefs + tipos inferidos do Zod
```

---

## 12. Preparação para backend (Spring Boot + JWT)

- `services/api.js`: wrapper `fetch` com `VITE_API_URL`, injeta `Authorization: Bearer <token>`, trata 401.
- `services/auth.service.js`: `login({email,password})` e `register(dto)` → `POST /auth/login`, `POST /auth/register` (comentado, sem chamada real).
- `context/AuthContext.jsx`: guarda `token`/`user`, `login/logout`, persiste token (troque por cookie httpOnly quando o backend estiver pronto).
- DTOs alinhados ao que o Spring espera (camelCase), CPF só dígitos no envio.

---

## 13. Melhorias futuras (sugeridas)

1. **i18n** (PT/EN) com `react-i18next`.
2. **Rota protegida** + refresh token (fluxo silencioso) e cookie httpOnly.
3. **Testes**: Vitest + Testing Library (validação, a11y) e Playwright (fluxo).
4. **OAuth real** (Google/GitHub) quando o backend expuser os endpoints.
5. **Rate-limit/anti-bot** (hCaptcha) no cadastro.
6. **Dark mode** com toggle (tokens já isoláveis por `@theme`).
7. **Storybook** para o design system e **CI** (lint + build + a11y).
8. **Verificação de e-mail** e força de senha via zxcvbn (heurística mais robusta).
```
