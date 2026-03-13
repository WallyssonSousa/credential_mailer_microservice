import { CreateProjectUseCase, CreateProjectInput } from "../../domain/ports/input/CreateProjectUseCase";
import { ProjectRepositoryPort } from "../../domain/ports/output/ProjectRepositoryPort";
import { Project } from "../../domain/entities/Project";

import { InvalidAdminPaswordError } from "../../domain/errors/InvalidAdminPasswordError";
import { env } from "../../config/env";
import { v4 as uuidv4 } from "uuid";

export class CreateProjectService implements CreateProjectUseCase {
    constructor(
        private readonly projectRepository: ProjectRepositoryPort
    ) {}

    async execute(input: CreateProjectInput): Promise<void> {
        if(input.adminPassword !== env.projectAdminPassword){
            throw new InvalidAdminPaswordError();
        }

        const project = new Project({
            id: uuidv4(),
            name: input.name,
            primaryColor: input.primaryColor,
            logoUrl: input.logoUrl
        });

        await this.projectRepository.save(project);

    }
}