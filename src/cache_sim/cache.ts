export default class CacheSimulation {
    blocksInCache: number = 8;
    wordSize: number;
    blockSize: number;
    groupSize: number;
    replPolicy: number;
    mpCap: number;

    content: any[][] = [];

    sumExecTime: number = 0; 
    execTime: number = 0;
    numberOfExec: number = 0;

    currentBlock: number = 0;

    public constructor(wordSize: number, blockSize: number, groupSize: number, replPolicy: number, mpCap: number) {
        this.wordSize = wordSize;
        this.blockSize = blockSize;
        this.groupSize = groupSize;
        this.replPolicy = replPolicy;
        this.mpCap = mpCap;

        for (let i = 0; i < 3; i++) {
            this.content[i] = new Array(8).fill(i < 4 ? 0 : -1);
        }

        this.content[3] = new Array(8).fill(0);
        for (let i = 4; i < 5; i++) {
            this.content[i] = new Array(8).fill("---");
        }

    }
    
    /**
     * 
     * @param adr byte address of principal memory
     * @param op if 0 it is a load, store otherwise.
     * @returns true if block was in cache, false otherwise.
     */
    public execute(adr: number, op: number): boolean {

        this.numberOfExec++;

        const absBlock = "b" + this.getBlock(adr);
        const tag = this.getTag(adr);
        const block: number = this.getMCBlock(adr);

        if (this.inCache(adr, absBlock, tag, block)) {
            this.execTime = 2
            this.sumExecTime += this.execTime;
            if (op === 1) this.content[1][this.currentBlock] = 1;
            if (this.replPolicy === 1) { // LRU case
                this.updatePolicyRef();
                this.content[3][this.currentBlock] = 0;
            }
            return true;
        }

        this.execTime = 30;

        // Modified block has to move to @MP
        if (this.content[1][block] === 1 && this.content[4][block] !== absBlock) {
            this.execTime = 58;
        }

        // LRU and FIFO update on miss
        if (this.groupSize === 8) this.updatePolicyRef();
        else if (this.groupSize === 2 || this.groupSize === 4) this.updatePolicyRef(this.getGroup(adr));

        this.content[0][block] = 1
        this.content[1][block] = op;
        this.content[2][block] = tag;
        this.content[3][block] = 0;
        this.content[4][block] = absBlock;

        this.currentBlock = block;

        
        this.sumExecTime += this.execTime;

        return false;

    }

    public inCache(adr: number, absBlock?: string, tag?: number, block?: number): boolean {
        tag ??= this.getTag(adr);
        absBlock ??= "b" + this.getBlock(adr);

        if (this.groupSize === 1) {     // Memoria Cache Directa
            block ??= this.getMCBlock(adr);

            if (this.content[0][block] === 1 && this.content[4][block] === absBlock && this.content[2][block] === tag) {
                this.currentBlock = block;
                return true;
            }
        } else if (this.groupSize === 8) {      // Memoria Cache Totalmente Asociativa
            for (let i = 0; i < 8; i++) {
                if (this.content[0][i] === 1 && this.content[4][i] === absBlock && this.content[2][i] === tag) {
                    this.currentBlock = i;
                    return true;
                }
            }
            return false;
        } 

        // Memoria Cache Asociativa por Conjuntos
        let start = this.getGroup(adr) * this.groupSize;
        for(let i = start; i < start + this.groupSize; i++) {
            if (this.content[0][i] === 1 && this.content[4][i] === absBlock && this.content[2][i] === tag) {
                this.currentBlock = i;
                return true;
            }
        }
        return false;
        
    }

    public getAbsWord(adr: number): number {
        return Math.floor(adr/this.wordSize);
    }

    public getAbsByte(adr: number): number {
        return adr%this.wordSize;
    }

    public getBlock(adr: number): number {
        return Math.floor(adr/(this.blockSize));
    } 

    public getWord(adr: number): number {
        return this.getAbsWord(adr) % this.wordSize;
    }

    public getTag(adr: number): number {
        if (this.groupSize === 8) return this.getBlock(adr);
        else if (this.groupSize === 1) return Math.floor(this.getBlock(adr) / this.blocksInCache);
        return Math.floor(this.getBlock(adr) / this.groupSize);
    }

    public getMCBlock(adr: number): number {
        if (this.groupSize === 1) return this.getBlock(adr) % this.blocksInCache;
        if (this.groupSize === 8) {
            return this.getSlot();
        } else {
            return this.getSlot(this.getGroup(adr));
        }
    }

    public getGroup(adr: number): number {
        if (this.groupSize === 1 || this.groupSize === 8) return -1
        return this.getBlock(adr) % (8/this.groupSize);
    }

    /**
     * 
     * @param group 
     * @returns index of the LRU or last element in group
     */
    private getSlot(group?: number): number {
        group ??= 0;
        let start = (group * this.groupSize);
        for (let i = start; i < start+this.groupSize; i++) {
            if (this.content[0][i] === 0) return i;
        }
        return this.getReplaceSlot(start);
        
    }

    private getReplaceSlot(start: number): number {
        let max: number = -1;
        let maxIndex: number = 0;

        for (let i = start; i < start+this.groupSize; i++) {
            if (this.content[3][i] > max) {
                max = this.content[3][i]
                maxIndex = i;
            } 
        }
        return maxIndex;
    }

    private updatePolicyRef(group?: number): void {
        group ??= 0;
        let start = (group * this.groupSize);
        for (let i = start; i < start+this.groupSize; i++) {
            if(this.content[0][i] === 1 && this.content[3][i] < this.groupSize-1) this.content[3][i]++;
        }
        
    }

}