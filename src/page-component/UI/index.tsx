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
import './index.css';

const PIN = "111111";
let CHAIN_ID: ChainId = "AELF";

const myStore = new Store();
ConfigProvider.setGlobalConfig({
  connectUrl: "https://auth-portkey-test.portkey.finance",
  storageMethod: myStore,
  socketUrl: "https://did-portkey-test.portkey.finance/ca",
  requestDefaults: {
    timeout: 30000,
    baseURL: "/",
  },
  /** By default, reCaptcha's siteKey of portkey is used, if it is a self-built service, please use your own siteKey */
  // reCaptchaConfig: {
  //   siteKey: '',
  // },
  graphQLUrl:
    "https://dapp-portkey-test.portkey.finance/Portkey_DID/PortKeyIndexerCASchema/graphql",
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
        <h2>design</h2>
        <button
          onClick={async () => {
            setDesign("CryptoDesign");
            await sleep(50);
            ref.current?.setOpen(true);
          }}>
          CryptoDesign
        </button>
        <button
          onClick={async () => {
            setDesign("SocialDesign");
            await sleep(50);
            ref.current?.setOpen(true);
          }}>
          SocialDesign
        </button>
        <button
          onClick={async () => {
            setDesign("Web2Design");
            await sleep(50);
            ref.current?.setOpen(true);
          }}>
          Web2Design
        </button>
      </div>

      <div>
        <h2>uiType</h2>
        <button onClick={() => setUIType("Modal")}>Modal</button>
        <button onClick={() => setUIType("Full")}>Full</button>
      </div>
      <div>
        <h2>DIDWalletInfo</h2>
        {wallet && (
          <>
            <div>{JSON.stringify(wallet)}</div>
            <button
              onClick={async () => {
                // Mock pin: 111111
                const wallet = await did.load(PIN);
                console.log("wallet:", wallet);
                // Mock chainId: 'AELF'
                did.logout({ chainId: CHAIN_ID });
              }}>
              logout
            </button>
          </>
        )}
      </div>

      <SignIn
        ref={ref}
        design={design}
        uiType={uiType}
        getContainer="#wrapper"
        isShowScan
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
