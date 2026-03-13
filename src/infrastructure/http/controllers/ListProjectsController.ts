import { Request, Response } from "express";
import { ListProjectsUseCase } from "../../../domain/ports/input/ListProjectsUseCase";

export class ListProjectsController { 
    constructor(
        private readonly listProjectsUseCase: ListProjectsUseCase
    ) {}

    async handle(req: Request, res: Response): Promise<Response>{
        const projects = await this.listProjectsUseCase.execute();

        return res.json(projects);
    }
}