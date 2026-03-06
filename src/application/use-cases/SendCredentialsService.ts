import {
  SendCredentialsUseCase,
  SendCredentialsInput
} from '../../domain/ports/input/SendCredentialsUseCase';

import { MailProviderPort } from '../../domain/ports/output/MailProviderPort';
import { TokenProviderPort } from '../../domain/ports/output/TokenProviderPort';
import { ProjectRepositoryPort } from '../../domain/ports/output/ProjectRepositoryPort';

import { buildCredentialsEmailTemplate } from '../../infrastructure/mail/templates/CredentialsEmailTemplate';

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
    html: buildCredentialsEmailTemplate({
      userName: input.name,
      projectName: project.getName(),
      token,
      primaryColor: project.getPrimaryColor(),
      logoUrl: project.getLogoUrl(),
    }),
  });
  }

}