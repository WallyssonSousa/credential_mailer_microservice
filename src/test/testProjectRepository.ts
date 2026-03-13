import { AppDataSource } from "../infrastructure/persistence/typeorm/data-source";
import { TypeOrmProjectRepository } from "../infrastructure/persistence/typeorm/repositories/TypeOrmProjectRepository";
import { ProjectEntity } from "../infrastructure/persistence/typeorm/entities/ProjectEntity";

async function test() {

  console.log("Inicializando bancoss");

  await AppDataSource.initialize();

  console.log("Banco conectado");

  const repository = new TypeOrmProjectRepository(
    AppDataSource.getRepository(ProjectEntity)
  );

  const project = await repository.findById(
    "11111111-1111-1111-1111-111111111111"
  );

  if (!project) {
    console.log("Projeto não encontrado");
    return;
  }

  console.log("Projeto encontrado:");
  console.log("ID:", project.getId());
  console.log("Nome:", project.getName());
  console.log("Cor:", project.getPrimaryColor());
  console.log("Logo:", project.getLogoUrl());
}

test();