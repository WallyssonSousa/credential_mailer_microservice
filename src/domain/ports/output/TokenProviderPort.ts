export interface TokenPayload {
    email: string;
    projectId: string;
}

export interface TokenProviderPort {
    generate(payload: TokenPayload): string;
}