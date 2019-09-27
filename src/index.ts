import * as CryptoJS from 'crypto-js';

class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  static calculateBlockHash = (
    index: number,
    previousHash: string,
    data: string,
    timestamp: number
  ): string => CryptoJS.SHA256(index, previousHash, data, timestamp).toString();

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

const genesisBlock: Block = new Block(
  0,
  'gu32t82t49gergeru',
  '',
  'Hello world!',
  571057120569
);
let blockchain: Block[] = [genesisBlock];
const getBlockChain = (): Block[] => blockchain;
const getLatestBlock = (): Block => blockchain[blockchain.length - 1];
const getNewTimestamp = (): number => Math.round(new Date().getTime() / 1000);

export {};
