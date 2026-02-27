import jwt from 'jsonwebtoken';
import { TokenProviderPort, TokenPayload } from '../../domain/ports/output/TokenProviderPort';
import { env } from '../../config/env';

export class JwtTokenAdapter implements TokenProviderPort{
    generate(payload: TokenPayload): string {
        return jwt.sign(
            {
                email: payload.email,
                projectId: payload.projectId,
            },
            env.jwtSecret,
            {
                expiresIn: '15m',
            }
        );
    }
}