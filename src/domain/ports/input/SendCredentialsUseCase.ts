import { Email } from "../../value-objects/Email"; 

export interface SendCredentialsInput {
    name: string;
    email: Email;
    projectId: string;
}

export interface SendCredentialsUseCase {
    execute(input: SendCredentialsInput): Promise<{success: boolean}>;
}