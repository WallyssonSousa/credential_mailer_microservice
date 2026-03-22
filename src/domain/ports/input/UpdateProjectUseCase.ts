export interface UpdateProjectInput {
  id: string;
  name?: string;
  primaryColor?: string;
  logoUrl?: string;
  loginUrl?: string;
}

export interface UpdateProjectUseCase {
  execute(input: UpdateProjectInput): Promise<{ success: boolean }>;
}