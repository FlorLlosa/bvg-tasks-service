import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { timingSafeEqual } from 'crypto';
import type { Request } from 'express';

@Injectable()
export class InternalServiceGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const expectedSecret = this.configService.get<string>(
      'INTERNAL_SERVICE_SECRET',
    );

    if (!expectedSecret) {
      throw new InternalServerErrorException(
        'La credencial interna no está configurada',
      );
    }

    const request = context.switchToHttp().getRequest<Request>();
    const receivedSecret = request.headers['x-internal-service-secret'];

    if (typeof receivedSecret !== 'string') {
      throw new UnauthorizedException('Credencial interna requerida');
    }

    const expected = Buffer.from(expectedSecret, 'utf8');
    const received = Buffer.from(receivedSecret, 'utf8');

    if (
      expected.length !== received.length ||
      !timingSafeEqual(expected, received)
    ) {
      throw new UnauthorizedException('Credencial interna inválida');
    }

    return true;
  }
}
