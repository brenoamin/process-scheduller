import { ReactElement } from "react";
import { Matrix } from "../Matrix";
import Memory from "../../storage/Memory";

interface RAMMatrixProps {
  memory: Memory;
}

export const RAM = ({ memory }: RAMMatrixProps): ReactElement => {
  const defaultCells: (number | null)[] = memory.getRam();

  return <Matrix title="RAM" defaultCells={defaultCells} />;
};
