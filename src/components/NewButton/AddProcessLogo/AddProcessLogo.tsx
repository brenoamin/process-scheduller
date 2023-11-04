import { ReactElement } from "react";


export const AddProcessLogo = (): ReactElement => {
  return (
    <div style={{ display: "flex" }}>
      <svg
        fill= "#07074d"
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
      >
        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
      </svg>
    </div>
  );
};
