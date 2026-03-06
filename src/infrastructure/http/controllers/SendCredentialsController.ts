import { Request, Response } from "express";
import { SendCredentialsUseCase } from "../../../domain/ports/input/SendCredentialsUseCase";
import { Email } from "../../../domain/value-objects/Email";

export class SendCredentialsController { 
    constructor(
        private readonly sendCredentialsUseCase: SendCredentialsUseCase
    ) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const { name, email, projectId } = req.body;

        await this.sendCredentialsUseCase.execute({
            name, 
            email: Email.create(email), 
            projectId
        });

        return res.status(200).json({ 
            message: "Credenciais enviadas com sucesso!"
        })
    }
}