import { DomainError } from "./DomainError";

export class InvalidAdminPaswordError extends DomainError {
    constructor() {
        super("Senha de administrador inválida");
    }
}