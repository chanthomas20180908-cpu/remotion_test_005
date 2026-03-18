import "./index.css";
import type { FC } from "react";
import { Composition } from "remotion";
import { guoyanMd001AELaunchComposition } from "./components/guoyanMd001AELaunch";
import { guoyanMd001DirectorialComposition } from "./components/guoyanMd001Directorial";
import { guoyanMd001DirectorCutComposition } from "./components/guoyanMd001DirectorCut";
import { guoyanMd001PromoComposition } from "./components/guoyanMd001Promo";
import { guoyanMd001SilentCinematicComposition } from "./components/guoyanMd001SilentCinematic";
import { epsonWideBannerComposition } from "./components/epsonWideBanner";
import { epsonBannerComposition } from "./components/EpsonBanner";
import { harmonyOS6Composition } from "./components/HarmonyOS6";
import { harmonyOS6GridDrivenComposition } from "./components/HarmonyOS6GridDriven";
import { harmonyOS6OfficialGridDrivenComposition } from "./components/HarmonyOS6OfficialGridDriven";
import { epsonWideBannerV2Composition } from "./components/epsonWideBannerV2";
import { harmonyos6SixShotsComposition } from "./components/harmonyos6SixShots";
import { guoyanMd001Template001Wide20sComposition } from "./components/guoyanMd001Template001Wide20s";
import { mvpHarmonyOS6Composition } from "./mvpVideo";
import { templateTest001WideComposition } from "./components/templateTest001Wide";

export const RemotionRoot: FC = () => {
  return (
    <>
      <Composition {...guoyanMd001AELaunchComposition} />
      <Composition {...guoyanMd001DirectorialComposition} />
      <Composition {...guoyanMd001DirectorCutComposition} />
      <Composition {...guoyanMd001PromoComposition} />
      <Composition {...guoyanMd001SilentCinematicComposition} />
      <Composition {...epsonWideBannerComposition} />
      <Composition {...epsonWideBannerV2Composition} />
      <Composition {...epsonBannerComposition} />
      <Composition {...harmonyOS6Composition} />
      <Composition {...harmonyOS6GridDrivenComposition} />
      <Composition {...harmonyOS6OfficialGridDrivenComposition} />
      <Composition {...harmonyos6SixShotsComposition} />
      <Composition {...mvpHarmonyOS6Composition} />
      <Composition {...guoyanMd001Template001Wide20sComposition} />
      <Composition {...templateTest001WideComposition} />
    </>
  );
};
