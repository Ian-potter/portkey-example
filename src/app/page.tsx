"use client";
import React, { useEffect, useState } from "react";
import { PortkeyProvider } from "@portkey/did-ui-react";
import "@portkey/did-ui-react/dist/assets/index.css";
import "./index.css";
import UI from "@/page-component/UI";

export default function Home() {
  const [dark, setDark] = useState<boolean>(true);

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [dark]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-auto">
        <h1>@portkey/did-ui-react</h1>
        <PortkeyProvider
          networkType={"TESTNET"}
          theme={dark ? "dark" : "light"}>
          <div
            style={{ background: dark ? "#1E212B" : "#fff" }}
            id={dark ? "dark-root" : undefined}>
            <h2
              className="text-rose-600 text-base mb-10 cursor-pointer title"
              onClick={async () => {
                setDark((v) => !v);
              }}>
              change theme
            </h2>
            <UI />
          </div>
        </PortkeyProvider>
      </div>
    </main>
  );
}
