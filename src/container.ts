import { AppDataSource } from "./infrastructure/persistence/typeorm/data-source";
import { ProjectEntity } from "./infrastructure/persistence/typeorm/entities/ProjectEntity";

import { TypeOrmProjectRepository } from "./infrastructure/persistence/typeorm/repositories/TypeOrmProjectRepository";
import { JwtTokenAdapter } from "./infrastructure/token/JwtTokenAdapter";
import { NodemailerMailAdapter } from "./infrastructure/mail/NodemailerAdapter";

import { SendCredentialsService } from "./application/use-cases/SendCredentialsService";
import { SendCredentialsController } from "./infrastructure/http/controllers/SendCredentialsController";
import { CreateProjectService } from "./application/use-cases/CreateProjectService";
import { CreateProjectController } from "./infrastructure/http/controllers/CreateProjectController";
import { ListProjectsService } from "./application/use-cases/ListProjectsService";
import { ListProjectsController } from "./infrastructure/http/controllers/ListProjectsController";

import { UpdateProjectService } from "./application/use-cases/UpdateProjectService";
import { DeleteProjectService } from "./application/use-cases/DeleteProjectService";

import { UpdateProjectController } from "./infrastructure/http/controllers/UpdateProjectController";
import { DeleteProjectController } from "./infrastructure/http/controllers/DeleteProjectController";

export async function buildSendCredentialsController() {
    const projectRepository = new TypeOrmProjectRepository(
        AppDataSource.getRepository(ProjectEntity)
    );

    const tokenProvider = new JwtTokenAdapter();

    const mailProvider = new NodemailerMailAdapter();

    const service = new SendCredentialsService(
        projectRepository,
        tokenProvider, 
        mailProvider
    );

    return new SendCredentialsController(service);
}

export async function buildCreateProjectController() {
    const projectRepository = new TypeOrmProjectRepository(
        AppDataSource.getRepository(ProjectEntity)
    );

    const service = new CreateProjectService(projectRepository);

    return new CreateProjectController(service);
}

export async function buildListProjectsController(){
    const projectRepository = new TypeOrmProjectRepository(
        AppDataSource.getRepository(ProjectEntity)
    );

    const service = new ListProjectsService(projectRepository);

    return new ListProjectsController(service);
}

export async function buildUpdateProjectController() {
    const projectRepository = new TypeOrmProjectRepository(
        AppDataSource.getRepository(ProjectEntity)
    );

    const service = new UpdateProjectService(projectRepository);

    return new UpdateProjectController(service);
}

export async function buildDeleteProjectController() {
    const projectRepository = new TypeOrmProjectRepository(
        AppDataSource.getRepository(ProjectEntity)
    );

    const service = new DeleteProjectService(projectRepository);

    return new DeleteProjectController(service);
}