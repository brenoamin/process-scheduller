import { ReactElement, useState } from "react";
import { Matrix } from "../Matrix";

export const DiskMatrix = (): ReactElement => {
  const defaultCells: string[] = Array.from({ length: 120 }, () => "|");

  return <Matrix title="Disco" defaultCells={defaultCells} />;
};
