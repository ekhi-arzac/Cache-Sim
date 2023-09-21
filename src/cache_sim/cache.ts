export default class CacheSimulation {
    wordSize!: number;
    blockSize!: number;
    groupSize!: number;
    replPolicy!: string;
    content: number[][] = [];
    mpCap!: number;

    bitPerWord: number;
    bitPerByte: number;
    constructor(wordSize: number, blockSize: number, groupSize: number, replPolicy: number, mpCap: number) {

        Object.assign(this, { wordSize, blockSize, groupSize, replPolicy, mpCap});

        for (let i = 0; i < 3; i++) {
            this.content[i] = new Array(8).fill(i < 4 ? 0 : -1);
        }

        this.content[3] = new Array(8).fill(0);
        for (let i = 4; i < 5; i++) {
            this.content[i] = new Array(8).fill("---");
        }

        this.bitPerWord = Math.floor(Math.log2(blockSize/wordSize)); 
        this.bitPerByte = Math.floor(Math.log2(blockSize) - this.bitPerWord);

    }

    load(adr: number): boolean {
        if (this.inCache(adr)) {
            return true;
        }

        return false;
    }

    store(adr: number): boolean {
        if (this.inCache(adr)) {
            return true;
        }
        // content[][] = "b"+block+"w";
        return false;
    }

    private inCache(adr: number): boolean {
        return false;
    }

    private replace(block: number) {

    }

    getAbsWord(adr: number): number {
        return Math.floor(adr/Math.pow(2, this.bitPerByte));
    }

    getAbsByte(adr: number): number {
        return adr%Math.pow(2, this.bitPerByte);
    }

    getBlock(adr: number): number {
        return Math.floor(this.getAbsWord(adr)/Math.pow(2, this.bitPerWord));
    } 

    getWord(adr: number): number {
        return adr % (Math.pow(2, this.bitPerWord));
    }

    getTag(adr: number): number {
        if (this.groupSize === 8) return this.getBlock(adr);
        else if (this.groupSize == 1) return Math.floor(this.getBlock(adr)/(2048/this.blockSize));
        return 0;
    }

}