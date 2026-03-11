import "./index.css";
import type { FC } from "react";
import { Composition } from "remotion";
import { guoyanMd001PromoComposition } from "./components/guoyanMd001Promo";

export const RemotionRoot: FC = () => {
  return <Composition {...guoyanMd001PromoComposition} />;
};
