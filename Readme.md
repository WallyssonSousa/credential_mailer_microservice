# Credential Mailer Microservice

Microserviço responsável por **gerar credenciais iniciais e enviar e-mails transacionais** para usuários, de forma segura e reutilizável por múltiplos sistemas.

O serviço recebe **nome, e-mail e identificação do projeto**, gera uma senha/token temporário com JWT e envia um **e-mail HTML personalizado** conforme o projeto solicitante.

Este microserviço **não autentica usuários**, **não cria registros externos** e **não persiste senhas**.

---

## O que esta API faz

- Recebe dados básicos do usuário
- Identifica o projeto solicitante
- Gera senha/token seguro com JWT
- Renderiza template de e-mail dinâmico
- Envia e-mail transacional via SMTP
- Retorna o status da operação

---

## O que esta API não faz

- Não cria usuários em outros sistemas
- Não autentica ou mantém sessão
- Não armazena senhas ou tokens
- Não depende de regras de negócio externas

---

## Arquitetura

Este projeto segue **estritamente a Arquitetura Hexagonal (Ports and Adapters)**, com domínio isolado e infraestrutura desacoplada.

```
src/
├── domain/
│ ├── entities/
│ │ └── Project.ts
│ ├── value-objects/
│ │ └── Email.ts
│ ├── ports/
│ │ ├── input/
│ │ │ └── SendCredentialsUseCase.ts
│ │ └── output/
│ │ ├── MailProviderPort.ts
│ │ ├── TokenProviderPort.ts
│ │ └── ProjectRepositoryPort.ts
│ └── errors/
│ └── DomainError.ts
│
├── application/
│ └── use-cases/
│ └── SendCredentialsService.ts
│
├── infrastructure/
│ ├── http/
│ │ ├── controllers/
│ │ │ └── SendCredentialsController.ts
│ │ └── routes.ts
│ │
│ ├── mail/
│ │ └── NodemailerAdapter.ts
│ │
│ ├── token/
│ │ └── JwtAdapter.ts
│ │
│ ├── persistence/
│ │ └── typeorm/
│ │ ├── entities/
│ │ │ └── ProjectEntity.ts
│ │ └── repositories/
│ │ └── ProjectRepository.ts
│ │
│ └── templates/
│ └── credential-email.hbs
│
├── config/
│ ├── env.ts
│ └── database.ts
│
├── server.ts
└── app.ts
```

---

## Tecnologias

- Node.js
- Express
- TypeScript
- PostgreSQL
- TypeORM
- JWT
- Nodemailer
- Handlebars

---

## Como usar o microserviço

### Endpoint principal

**POST** `/send-credentials`

Este endpoint gera as credenciais e envia o e-mail ao usuário.

---

### Request Body

```json
{
  "name": "Wallysson Sousa",
  "email": "wallysson@gmail.com.br",
  "projectKey": "Credential Mailer Microservice"
}

```

### Como usar o microserviço

```
| Campo      | Tipo   | Descrição                         |
| ---------- | ------ | --------------------------------- |
| name       | string | Nome do usuário                   |
| email      | string | E-mail do destinatário            |
| projectKey | string | Identificador do projeto chamador |
```

```json
{
  "success": true,
  "message": "Credenciais enviadas com sucesso"
}
```

```json
{
  "success": false,
  "error": "PROJECT_NOT_FOUND"
}
```

#### Possíveis erros:

```
Código	                Descrição
PROJECT_NOT_FOUND	Projeto não registrado
INVALID_EMAIL	E-mail inválido
SMTP_ERROR	Falha no envio do e-mail
INTERNAL_ERROR	Erro interno
```

---

## Criador

Este microserviço foi projetado e desenvolvido por **Wallysson Oliveira**, com foco em:

- Arquitetura Hexagonal aplicada de forma rigorosa
- Microserviços desacoplados e reutilizáveis
- Boas práticas de engenharia de software
- Código limpo, testável e orientado a domínio

O objetivo é fornecer uma base sólida, extensível e profissional para uso em ambientes distribuídos e corporativos.