import { ListProjectsUseCase, ListProjectsOutput } from "../../domain/ports/input/ListProjectsUseCase";
import { ProjectRepositoryPort } from "../../domain/ports/output/ProjectRepositoryPort";

export class ListProjectsService implements ListProjectsUseCase {
    constructor(
        private readonly projectRepository: ProjectRepositoryPort
    ) {}

    async execute(): Promise<ListProjectsOutput[]> {
        const projects = await this.projectRepository.findAll();

        return projects.map(project => ({
            id: project.getId(),
            name: project.getName(),
            primaryColor: project.getPrimaryColor(),
            logoUrl: project.getLogoUrl(),
            loginUrl: project.getLoginUrl()
        }));
    }
}