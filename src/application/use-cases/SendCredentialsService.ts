import {
  SendCredentialsUseCase,
  SendCredentialsInput
} from '../../domain/ports/input/SendCredentialsUseCase';

import { MailProviderPort } from '../../domain/ports/output/MailProviderPort';
import { TokenProviderPort } from '../../domain/ports/output/TokenProviderPort';
import { ProjectRepositoryPort } from '../../domain/ports/output/ProjectRepositoryPort';

import { buildCredentialsEmailTemplate } from '../../infrastructure/mail/templates/CredentialsEmailTemplate';

import { ProjectNotFoundError } from '../../domain/errors/ProjectNotFoundError';

import { generateTemporaryPassword } from "../utils/generateTemporaryPassword";

export class SendCredentialsService implements SendCredentialsUseCase {
  constructor(
    private readonly projectRepository: ProjectRepositoryPort,
    private readonly tokenProvider: TokenProviderPort,
    private readonly mailProvider: MailProviderPort
  ) {}

  async execute(input: SendCredentialsInput): Promise<{ success: boolean }> {
    const project = await this.projectRepository.findById(input.projectId);
    if (!project) throw new ProjectNotFoundError(input.projectId);

    const email = input.email.getValue();
    const projectName = project.getName();

    const token = this.tokenProvider.generate({
      email,
      projectId: project.getId(),
    });

    const loginLink = `${project.getLoginUrl()}?token=${token}`;

    await this.mailProvider.send({
      to: email,
      subject: `Bem-vindo ao ${projectName}`,
      html: buildCredentialsEmailTemplate({
        userName: input.name,
        projectName,
        token: input.tempPassword,
        primaryColor: project.getPrimaryColor(),
        logoUrl: project.getLogoUrl(),
        loginUrl: loginLink,
      }),
    });

    return { success: true };
}
}