import { Repository } from "typeorm";
import { ProjectRepositoryPort } from "../../../../domain/ports/output/ProjectRepositoryPort";
import { Project } from "../../../../domain/entities/Project";
import { ProjectEntity } from "../entities/ProjectEntity";

export class TypeOrmProjectRepository implements ProjectRepositoryPort {
    constructor(
        private readonly repository: Repository<ProjectEntity>
    ) {}

    async findById(id: string): Promise<Project | null> {
        const entity = await this.repository.findOne({ where: { id } });

        if (!entity) {
            return null;
        }

        return new Project({
            id: entity.id,
            name: entity.name,
            primaryColor: entity.primaryColor,
            logoUrl: entity.logoUrl,
            loginUrl: entity.loginUrl
        });
    }

    async findAll(): Promise<Project[]> {
        const entities = await this.repository.find();

        return entities.map(entity =>
            new Project({
                id: entity.id,
                name: entity.name,
                primaryColor: entity.primaryColor,
                logoUrl: entity.logoUrl,
                loginUrl: entity.loginUrl
            })
        );
    }

    async save(project: Project): Promise<void> {
        const entity = this.repository.create({
            id: project.getId(),
            name: project.getName(),
            primaryColor: project.getPrimaryColor(),
            logoUrl: project.getLogoUrl(),
            loginUrl: project.getLoginUrl()
        });

        await this.repository.save(entity);
    }

    async update(project: Project): Promise<void> {
        await this.repository.update(project.getId(), {
            name: project.getName(),
            primaryColor: project.getPrimaryColor(),
            logoUrl: project.getLogoUrl(),
            loginUrl: project.getLoginUrl()
        });
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}