import { Block, BlockConfig } from "./block";

interface GetLatestBlockFunc {
  (): Block
}

interface AddNewBlockFunc {
  (block: Block): void
}

interface CheckValidityFunc {
  (): boolean
}

interface BlockchainInterface {
  blockPrefix: number,
  chain: Block[],
  getLatestBlock: GetLatestBlockFunc,
  addNewBlock: AddNewBlockFunc,
  checkValidity: CheckValidityFunc,
}

export class Blockchain implements BlockchainInterface {
  blockPrefix: number;
  chain: Block[];

  constructor(blockPrefix: number = 4, genesisBlockConfig?: BlockConfig) {
    this.blockPrefix = blockPrefix;
    const genesisBlock = new Block(
      genesisBlockConfig || {
        data: 'Genesis Block',
        nonce: 0,
        previousHash: '',
        timeStamp: BigInt(Date.now()),
      }
    );
    this.chain = [genesisBlock];
  }

  getLatestBlock() {
    const lastIndex = this.chain.length - 1;
    return this.chain[lastIndex];
  }

  addNewBlock(newBlock: Block) {
    const latestBlock: Block = this.getLatestBlock();
    newBlock.previousHash = latestBlock.hash;
    newBlock.mine(this.blockPrefix);
    this.chain.push(newBlock);

    if (this.checkValidity()) {
      console.log(`[hash=${newBlock.hash}] Valid block.`);
    }
  }

  checkValidity() {
    let valid = false;

    for(let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const nextBlock= this.chain[i-1];

      if(currentBlock.hash !== currentBlock.calculateHash()) {
          valid = false;
      }

      if(currentBlock.previousHash !== nextBlock.hash) {
        valid = false;
      }
      valid = true;
    }

    return valid;
  }
}
