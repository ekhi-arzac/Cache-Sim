import CacheSimulation from "../../../cache_sim/cache";

interface OperationInfoProps {
    op: number;
    adr: number;
    cache: CacheSimulation | null;
  }
  

export const OperationInfo: React.FC<OperationInfoProps>  = ({op, adr, cache}) => {
    return (
        <>
            {!Number.isNaN(op) ? <>
            <h2 className="mb-2 text-lg font-semibold text-gray-900 ">Resultados de la operación {op === 0 ? "load" : "store"}:</h2>
            <h3>@MP</h3>
            <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                <li>
                Dirección: {adr} {'->'} Palabra abs: {cache!.getAbsWord(adr)} {'->'} Byte: {cache!.getAbsByte(adr)}
                </li>
                <li>
                    Bloque: {cache!.getBlock(adr)} {'->'} Palabra: {cache!.getWord(adr)}
                </li>
            </ul>

            <h3>@MC</h3>
            <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                <li>
                
                </li>
                <li>
                </li>
            </ul>
            </>
            :
            <>
            <h2 className="mb-2 text-lg font-semibold text-gray-900 ">Elíge una dirección y operación (interactivo)</h2>
            </>
            }
        </>
    );
};