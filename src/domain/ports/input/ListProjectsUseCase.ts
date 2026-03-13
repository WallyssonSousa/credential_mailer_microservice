export interface ListProjectsOutput {
    id: string;
    name: string;
    primaryColor: string;
    logoUrl?: string;
}

export interface ListProjectsUseCase{
    execute(): Promise<ListProjectsOutput[]>;
}