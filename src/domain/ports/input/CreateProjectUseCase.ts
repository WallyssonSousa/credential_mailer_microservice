export interface CreateProjectInput {
    name: string;
    primaryColor: string;
    logoUrl?: string;
    adminPassword: string;
}

export interface CreateProjectUseCase {
    execute(input: CreateProjectInput): Promise<void>;
}