import { useState } from "react";
import { Select } from "./Select/Select";
import { Option } from '../interfaces';
import { Button } from "./Button/Button";
import { CacheTable } from "./CacheTable/CacheTable";
import CacheSimulation from "../cache_sim/cache";
import styles from './MainApp.module.css';
import { Presentation } from "./Presentation/Presentation";

const blocksizeOptions: Option[] = [
    {
        label: "32 bytes",
        value: 32
    },
    {
        label: "64 bytes",
        value: 64
    },
];

const wordsizeOptions: Option[] = [
    {
        label: "4 bytes",
        value: 4
    },
    {
        label: "8 bytes",
        value: 8
    },
];

const groupsizeOptions: Option[] = [
    {
        label: "1 (directa)",
        value: 1
    },
    {
        label: "2 (asociativa/conj.)",
        value: 2
    },
    {
        label: "4 (asociativa/conj.)",
        value: 4
    },
    {
        label: "8 (tot. asociativa)",
        value: 8
    },
];

const replacementPolicyOptions: Option[] = [
    {
        label: "FIFO",
        value: 0
    },
    {
        label: "LRU",
        value: 1
    },
];


const mpCapacity: number = 65536;


export const MainApp = () => {
    const [blocksize, setBlocksize] = useState<Option | null>(null);
    const [wordsize, setWordsize] = useState<Option | null>(null);
    const [groupsize, setGroupsize] = useState<Option | null>(null);
    const [replPolicy, setReplPolicy] = useState<Option | null>(null);


    const [input, setInput] = useState<boolean>(true);
    const [cache, setCache] = useState<CacheSimulation | null>(null);
    const [animation, setAnimation] = useState<boolean>(false);

    const checkAndSend = () => {
        let areNull: boolean = [blocksize, wordsize, groupsize, replPolicy].some(x => x == null);

 

        if (areNull) {
            alert("Por favor, introduzca todos los parametros.");
            return;
        }
        setAnimation(true);

        setTimeout(function(){ 
            setInput(false);
        }, 250); 
        setCache(new CacheSimulation(Number(wordsize!.value), Number(blocksize!.value), Number(groupsize!.value), Number(replPolicy!.value), mpCapacity));
    }

    return (
        <>
        <div className={(animation ? styles["fade-exit-active"] : undefined)}>
            {input ? 
                <div className={styles['main-app-component']}>
                    <Presentation />
                    <div className="flex justify-center items-center h-40 relative z-10">
                        <div className="flex flex-col m-0 space-x-2.5">
                            <p className="mb-1.5 pl-3">Tamaño de palabra</p>
                            <Select
                                placeholder='----'
                                selected={wordsize}
                                options={wordsizeOptions}
                                onChange={(selection: Option) => setWordsize(selection)}

                            />
                        </div>

                        <div className="flex flex-col m-0 space-x-2.5">
                            <p className="mb-1.5 pl-3">Tamaño de bloque</p>
                            <Select
                                placeholder='----'
                                selected={blocksize}
                                options={blocksizeOptions}
                                onChange={(selection: Option) => setBlocksize(selection)}

                            />
                        </div>

                        <div className="flex flex-col m-0 space-x-2.5">
                            <p className="mb-1.5 pl-3">Tamaño de conjunto</p>
                            <Select
                                placeholder='----'
                                selected={groupsize}
                                options={groupsizeOptions}
                                onChange={(selection: Option) => setGroupsize(selection)}

                            />
                        </div>

                        <div className="flex flex-col m-0 space-x-2.5">
                            <p className="mb-1.5 pl-3">Política de reemplazo</p>
                            <Select
                                placeholder='----'
                                selected={replPolicy}
                                options={replacementPolicyOptions}
                                onChange={(selection: Option) => setReplPolicy(selection)}

                            />
                        </div>

                        <div className="flex flex-col m-0 space-x-2.5">
                            <span className="mb-1.5 pl-3 pt-6"></span>
                            <Button
                                text="Empezar! (click)"
                                onClick={checkAndSend}
                            />
                        </div>
                    </div>
                </div>
                : null}
             </div>

             <div className={(!animation ? styles["fade-enter"] : styles["fade-enter-active"])}>
    {!input ? <CacheTable cache={cache} /> : null}
</div>
        </>


    );

}
