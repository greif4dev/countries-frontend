# Documentação Frontend - Sistema de Países

## 📊 Tecnologias Utilizadas

- Angular 19 (Standalone Components)
- JWT com LocalStorage
- Interceptor de token
- Angular Router e Guards

## 🔐 Fluxo de Autenticação

### Login

1. Usuário preenche login e senha
2. Front envia para: `POST /usuario/autenticar`
3. Se autenticado:
   - Token JWT salvo no `localStorage`
   - Nome e perfil armazenados no `UserInfoService`
   - Redirecionamento para `/paises`


### Proteção de Rotas

- `AuthGuard` bloqueia acesso se o token estiver ausente
- Redireciona para `/login` se não autenticado


## 🌐 Tela Principal: Gerenciamento de Países

### Funcionalidades:

- Listar todos os países (`GET /pais/listar`)
- Pesquisar por nome
- Ordenar por nome, sigla ou gentílico
- Criar novo país (`POST /pais/salvar`)
- Editar e excluir país (admin)
- Paginação com 5 registros por vez

### Admin x Convidado

| Ação | Convidado | Admin |
|--------|-----------|--------|
| Listar | ✅       | ✅     |
| Pesquisar | ✅  | ✅     |
| Criar | ❌      | ✅     |
| Editar | ❌     | ✅     |
| Excluir | ❌    | ✅     |

---

## 🚧 Interceptor de Token (Angular)

```ts
// Adiciona o token JWT ao header Authorization
authorization: Bearer <token>
```

- Todas as requisições são interceptadas
- Token é adicionado se existir no `localStorage`

---

## 👤 Header e Logout

- Exibe nome do usuário logado
- Botão "Sair":
  - Confirmação
  - Remove token
  - Redireciona para `/login`

---

## 🔀 Armazenamento Local

- `token`: salvo no `localStorage`
- `nome` e `perfil`: mantidos em `UserInfoService`

```ts
localStorage.setItem('token', jwt);
```

---

## 🎨 Estrutura de Diretórios

```
src/app/
├── auth/         -> login, guard, interceptor
├── core/         -> header, user-info
├── paises/       -> CRUD de países
├── shared/       -> utils, models
├── app.routes.ts -> rotas
├── app.config.ts -> providers
└── app.component.ts
```
