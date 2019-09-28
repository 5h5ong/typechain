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
  ): string => {
    const tobeUsedHash = `${index}${previousHash}${data}${timestamp}`;
    const hash = CryptoJS.SHA256(tobeUsedHash);
    return hash.toString();
  };
  static validateStructure = (block: Block): boolean =>
    typeof block.index === 'number' &&
    typeof block.hash === 'string' &&
    typeof block.previousHash === 'string' &&
    typeof block.data === 'string' &&
    typeof block.timestamp === 'number';

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
const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index + 1;
  const newTimestamp: number = getNewTimestamp();
  const newHash = Block.calculateBlockHash(
    newIndex,
    previousBlock.hash,
    data,
    newTimestamp
  );
  const newBlock = new Block(
    newIndex,
    newHash,
    previousBlock.hash,
    data,
    newTimestamp
  );
  addBlock(newBlock);
  return newBlock;
};
const getHashForBlock = (block: Block): string =>
  Block.calculateBlockHash(
    block.index,
    block.previousHash,
    block.data,
    block.timestamp
  );
const isBlockValid = (cadidateBlock: Block, previousBlock: Block): boolean => {
  if (!Block.validateStructure(cadidateBlock)) {
    console.error(`validate error`);
    return false;
  } else if (previousBlock.index + 1 !== cadidateBlock.index) {
    return false;
  } else if (previousBlock.hash !== cadidateBlock.previousHash) {
    return false;
  } else if (getHashForBlock(cadidateBlock) !== cadidateBlock.hash) {
    return false;
  } else return true;
};
const addBlock = (cadidateBlock: Block): void => {
  if (isBlockValid(cadidateBlock, getLatestBlock())) {
    blockchain.push(cadidateBlock);
  }
};

createNewBlock('나는 첫번째 블럭이야');
createNewBlock('나는 두번째 블럭이야');
createNewBlock('나는 세번째 블럭이야');
createNewBlock('나는 네번째 블럭이야');
createNewBlock('나는 다섯번째 블럭이야');
createNewBlock(
  'typescript is most beautiful in this world. That thing is saved my life!!'
);

console.log(getBlockChain());

export {};
