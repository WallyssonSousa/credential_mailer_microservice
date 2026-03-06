import { Repository } from "typeorm";
import { ProjectRepositoryPort } from "../../../../domain/ports/output/ProjectRepositoryPort";
import { Project } from "../../../../domain/entities/Project";
import { ProjectEntity } from "../entities/ProjectEntity";

export class TypeOrmProjectRepository implements ProjectRepositoryPort {
    constructor(
        private readonly repository: Repository<ProjectEntity>
    ) {}

    async findById(id: string): Promise<Project | null> {
        const entity = await this.repository.findOne({ where: {id}});

        if(!entity){ 
            return null;
        }

        return new Project({
            id: entity.id,
            name: entity.name,
            primaryColor: entity.primaryColor,
            logoUrl: entity.logoUrl
        })
    }
}