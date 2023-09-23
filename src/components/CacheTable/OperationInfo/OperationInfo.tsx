import CacheSimulation from "../../../cache_sim/cache";

interface OperationInfoProps {
    op: number;
    adr: number;
    cache: CacheSimulation | null;
    misc: any[];
}

const timeBreakdown = (time: number): string => {
    switch (time) {
        case 30: return "(2c + 28c)";

        case 58: return "(2c + 28c + 28c)";
        
    }
    return "";
}
export const OperationInfo: React.FC<OperationInfoProps> = ({ op, adr, cache, misc }) => {

    return (
        <>
            {!Number.isNaN(op) && !Number.isNaN(adr)? <>
                <h2 className="mb-2 text-lg font-semibold text-gray-900 ">Resultados de la operación {op === 0 ? "load" : "store"}:</h2>
                <h3>@MP</h3>
                <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside ">
                    <li>
                        Dirección: {adr} {'->'} Palabra abs: {cache!.getAbsWord(adr)} {'->'} Byte: {cache!.getAbsByte(adr)}
                    </li>
                    <li>
                        Bloque: {cache!.getBlock(adr)} {'->'} Palabra: {cache!.getWord(adr)}
                    </li>
                </ul>

                <h3>@MC</h3>
                <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside ">
                    <li>
                        {cache?.getMCBlock(adr) !== -1 ? "Bloque: " + cache?.getMCBlock(adr) + " ->" : <></>} Tag: {cache?.getTag(adr)}
                        {cache!.groupSize > 1 && cache!.groupSize < 8 ? " -> Conjunto: " + cache?.getGroup(adr) : <></>}
                    </li>
                    <li>
                        Esta operación será un {cache?.inCache(adr) ?
                            <>
                                <span style={{ color: "green" }}>hit ✔</span>
                            </>
                            :
                            <>
                                <span style={{ color: "red" }}>miss 𐄂</span>
                            </>
                        }
                    </li>
                </ul>

                {/* 
                    Miss/Hit info + execution times     
                */}

                {misc[0] > 0 ? 
                <>
                    <h3> Fallos / Aciertos </h3>
                    <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside ">
                        <li> Miss: {misc[0]}, Hit: {misc[1]} </li>
                        <li> h = {(misc[1] / (misc[0] + misc[1])).toFixed(3)} (tasa de aciertos)</li>
                    </ul>

                    <h3> Tiempo de ejecución </h3>
                    <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside ">
                        <li> La operación ha tardado <span style={{color:"orangered"}}>{cache!.execTime} ciclos {timeBreakdown(cache!.execTime)}</span></li>
                        <li> Tiempo total = {Math.floor(cache!.sumExecTime)} ciclos </li>
                        <li> Media = {(cache!.sumExecTime / (cache!.numberOfExec)).toFixed(3)} ciclos </li>
                    </ul>
                </>
                    :
                    <></>
                }
            </>
                :
                <>
                    <h2 className="mb-2 text-lg font-semibold text-gray-900 ">Elíge una dirección y operación (interactivo)</h2>
                </>
            }
        </>
    );
};