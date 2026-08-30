## 🎮 Game Codex API

API RESTful focada na busca, consulta e descobrimento de jogos digitais, desenvolvida utilizando **Express.js**, **TypeScript**, **Prisma ORM** e **PostgreSQL**.

A Game Codex API simula uma biblioteca de jogos semelhante a plataformas como **Steam** e **IGDB**, permitindo explorar jogos através de múltiplos filtros e recursos avançados de busca.

<br>

### 🎯 Objetivo do Projeto

O objetivo da **Game Codex API** é demonstrar a construção de uma **API backend moderna e organizada**, aplicando conceitos amplamente utilizados no mercado como:

- APIs REST
- Arquitetura em camadas
- Query params dinâmicos
- Validações de payloads com Zod
- Persistência de dados com PostgreSQL
- ORM com Prisma
- Documentação Swagger

<br>

### ⚙️ Funcionalidades

Além das funcionalidades de `CRUD` básicas para jogos e estudios de desenvolvimento, A API possui recursos de pesquisa e descoberta de jogos por:

- ✏️ Nome
- 🎮 Gênero
- 💻 Plataforma
- 🕹️ Tipo de plataforma
- 🏢 Estúdio
- 🎯 Classificação indicativa
- 📅 Data de lançamento

Além disso, a aplicação foi projetada com foco em:

- 🏗️ Arquitetura em camadas
- 📦 Organização modular
- 🔄 Modelagem relacional
- ✅ Validação de dados
- 🎯 Boas práticas de desenvolvimento backend

<br>

### 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (v18+)
- **PostgreSQL** (v12+)
- **Git**

<br>

### 📚 Documentação da API

A documentação completa da API está disponível no **Swagger UI**:

```
http://localhost:3000/swagger
```

<br>

### 🔎 Exemplos de Pesquisa

#### Buscar jogos por nome:

```bash
GET /games?name=elden-ring
```

#### Filtrar por gênero:

```bash
GET /games?genre=rpg
```

#### Filtrar por plataforma:

```bash
GET /games?platform=pc
```

#### Filtrar por tipo de plataforma

```bash
GET /games?type=CONSOLE
```

#### Filtrar por estúdio

```bash
GET /games?studio=FromSoftware
```

#### Filtrar por classificação indicativa

```bash
GET /games?classification=18
```

#### Filtrar por data de lançamento

```bash
GET /games?releaseDate=2022-02-25
```

#### Combinar múltiplos filtros

```bash
GET /games?genre=rpg&platform=pc&classification=18
```

<br>

### 🏗️ Arquitetura em Camadas

A aplicação segue o padrão de **Arquitetura em Camadas**, dividindo as responsabilidades em três camadas principais:

#### **1. Controller (Controlador)**

- Responsável por receber requisições HTTP
- Validar entrada de dados
- Chamar a camada de serviço
- Retornar respostas HTTP

📁 Localização: `src/modules/[modulo]/[modulo].controller.ts`

```typescript
export class GameController {
    async create(req: Request, res: Response) {
        const data = req.body;
        const game = await this.service.create(data);
        return res.status(201).json(game);
    }
}
```

#### **2. Service (Serviço)**

- Contém a lógica de negócio
- Valida regras de negócio
- Orquestra operações entre repositórios
- Lança erros de negócio

📁 Localização: `src/modules/[modulo]/[modulo].service.ts`

```typescript
export class GameService {
    async create(data: GameCreateDTO) {
        await this.validateData(data);
        return this.repository.create(data);
    }
}
```

#### **3. Repository (Repositório)**

- Acessa o banco de dados
- Encapsula queries do Prisma
- Retorna dados brutos do banco
- Sem lógica de negócio

📁 Localização: `src/modules/[modulo]/[modulo].repository.ts`

```typescript
export class GameRepository {
    async create(data: GameCreateDTO) {
        return prisma.game.create({ data });
    }
}
```

#### **Fluxo da Requisição**

```
Request HTTP
    ↓
  Router
    ↓
  Controller (validação de entrada)
    ↓
  Service (lógica de negócio)
    ↓
  Repository (acesso ao BD)
    ↓
  Prisma Client
    ↓
  PostgreSQL
    ↓
  Repository (retorna dados)
    ↓
  Service (processa resultados)
    ↓
  Controller (formata resposta)
    ↓
Response HTTP
```

<br>

### 📁 Estrutura do Projeto

```bash
game-codex-api/
│
├── 📄 package.json              # Configuração do projeto e dependências
├── 📄 tsconfig.json             # Configuração do TypeScript
├── 📄 prisma.config.ts          # Configuração do Prisma
├── 📄 README.md                 # Este arquivo
│
├── 📁 prisma/                   # Configuração do banco de dados
│   ├── schema.prisma            # Esquema do banco de dados
│   ├── seed.ts                  # Script para popular dados iniciais
│   │
│   ├── 📁 data/                 # Dados de seed
│   │   ├── countries.seed.ts
│   │   ├── genres.seed.ts
│   │   └── platforms.seed.ts
│   │
│   └── 📁 migrations/           # Migrations do Prisma
│       └── [timestamps]/        # Histórico de alterações
│
├── 📁 src/
│   │
│   ├── app.ts                   # Configuração da aplicação Express
│   ├── server.ts                # Ponto de entrada do servidor
│   │
│   ├── 📁 routes/               # Rotas da API
│   │   ├── index.ts
│   │   ├── game.routes.ts
│   │   ├── game-studio.routes.ts
│   │   ├── genre.routes.ts
│   │   ├── platform.routes.ts
│   │   └── country.routes.ts
│   │
│   ├── 📁 modules/              # Módulos de negócio (estrutura CRUD)
│   │   ├── game/
│   │   │   ├── game.controller.ts      # Controlador
│   │   │   ├── game.service.ts         # Serviço (lógica de negócio)
│   │   │   ├── game.repository.ts      # Repositório (BD)
│   │   │   ├── game.schema.ts          # Validações com Zod
│   │   │   └── index.ts
│   │   │
│   │   ├── game-studio/
│   │   │   ├── game-studio.controller.ts
│   │   │   ├── game-studio.service.ts
│   │   │   ├── game-studio.repository.ts
│   │   │   ├── game-studio.schema.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── genre/
│   │   ├── platform/
│   │   └── country/
│   │
│   ├── 📁 middlewares/          # Middlewares da aplicação
│   │   ├── logger.middleware.ts         # Log de requisições
│   │   ├── error-handler.middleware.ts  # Tratamento de erros
│   │   ├── 404-handler.middleware.ts    # Página 404
│   │   ├── validate-body.middleware.ts  # Validação de corpo
│   │   └── index.ts
│   │
│   ├── 📁 docs/                 # Documentação
│   │   └── swagger.ts           # Configuração do Swagger/OpenAPI
│   │
│   ├── 📁 lib/                  # Bibliotecas e utilidades
│   │   └── prisma.ts            # Instância do Prisma Client
│   │
│   ├── 📁 utils/                # Utilitários
│   │   └── api-error.ts         # Classe personalizada de erro
│   │
│   └── 📁 generated/            # Código gerado automaticamente
│       └── prisma/              # Tipos do Prisma (gerado)
│           ├── client.ts
│           ├── models.ts
│           ├── enums.ts
│           └── models/
│
└── 📁 docs/                     # Documentação complementar
    ├── game-codex-arc.svg       # Diagrama da arquitetura
    └── game-codex-db.svg        # Diagrama do banco de dados
```

<br>

### ✅ Validação de Dados

A aplicação utiliza **Zod** para validação de entrada de dados. Cada módulo possui um arquivo `[modulo].schema.ts` com os schemas de validação:

```typescript
// Exemplo: game.schema.ts
export const createGameSchema = z.object({
    name: z.string().min(1).max(120),
    slug: z.string().min(1).max(50),
    description: z.string().min(1),
    classification: z.enum(['L', '10', '12', '14', '16', '18']),
    releaseDate: z.coerce.date(),
    studioId: z.number().int().positive(),
});
```

<br>

### 📊 Diagramas

#### Arquitetura em Camadas

![Arquitetura](./docs/game-codex-arc.svg)

#### Modelagem de Dados

![Modelagem de Dados](./docs/game-codex-db.svg)

<br>

### 🚀 Instalação e Configuração

#### 1. Clonar o Repositório

```bash
git clone https://github.com/DevJoaoVitorB/game-codex-api.git
cd game-codex-api
```

#### 2. Instalar Dependências

```bash
npm install
```

#### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Banco de Dados PostgreSQL
DATABASE_URL="postgresql://usuario:senha@localhost:5432/game_codex_db"

# Servidor
NODE_ENV=development
PORT=3000

# (Opcional) Configurações adicionais
LOG_LEVEL=info
```

**Nota:** Substitua `usuario`, `senha` e outras informações de acordo com sua configuração local do PostgreSQL.

#### 4. Configurar Banco de Dados

```bash
# Executar migrations do Prisma
npm run prisma:init

# (Opcional) Popular o banco com dados de seed
npm run prisma:seed

# (Opcional) Abrir Prisma Studio para visualizar dados
npm run prisma:studio
```

#### 5. Iniciar o Servidor

#### Modo Desenvolvimento (com watch)

```bash
npm run start:dev
```

#### Modo Build (produção)

```bash
npm run build
npm run start:build
```

O servidor estará disponível em `http://localhost:3000`

<br>

### 🚀 Tecnologias Utilizadas

![Tecnologias](https://skillicons.dev/icons?i=ts,nodejs,express,prisma,postgresql,swagger,zod)

<br>

### 📧 Autor

| **DevJoaoVitorB** |
| ----------------- |
| ![Foto de Perfil - DevJoaoVitorB](https://avatars.githubusercontent.com/u/182047578?s=100&v=4) |
| [![GitHub](https://skillicons.dev/icons?i=github)](https://github.com/DevJoaoVitorB) [![Linkedin](https://skillicons.dev/icons?i=linkedin)](https://www.linkedin.com/in/devjoaovitorb) |
