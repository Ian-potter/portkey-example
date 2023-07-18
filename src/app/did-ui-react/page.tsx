"use client";
import React, { useEffect, useState } from "react";
import UI from "../../page-component/UI";
import { PortkeyProvider } from "@portkey/did-ui-react";
import "@portkey/did-ui-react/dist/assets/index.css";
import "./index.css";

export default function Page() {
  const [dark, setDark] = useState<boolean>(true);

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div>
      <PortkeyProvider networkType={"TESTNET"} theme={dark ? "dark" : "light"}>
        <div
          style={{ background: dark ? "#1E212B" : "#fff" }}
          id={dark ? "dark-root" : undefined}>
          <h1
            className="text-rose-600 text-base mb-10 cursor-pointer"
            onClick={async () => {
              setDark((v) => !v);
            }}>
            change theme
          </h1>
          <UI />
        </div>
      </PortkeyProvider>
    </div>
  );
}
