# Recanto do Guanandi - Plataforma de Gestão Financeira

Sistema de gestão financeira para a Associação Recanto do Guanandi, desenvolvido com Next.js 14, TypeScript e Prisma.

## 🚀 Tecnologias Utilizadas

- **Frontend**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS + shadcn/ui
- **Banco de Dados**: SQLite com Prisma ORM
- **Autenticação**: Sistema próprio com JWT (localStorage)
- **Icons**: Lucide React

## 📋 Funcionalidades

### 🔐 Autenticação
- Login para Associados e Administradores
- Test credentials:
  - **Admin**: `admin@recanto.com` / `123456`
  - **Associado**: `associado@recanto.com` / `123456`

### 👥 Gestão de Associados (Admin)
- Cadastro de novos associados
- Edição de dados de associados
- Visualização em tabela com busca
- Geração de cobranças PIX

### 💰 Sistema de Cobranças
- Geração de cobranças PIX
- Controle de status (Pendente, Pago, Atraso, Cancelado)
- Códigos PIX copia e cola

### 📊 Dashboard
- Dashboard para administradores
- Dashboard para associados
- Estatísticas e resumos financeiros

## 🛠️ Configuração do Ambiente

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Instalação
```bash
# Clonar o repositório
git clone <repositorio>
cd recanto-guanandi

# Instalar dependências
npm install

# Configurar banco de dados
npx prisma generate
npx prisma db push

# Popular banco de dados com dados iniciais
npx tsx scripts/seed.ts

# Iniciar servidor de desenvolvimento
npm run dev
```

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="file:./dev.db"
```

## 🗄️ Banco de Dados

### Desenvolvimento (Local)
- **Tipo**: SQLite
- **Localização**: `./db/custom.db`
- **Vantagens**: 
  - Fácil configuração
  - Arquivo único portátil
  - Ideal para desenvolvimento

### Produção (Vercel)
Para produção na Vercel, você tem duas opções:

#### Opção 1: Continuar com SQLite (Recomendado para pequeno/médio porte)
- **Vantagens**: 
  - Sem custo adicional
  - Fácil manutenção
  - Performance adequada para até 1000 usuários
- **Configuração**: 
  - O arquivo SQLite será implantado junto com a aplicação
  - Funciona bem na Vercel com o Prisma

#### Opção 2: Migrar para PostgreSQL (Recomendado para grande porte)
- **Serviços sugeridos**:
  - [Vercel Postgres](https://vercel.com/postgres)
  - [Supabase](https://supabase.com)
  - [PlanetScale](https://planetscale.com)
- **Vantagens**:
  - Melhor performance para muitos usuários
  - Escalabilidade
  - Conexões simultâneas ilimitadas
- **Migração**:
  ```bash
  # Instalar o cliente PostgreSQL
  npm install pg
  
  # Atualizar .env
  DATABASE_URL="postgresql://user:password@host:port/database"
  
  # Gerar cliente Prisma
  npx prisma generate
  
  # Migrar schema
  npx prisma db push
  ```

## 🚀 Implantação na Vercel

### Passo a Passo
1. **Fazer commit do projeto**
   ```bash
   git add .
   git commit -m "Implementação do sistema financeiro"
   ```

2. **Enviar para GitHub**
   ```bash
   git remote add origin <seu-repositorio-github>
   git push -u origin main
   ```

3. **Configurar na Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Importe o repositório do GitHub
   - Configure as variáveis de ambiente:
     - `DATABASE_URL`: URL do banco de dados
   - Clique em "Deploy"

### Configurações Adicionais
- **Framework**: Next.js (detectado automaticamente)
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Rotas da aplicação
│   ├── api/               # API Routes
│   ├── admin/             # Rotas admin
│   ├── user/              # Rotas usuário
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── ui/                # Componentes shadcn/ui
│   └── *.tsx              # Componentes custom
├── hooks/                 # Custom hooks
├── lib/                   # Utilitários
│   ├── db.ts              # Cliente Prisma
│   └── utils.ts           # Funções utilitárias
├── prisma/                # Schema e migrations
└── scripts/               # Scripts de utilidade
```

## 🔧 Scripts Úteis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm start

# Gerar Prisma Client
npx prisma generate

# Sincronizar schema com banco
npx prisma db push

# Visualizar banco de dados
npx prisma studio

# Popular banco com dados iniciais
npx tsx scripts/seed.ts
```

## 📝 Notas Importantes

### Segurança
- Em produção, considere usar cookies seguros em vez de localStorage
- Implementar HTTPS obrigatório
- Validar todos os inputs do usuário

### Performance
- As imagens devem ser otimizadas para web
- Considerar implementar cache para dados frequentes
- Monitorar performance com Vercel Analytics

### Escalabilidade
- SQLite é adequado para aplicações pequenas/médias
- Para crescimento, considerar PostgreSQL
- Implementar paginação em listas grandes

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Crie um Pull Request

## 📄 Licença

Este projeto está sob licença da Associação Recanto do Guanandi.