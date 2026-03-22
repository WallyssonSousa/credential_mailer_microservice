import { Request, Response } from 'express';
import { CreateProjectUseCase } from '../../../domain/ports/input/CreateProjectUseCase';

export class CreateProjectController {
    constructor(
        private readonly createProjectUseCase: CreateProjectUseCase
    ) {}

    async handle(req: Request, res: Response): Promise<Response>{
        const { name, primaryColor, logoUrl, loginUrl, adminPassword } = req.body;

        await this.createProjectUseCase.execute({ 
            name,
            primaryColor,
            logoUrl,
            loginUrl,
            adminPassword, 
        });

        return res.status(201).json({
            message: "Projeto criado com sucesso"
        })
    }
}