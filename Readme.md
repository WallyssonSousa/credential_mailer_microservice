# 📘 Credential Mailer Microservice — Documentação Completa

---

# 📌 Visão Geral

Microserviço responsável por **gerar credenciais iniciais e enviar e-mails transacionais**, com suporte a múltiplos projetos (multi-tenant).

O serviço:

* Gera token JWT seguro
* Gera senha temporária
* Envia e-mail personalizado
* Permite gerenciamento de projetos

---

# 🚫 O que NÃO faz

* Não autentica usuários
* Não cria usuários em outros sistemas
* Não armazena senhas
* Não gerencia sessão

---

# 🧠 Fluxo do Sistema

## Envio de credenciais

1. Recebe request
2. Valida e-mail
3. Busca projeto
4. Gera token JWT (15min)
5. Gera senha temporária
6. Renderiza HTML
7. Envia e-mail via SMTP

---

## Gestão de projetos

1. Admin cria projeto
2. Projeto salvo no banco
3. APIs utilizam projectId
4. E-mails são personalizados

---

# 🔐 Segurança

## Admin Password

Obrigatório para criar projetos.

Comparado com variável de ambiente:

```
PASSWORD
```

---

## JWT

Payload:

```
{
  email: string,
  projectId: string
}
```

Expiração: 15 minutos

---

# ⚙️ Variáveis de Ambiente

```
PORT=3000

JWT_SECRET=super_secret_key

PASSWORD=admin123

SMTP_HOST=smtp.seuprovedor.com
SMTP_PORT=587
SMTP_USER=usuario
SMTP_PASS=senha
SMTP_FROM="No Reply <noreply@seuprojeto.com>"

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=credential_mailer
```

---

# 📡 Endpoints

## Health Check

GET /api/health

Response:

```
{ "status": "ok" }
```

---

# 📁 Projetos

## Criar Projeto

POST /api/projects

Body:

```
{
  "name": "Meu Sistema",
  "primaryColor": "#6C5CE7",
  "logoUrl": "https://logo.com",
  "loginUrl": "https://login.com",
  "adminPassword": "admin123"
}
```

Response:

```
{ "message": "Projeto criado com sucesso" }
```

---

## Listar Projetos

GET /api/projects

Response:

```
{
  "projects": [
    {
      "id": "uuid",
      "name": "Meu Sistema",
      "primaryColor": "#6C5CE7",
      "logoUrl": "https://..."
    }
  ]
}
```

---

## Atualizar Projeto

PUT /api/projects/:id

Body:

```
{
  "name": "Novo Nome",
  "primaryColor": "#FF5733",
  "logoUrl": "https://nova-logo.com",
  "loginUrl": "https://novo-login.com"
}
```

Response:

```
{ "success": true }
```

---

## Deletar Projeto

DELETE /api/projects/:id

Response:

```
{ "success": true }
```

---

# ✉️ Envio de Credenciais

POST /api/send-credentials

Body:

```
{
  "name": "Wallysson",
  "email": "email@email.com",
  "projectId": "uuid"
}
```

Response:

```
{ "message": "Credenciais enviadas com sucesso!" }
```

---

# ❗ Erros

Formato:

```
{
  "success": false,
  "error": "CODE",
  "message": "Descrição"
}
```

## Possíveis erros

* PROJECT_NOT_FOUND
* INVALID_EMAIL
* INVALID_ADMIN_PASSWORD
* SMTP_ERROR
* INTERNAL_ERROR

---

# 🧱 Modelo de Dados

## Project

```
{
  id: string,
  name: string,
  primaryColor: string,
  logoUrl?: string,
  loginUrl: string
}
```

---

# 🧪 Regras de Negócio

* Criação exige senha admin
* UUID gerado automaticamente
* Token expira em 15 minutos
* Atualização parcial
* Exclusão validada

---

# 🧩 Integração

Exemplo:

```
await axios.post("/api/send-credentials", {
  name: user.name,
  email: user.email,
  projectId: "uuid"
});
```

---

# 🏗️ Arquitetura

* Hexagonal Architecture
* DDD
* Ports and Adapters

---

# 🔌 Ports

## Input

* CreateProjectUseCase
* ListProjectsUseCase
* UpdateProjectUseCase
* DeleteProjectUseCase
* SendCredentialsUseCase

## Output

* ProjectRepositoryPort
* MailProviderPort
* TokenProviderPort

---

# 📬 Template de Email

* Responsivo
* Dark mode
* Token formatado
* Link direto
* Expiração: 15min

---

# 🚀 Boas práticas

* Não expor adminPassword
* Usar HTTPS
* Implementar retry
* Monitorar logs

---

# 🧠 Observações

* Token ≠ senha
* Senha é apenas visual
* Autenticação deve validar JWT

---

# 👨‍💻 Autor

Wallysson Oliveira

Microserviço desenvolvido com foco em arquitetura limpa, escalabilidade e reutilização.
