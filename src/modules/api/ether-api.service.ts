import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import FactoryArtifact from '@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json';
import PoolArtifact from '@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json';

@Injectable()
export class EtherApiService {
  private readonly factoryAddress =
    '0x1F98431c8aD98523631AE4a59f267346ea31F984';
  private readonly provider: ethers.JsonRpcProvider;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(
      `https://mainnet.infura.io/v3/${process.env.ETHER_API_KEY}`,
    );
  }

  public getProvider(): ethers.JsonRpcProvider {
    return this.provider;
  }

  public getFactoryContract(): ethers.Contract {
    return new ethers.Contract(
      this.factoryAddress,
      FactoryArtifact.abi,
      this.provider,
    );
  }

  public getPoolContract(poolAddress: string): ethers.Contract {
    return new ethers.Contract(poolAddress, PoolArtifact.abi, this.provider);
  }
}
