import { Injectable } from '@nestjs/common';
import { PrismaService } from './../../../database/prisma.service';

@Injectable()
export class CarteiraRepository {
  constructor(private prisma: PrismaService) {}
}
