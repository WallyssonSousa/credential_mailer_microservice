import { DomainError } from "./DomainError";

export class InvalidEmailError extends DomainError {
    constructor(email: string){
        super(`O email ${email} é inválido.`);
    }
}