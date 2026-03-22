export interface DeleteProjectInput {
  id: string;
}

export interface DeleteProjectUseCase {
  execute(input: DeleteProjectInput): Promise<{ success: boolean }>;
}