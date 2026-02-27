import { InvalidEmailError } from "../errors/InvalidEmailError";

export class Email {
    private readonly value: string;

    private constructor(email: string){ 
        this.value = email;
    }

    public static create(email: string): Email {
        if(!Email.isValid(email)){
            throw new InvalidEmailError(email);
        }
        return new Email(email.toLowerCase());
    }

    public getValue(): string {
        return this.value;
    }

    private static isValid(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}