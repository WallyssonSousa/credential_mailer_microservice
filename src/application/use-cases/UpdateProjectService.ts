import { UpdateProjectUseCase, UpdateProjectInput } from "../../domain/ports/input/UpdateProjectUseCase";
import { ProjectRepositoryPort } from "../../domain/ports/output/ProjectRepositoryPort";
import { ProjectNotFoundError } from "../../domain/errors/ProjectNotFoundError";

export class UpdateProjectService implements UpdateProjectUseCase {
  constructor(
    private readonly projectRepository: ProjectRepositoryPort
  ) {}

  async execute(input: UpdateProjectInput): Promise<{ success: boolean }> {
    const project = await this.projectRepository.findById(input.id);

    if (!project) {
      throw new ProjectNotFoundError(input.id);
    }

    if (input.name) project.setName(input.name);
    if (input.primaryColor) project.setPrimaryColor(input.primaryColor);
    if (input.logoUrl) project.setLogoUrl(input.logoUrl);
    if (input.loginUrl) project.setLoginUrl(input.loginUrl);

    await this.projectRepository.update(project);

    return { success: true };
  }
}