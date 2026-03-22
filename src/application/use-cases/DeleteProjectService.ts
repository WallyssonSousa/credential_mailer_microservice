import { DeleteProjectUseCase, DeleteProjectInput } from "../../domain/ports/input/DeleteProjectUseCase";
import { ProjectRepositoryPort } from "../../domain/ports/output/ProjectRepositoryPort";
import { ProjectNotFoundError } from "../../domain/errors/ProjectNotFoundError";

export class DeleteProjectService implements DeleteProjectUseCase {
  constructor(
    private readonly projectRepository: ProjectRepositoryPort
  ) {}

  async execute(input: DeleteProjectInput): Promise<{ success: boolean }> {
    const project = await this.projectRepository.findById(input.id);

    if (!project) {
      throw new ProjectNotFoundError(input.id);
    }

    await this.projectRepository.delete(input.id);

    return { success: true };
  }
}