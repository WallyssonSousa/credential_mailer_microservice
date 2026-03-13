import { Project } from "../../entities/Project";

export interface ProjectRepositoryPort {
    findById(id: string): Promise<Project | null>;
    findAll(): Promise<Project[]>;
    save(project: Project): Promise<void>;      
}