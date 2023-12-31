"use client";
import React, { useRef, useState } from "react";
import {
  ConfigProvider,
  SignIn,
  ISignIn,
  did,
  TDesign,
  UI_TYPE,
  DIDWalletInfo,
} from "@portkey/did-ui-react";
import { ChainId } from "@portkey/types";
import { sleep } from "@portkey/utils";
import { Store } from "@/utils";
import { Button } from "antd";
import "antd/dist/antd.css";
import "./index.css";

const PIN = "111111";
let CHAIN_ID: ChainId = "AELF";

const myStore = new Store();
ConfigProvider.setGlobalConfig({
  storageMethod: myStore,
  requestDefaults: {
    timeout: 30000,
  },
});

export default function UI() {
  const ref = useRef<ISignIn>();
  const [design, setDesign] = useState<TDesign>();
  const [uiType, setUIType] = useState<UI_TYPE>("Modal");
  const [wallet, setWallet] = useState<DIDWalletInfo>();

  return (
    <div>
      <div id="wrapper"></div>
      <div>
        <h2 className="title">design</h2>
        <Button
          type="primary"
          onClick={async () => {
            setDesign("CryptoDesign");
            await sleep(50);
            ref.current?.setOpen(true);
          }}>
          CryptoDesign
        </Button>
        <Button
          type="primary"
          onClick={async () => {
            setDesign("SocialDesign");
            await sleep(50);
            ref.current?.setOpen(true);
          }}>
          SocialDesign
        </Button>
        <Button
          type="primary"
          onClick={async () => {
            setDesign("Web2Design");
            await sleep(50);
            ref.current?.setOpen(true);
          }}>
          Web2Design
        </Button>
      </div>

      <div>
        <h2 className="title">uiType</h2>
        <Button type="primary" onClick={() => setUIType("Modal")}>
          Modal
        </Button>
        <Button type="primary" onClick={() => setUIType("Full")}>
          Full
        </Button>
      </div>
      <div>
        <h2 className="title">DIDWalletInfo</h2>
        {wallet && (
          <>
            <div className="">WalletInfo:{JSON.stringify(wallet.caInfo)}</div>
            <div>ChainId:{JSON.stringify(wallet.chainId)}</div>
            <Button
              type="primary"
              onClick={async () => {
                // Mock pin: 111111
                const wallet = await did.load(PIN);
                console.log("wallet:", wallet);
                // Mock chainId: 'AELF'
                did.logout({ chainId: CHAIN_ID });
                setWallet(undefined);
              }}>
              logout
            </Button>
          </>
        )}
      </div>

      <SignIn
        ref={ref}
        design={design}
        uiType={uiType}
        getContainer="#wrapper"
        className="sign-in-wrapper"
        termsOfService={"https://portkey.finance/terms-of-service"}
        onFinish={async (res) => {
          console.log(res, "onFinish====");
          CHAIN_ID = res.chainId;
          did.save(PIN, "portkey-demo");
          setWallet(res);
        }}
        onError={(error) => {
          console.log(error, "onError====error");
        }}
        onCancel={() => {
          ref.current?.setOpen(false);
        }}
        onCreatePending={(info) => {
          console.log(info, "onCreatePending====info");
        }}
      />
    </div>
  );
}
