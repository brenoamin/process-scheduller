import { ReactElement } from "react";
import { Matrix } from "../Matrix";

export const RAM = (): ReactElement => {
  const defaultCells: string[] = Array.from({ length: 50 }, () => "|");

  return <Matrix title="RAM" defaultCells={defaultCells} />;
};
