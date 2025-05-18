import { Injectable } from '@nestjs/common';
import { TokenDetailsDto } from './dto/token-details.dto';
import { Token } from './token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(Token)
    private readonly tokensRepository: Repository<Token>,
  ) {}

  public async saveTokens(tokens: TokenDetailsDto[]): Promise<void> {
    const tokenEntities = this.tokensRepository.create(
      tokens.map((token) => ({
        id: token.id,
        symbol: token.symbol,
        decimals: token.decimals,
        derivedETH: token.derivedETH,
        totalSupply: token.totalSupply,
      })),
    );

    const uniqueTokenEntities = tokenEntities.filter(
      (token, index, self) =>
        index === self.findIndex((t) => t.id === token.id),
    );

    await this.tokensRepository.upsert(uniqueTokenEntities, {
      upsertType: 'on-duplicate-key-update',
      skipUpdateIfNoValuesChanged: true,
      conflictPaths: ['id'],
    });
  }
}
