import { Request, Response } from "express";
import { DeleteProjectUseCase } from "../../../domain/ports/input/DeleteProjectUseCase";

export class DeleteProjectController {
    constructor(
        private readonly deleteProjectUseCase: DeleteProjectUseCase
    ) { }

    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                message: "Invalid project id"
            });
        }

        const result = await this.deleteProjectUseCase.execute({ id });

        return res.json(result);
    }
}