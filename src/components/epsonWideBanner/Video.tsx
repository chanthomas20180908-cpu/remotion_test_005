import React, { useMemo } from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import {
  EPSON_SCENE_STARTS_IN_FRAMES,
  EPSON_WIDE_BANNER,
} from "./video-constants";
import { ColorFieldScene } from "./scenes/ColorFieldScene";
import { ImageScene } from "./scenes/ImageScene";
import { GuideMotif } from "./components/GuideMotif";
import { StageBackground } from "./components/StageBackground";
import {
  epson163320,
  epson163325,
  epson163329,
  epson163335,
  epsonThemeSwatch,
} from "./assetsManifest";

export const EpsonWideBannerVideo: React.FC = () => {
  /**
   * Skill usage report (embedded as code comment per delivery constraints)
   * - visual-hierarchy-refactoring: 固定安全区(10%) + 12栏逻辑 → 左38%信息/右62%窗体
   * - typography-system: 极端字号对比（title 72-78 / micro 14 / sub 18）+ 字距约束
   * - motion-graphic-director: "Precision Line" 母题跨场（guideX）+ 几何刀线转场
   * - design-motion-principles: 禁止硬切/整句淡入 → 只用 clip-path wipe + masked reveal
   */
  const frame = useCurrentFrame();

  const guideX = useMemo((): number => {
    // 母题导视线：全片连续存在（跨场继承），并且与每次转场切口方向一致。
    // 这里用一个低频、确定性的轨迹：整体缓慢右移 + 轻微呼吸。
    const t01 = frame / EPSON_WIDE_BANNER.totalDurationInFrames;
    const contentW = EPSON_WIDE_BANNER.width - EPSON_WIDE_BANNER.safe.x * 2;
    const leftW = contentW * EPSON_WIDE_BANNER.layout.leftRatio;

    // 贴着“舞台分割线”附近，让切口更像模板里的镜头刀线。
    const base = EPSON_WIDE_BANNER.safe.x + leftW - 24;
    const travel = contentW * 0.04 * t01;
    const breathe = Math.sin(frame * 0.03) * 10;
    return base + travel + breathe;
  }, [frame]);

  return (
    <AbsoluteFill>
      <StageBackground accentStrength={0.55} />

      <GuideMotif guideX={guideX} />

      <Sequence
        from={EPSON_SCENE_STARTS_IN_FRAMES[0]}
        durationInFrames={EPSON_WIDE_BANNER.sceneDurationsInFrames[0]}
      >
        <ColorFieldScene
          imageSrc={epsonThemeSwatch}
          guideX={guideX}
          globalFrame={frame}
          isFirst
          durationInFrames={EPSON_WIDE_BANNER.sceneDurationsInFrames[0]}
          enableExit
        />
      </Sequence>

      <Sequence
        from={EPSON_SCENE_STARTS_IN_FRAMES[1]}
        durationInFrames={EPSON_WIDE_BANNER.sceneDurationsInFrames[1]}
      >
        <ImageScene
          imageSrc={epson163320}
          nextImageSrc={epson163325}
          nextWipeFromFrame={26}
          nextWipeDurationInFrames={20}
          guideX={guideX}
          globalFrame={frame}
          wipeStyle="slit"
          isFirst={false}
          durationInFrames={EPSON_WIDE_BANNER.sceneDurationsInFrames[1]}
          enableExit
          windowShape="rect"
          kicker="Workflow"
          title="Print / Scan"
          subtitle="Stable speed. Clean output."
        />
      </Sequence>

      <Sequence
        from={EPSON_SCENE_STARTS_IN_FRAMES[2]}
        durationInFrames={EPSON_WIDE_BANNER.sceneDurationsInFrames[2]}
      >
        <ImageScene
          imageSrc={epson163329}
          guideX={guideX}
          globalFrame={frame}
          wipeStyle="diagonal"
          isFirst={false}
          durationInFrames={EPSON_WIDE_BANNER.sceneDurationsInFrames[2]}
          enableExit
          windowShape="diagonal"
          kicker="Detail"
          title="Clarity"
          subtitle="Designed for quiet control."
        />
      </Sequence>

      <Sequence
        from={EPSON_SCENE_STARTS_IN_FRAMES[3]}
        durationInFrames={EPSON_WIDE_BANNER.sceneDurationsInFrames[3]}
      >
        <ImageScene
          imageSrc={epson163335}
          guideX={guideX}
          globalFrame={frame}
          wipeStyle="top"
          isFirst={false}
          durationInFrames={EPSON_WIDE_BANNER.sceneDurationsInFrames[3]}
          enableExit={false}
          layoutVariant="stand"
          windowShape="chamfer"
          kicker="Epson"
          title="Explore"
          subtitle="Business imaging, simplified."
          cta="LEARN MORE"
        />
      </Sequence>
    </AbsoluteFill>
  );
};
