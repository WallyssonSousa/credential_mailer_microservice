import { DomainError } from "./DomainError";

export class ProjectNotFoundError extends DomainError {
    constructor(projectKey: string){
        super(`O projeto com a chave ${projectKey} não foi encontrado.`);
    }
}