import { Project } from "../../entities/Project";

export interface ProjectRepositoryPort {
    findById(id: string): Promise<Project | null>;
}