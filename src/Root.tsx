import "./index.css";
import type { FC } from "react";
import { Composition } from "remotion";
import { guoyanMd001AELaunchComposition } from "./components/guoyanMd001AELaunch";
import { guoyanMd001CineFlowComposition } from "./components/guoyanMd001CineFlow";
import { guoyanMd001DirectorialComposition } from "./components/guoyanMd001Directorial";
import { guoyanMd001DirectorCutComposition } from "./components/guoyanMd001DirectorCut";
import { guoyanMd001ExecutiveReviewComposition } from "./components/guoyanMd001ExecutiveReview";
import { guoyanMd001PromoComposition } from "./components/guoyanMd001Promo";
import { guoyanMd001SilentCinematicComposition } from "./components/guoyanMd001SilentCinematic";
import { harmonyOS6Composition } from "./components/HarmonyOS6";
import { harmonyOS6PulseComposition } from "./components/HarmonyOS6Pulse";
import { harmonyOS6PromoComposition } from "./components/harmonyos6Promo";
import { harmonyOS6CinematicComposition } from "./components/HarmonyOS6Cinematic";
import { HuaweiWatch5Composition } from "./components/HuaweiWatch5/Video";
import { harmonyOS6SixShotsWebComposition } from "./components/HarmonyOS6SixShotsWeb";

import { HarmonyOS6OfficialPromoConfig } from "./components/HarmonyOS6OfficialPromo";

import { harmonyOS6HighEndPromoConfig } from "./components/HarmonyOS6HighEndPromo";

export const RemotionRoot: FC = () => {
  return (
    <>
      <Composition {...harmonyOS6HighEndPromoConfig} />
      <HarmonyOS6OfficialPromoConfig />
      <HuaweiWatch5Composition />
      <Composition {...guoyanMd001AELaunchComposition} />
      <Composition {...guoyanMd001CineFlowComposition} />
      <Composition {...guoyanMd001ExecutiveReviewComposition} />
      <Composition {...guoyanMd001DirectorialComposition} />
      <Composition {...guoyanMd001DirectorCutComposition} />
      <Composition {...guoyanMd001PromoComposition} />
      <Composition {...guoyanMd001SilentCinematicComposition} />
      <Composition {...harmonyOS6Composition} />
      <Composition {...harmonyOS6PulseComposition} />
      <Composition {...harmonyOS6PromoComposition} />
      <Composition {...harmonyOS6CinematicComposition} />
      <Composition {...harmonyOS6SixShotsWebComposition} />
    </>
  );
};
