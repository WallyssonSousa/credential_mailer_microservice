import {
  SendCredentialsUseCase,
  SendCredentialsInput
} from '../../domain/ports/input/SendCredentialsUseCase';

import { MailProviderPort } from '../../domain/ports/output/MailProviderPort';
import { TokenProviderPort } from '../../domain/ports/output/TokenProviderPort';
import { ProjectRepositoryPort } from '../../domain/ports/output/ProjectRepositoryPort';

import { ProjectNotFoundError } from '../../domain/errors/ProjectNotFoundError';

export class SendCredentialsService implements SendCredentialsUseCase {
  constructor(
    private readonly projectRepository: ProjectRepositoryPort,
    private readonly tokenProvider: TokenProviderPort,
    private readonly mailProvider: MailProviderPort
  ) {}

  async execute(input: SendCredentialsInput): Promise<void> {
    const project = await this.projectRepository.findById(input.projectId);

    if (!project) {
      throw new ProjectNotFoundError(input.projectId);
    }

    const token = this.tokenProvider.generate({
      email: input.email.getValue(),
      projectId: project.getId(),
    });

    await this.mailProvider.send({
      to: input.email.getValue(),
      subject: `Bem-vindo ao ${project.getName()}`,
      html: this.buildEmailTemplate({
        userName: input.name,
        projectName: project.getName(),
        token,
      }),
    });
  }

  private buildEmailTemplate(data: {
    userName: string;
    projectName: string;
    token: string;
  }): string {
    return `
      <div style="font-family: Arial, sans-serif">
        <h2>Olá, ${data.userName}</h2>
        <p>Seu acesso ao sistema <strong>${data.projectName}</strong> foi criado.</p>
        <p><strong>Senha temporária:</strong> ${data.token}</p>
      </div>
    `;
  }
}