import { ReactElement } from "react";
import { Matrix } from "../Matrix";
import Memory from "../../storage/Memory";

interface DiskMatrixProps {
  memory: Memory;
}

export const DiskMatrix = ({ memory }: DiskMatrixProps): ReactElement => {
  const defaultCells: (number | null)[] = memory.getDisk();

  return <Matrix title="Disco" defaultCells={defaultCells} />;
};
