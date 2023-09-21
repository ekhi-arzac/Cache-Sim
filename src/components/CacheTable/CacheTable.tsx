import { useState } from "react";
import CacheSimulation from "../../cache_sim/cache";
import { Button } from "../Button/Button";
import { InputNumber } from "../InputNumber/InputNumber";
import { Select } from "../Select/Select";
import { OperationInfo } from "./OperationInfo/OperationInfo";
import { Option } from "../../interfaces";


const operationOptions: Option[] = [
  {
    label: "ld (leer)",
    value: 0
  },
  {
    label: "st (escribir)",
    value: 1
  },
];

interface CacheTableProps {
  cache: CacheSimulation | null;
}




export const CacheTable: React.FC<CacheTableProps> = ({ cache }) => {

  const [address, setAddress] = useState<number | null>(null);
  const [operation, setOperation] = useState<Option | null>(null);
  const [isInfo, setInfo] = useState<boolean>(false);

  const compute = () => {
    let areNull: boolean = [address, operation].some(x => x == null);
    if (areNull) {
      alert("Por favor, introduzca todos los parametros.");
      return;
    } else if (!isInfo) setInfo(true);
    
  }

  const properAddress = (adr: number): number => {
    if (adr >= 0 && adr < cache!.mpCap) return adr;
    else if (adr < 0) return 0;
    return cache!.mpCap - 1 ?? 0;
  }
  return (
    <>
      <div className="flex justify-center items-center h-40 relative z-10">
        <div className="flex flex-col m-0 space-x-2.5">
          <p className="mb-1.5 pl-3">Dirección de memoria</p>
          <InputNumber
            placeholder={"0-" + (cache!.mpCap - 1)}
            value={address}
            onChange={(adr: number) => setAddress(properAddress(adr))}
          />
        </div>
        <div className="flex flex-col m-0 space-x-2.5">
          <p className="mb-1.5 pl-3">Operación</p>
          <Select
            placeholder='----'
            selected={operation}
            options={operationOptions}
            onChange={(selection: Option) => setOperation(selection)}
          />
        </div>
        <div className="flex flex-col m-0 space-x-2.5">
          <span className="mb-1.5 pl-3 pt-6"></span>
          <Button
            text="Fijar (siguiente)"
            onClick={compute}
            color="yellow"
          />
        </div>
      </div>
      {/* The cache simulation */}
      <div className="relative z-0 flex w-full">
        <div className="w-1/2 pl-6">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-3 py-3">Ocupado</th>
                <th scope="col" className="px-3 py-3">Modificado</th>
                <th scope="col" className="px-3 py-3">Tag</th>
                <th scope="col" className="px-3 py-3">Ref. de política</th>
                <th scope="col" className="px-3 py-3">Bloque</th>
              </tr>
            </thead>
            <tbody>
              {cache?.content[0].map((_, rowIndex) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    {cache?.content.map(column => {
                      return (
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {column[rowIndex]}
                        </th>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      
          <div className="w-1/2 pl-6">
            <OperationInfo
              op={(Number(operation?.value) ?? -1)}
              adr={Number(address) ?? 0}
              cache={cache}
            />
          </div>

      </div>
    </>
  );


}