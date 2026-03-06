import { AppDataSource } from "./infrastructure/persistence/typeorm/data-source";
import { ProjectEntity } from "./infrastructure/persistence/typeorm/entities/ProjectEntity";

import { TypeOrmProjectRepository } from "./infrastructure/persistence/typeorm/repositories/TypeOrmProjectRepository";
import { JwtTokenAdapter } from "./infrastructure/token/JwtTokenAdapter";
import { NodemailerMailAdapter } from "./infrastructure/mail/NodemailerAdapter";

import { SendCredentialsService } from "./application/use-cases/SendCredentialsService";
import { SendCredentialsController } from "./infrastructure/http/controllers/SendCredentialsController";

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