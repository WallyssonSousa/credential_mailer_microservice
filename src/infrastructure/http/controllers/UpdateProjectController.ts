import { Request, Response } from "express";
import { UpdateProjectUseCase } from "../../../domain/ports/input/UpdateProjectUseCase";

export class UpdateProjectController {
  constructor(
    private readonly updateProjectUseCase: UpdateProjectUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const result = await this.updateProjectUseCase.execute({
      id,
      ...req.body
    });

    return res.json(result);
  }
}