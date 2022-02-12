import { SHA256 } from "crypto-js";

interface CalculateHashFunc {
  (): string
}

interface MineFunc {
  (prefix: number): void
}

export interface BlockInterface {
  hash: string,
  previousHash: string,
  data: string,
  timeStamp: bigint,
  nonce: number,
  calculateHash: CalculateHashFunc,
  mine: MineFunc,
}

export interface BlockConfig {
  nonce: number,
  data: string,
  previousHash: string,
  timeStamp: bigint,
}

export class Block implements BlockInterface {
  hash: string;
  data: string;
  nonce: number;
  previousHash: string;
  timeStamp: bigint;

  constructor(config: BlockConfig) {
    this.data = config.data;
    this.nonce = config.nonce || 0;
    this.previousHash = config.previousHash;
    this.timeStamp = config.timeStamp;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.previousHash
      .concat(this.timeStamp.toString())
      .concat(this.nonce.toString())
      .concat(this.data)
    ).toString();
  }

  mine(prefix: number) {
    const prefixString: string = '0'.repeat(prefix);

    while (this.hash.substring(0, prefix) !== prefixString) {
        this.nonce++;
        this.hash = this.calculateHash();

        console.log(`[hash=${this.hash}] Minning block...`, );
    }

    console.log(`[hash=${this.hash}] A new block has been mined! `);
  }
};
