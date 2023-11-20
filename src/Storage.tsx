import { ReactElement, useEffect, useState } from "react";
import "./App.css";
import { DiskMatrix } from "./components/Disk";
import { RAM } from "./components/RAM/RAM";
import Memory from "./storage/Memory";

export type StorageProps = {
  memory: Memory;
  delay: number;
};

export const Storage = ({ memory, delay }: StorageProps): ReactElement => {
  const [memoryUpdate, setMemoryUpdate] = useState(false);

  const handleNextTime = () => {
    memory.nextTime();
    setMemoryUpdate(!memoryUpdate);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextTime();
    }, delay);

    return () => clearInterval(intervalId);
  }, [delay, memoryUpdate, memory]);

  return (
    <div className="memory-section">
      <DiskMatrix memory={memory} />
      <RAM memory={memory} />
    </div>
  );
};
