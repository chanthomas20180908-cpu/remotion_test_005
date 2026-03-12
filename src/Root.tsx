import "./index.css";
import type { FC } from "react";
import { Composition } from "remotion";
import { guoyanMd001AELaunchComposition } from "./components/guoyanMd001AELaunch";
import { guoyanMd001DirectorialComposition } from "./components/guoyanMd001Directorial";
import { guoyanMd001DirectorCutComposition } from "./components/guoyanMd001DirectorCut";
import { guoyanMd001PromoComposition } from "./components/guoyanMd001Promo";
import { guoyanMd001SilentCinematicComposition } from "./components/guoyanMd001SilentCinematic";

export const RemotionRoot: FC = () => {
  return (
    <>
      <Composition {...guoyanMd001AELaunchComposition} />
      <Composition {...guoyanMd001DirectorialComposition} />
      <Composition {...guoyanMd001DirectorCutComposition} />
      <Composition {...guoyanMd001PromoComposition} />
      <Composition {...guoyanMd001SilentCinematicComposition} />
    </>
  );
};
