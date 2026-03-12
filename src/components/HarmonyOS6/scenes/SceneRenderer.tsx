import type { CSSProperties, FC, ReactElement } from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { GlassPanel } from "../components/GlassPanel";
import { SceneShell } from "../components/SceneShell";
import type { HarmonyScene } from "../constants";

type SceneRendererProps = {
  scene: HarmonyScene;
};

const titleStyle: CSSProperties = {
  margin: 0,
  fontSize: 78,
  lineHeight: 1.05,
  fontWeight: 800,
  letterSpacing: -3,
  maxWidth: 760,
};

const bodyStyle: CSSProperties = {
  margin: 0,
  fontSize: 28,
  lineHeight: 1.55,
  maxWidth: 760,
  color: "rgba(13, 23, 48, 0.74)",
};

const getEntrance = (frame: number, fps: number, delay: number): number => {
  return spring({
    fps,
    frame: Math.max(0, frame - delay),
    config: {
      damping: 200,
      stiffness: 120,
      mass: 0.7,
    },
  });
};

const SceneHeader: FC<{
  scene: HarmonyScene;
  dark?: boolean;
}> = ({ scene, dark }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const kickerIn = getEntrance(frame, fps, 0);
  const titleIn = getEntrance(frame, fps, 8);
  const bodyIn = getEntrance(frame, fps, 16);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: scene.accent,
          opacity: kickerIn,
          transform: `translateY(${24 - kickerIn * 24}px)`,
        }}
      >
        {scene.kicker}
      </div>
      <h2
        style={{
          ...titleStyle,
          opacity: titleIn,
          transform: `translateY(${36 - titleIn * 36}px)`,
          color: dark ? "#f4f8ff" : "#0d1730",
        }}
      >
        {scene.title}
      </h2>
      <p
        style={{
          ...bodyStyle,
          opacity: bodyIn,
          transform: `translateY(${24 - bodyIn * 24}px)`,
          color: dark ? "rgba(244, 248, 255, 0.78)" : bodyStyle.color,
        }}
      >
        {scene.description}
      </p>
    </div>
  );
};

const LabelRow: FC<{
  labels: string[];
  accent: string;
  dark?: boolean;
}> = ({ labels, accent, dark }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      {labels.map((label, index) => {
        const progress = getEntrance(frame, fps, 18 + index * 4);

        return (
          <div
            key={label}
            style={{
              padding: "14px 22px",
              borderRadius: 999,
              background: dark ? `${accent}22` : `${accent}14`,
              border: `1px solid ${accent}35`,
              fontSize: 22,
              fontWeight: 600,
              opacity: progress,
              transform: `translateY(${20 - progress * 20}px) scale(${0.92 + progress * 0.08})`,
            }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};

const FloatingImage: FC<{
  src: string;
  accent: string;
  dark?: boolean;
  delay: number;
  style?: CSSProperties;
}> = ({ src, accent, dark, delay, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = getEntrance(frame, fps, delay);
  const driftY = Math.sin((frame + delay * 3) / 28) * 10;

  return (
    <GlassPanel
      dark={dark}
      style={{
        padding: 16,
        opacity: progress,
        transform: `translateY(${40 - progress * 40 + driftY}px) scale(${0.9 + progress * 0.1})`,
        ...style,
      }}
    >
      <div
        style={{
          borderRadius: 26,
          overflow: "hidden",
          border: `1px solid ${accent}25`,
          backgroundColor: dark ? "rgba(7, 17, 31, 0.8)" : "#ffffff",
        }}
      >
        <Img
          src={src}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </GlassPanel>
  );
};

const HeroLayout: FC<{ scene: HarmonyScene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const halo = interpolate(frame, [0, 90], [0.84, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const wordIn = getEntrance(frame, fps, 18);

  return (
    <AbsoluteFill
      style={{ padding: "110px 120px", justifyContent: "space-between" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <SceneHeader scene={scene} />
        <div
          style={{
            width: 700,
            height: 700,
            borderRadius: 999,
            background: `radial-gradient(circle, ${scene.accent}48 0%, ${scene.accent}20 30%, transparent 68%)`,
            transform: `scale(${halo})`,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 110,
              borderRadius: 999,
              border: `1px solid ${scene.accent}50`,
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.82), rgba(232,240,255,0.12))",
            }}
          />
        </div>
      </div>
      <div style={{ display: "flex", gap: 18 }}>
        {scene.labels?.map((label, index) => (
          <GlassPanel
            key={label}
            style={{
              minWidth: 220,
              opacity: wordIn,
              transform: `translateY(${26 - wordIn * 26 + index * 2}px)`,
            }}
          >
            <div style={{ fontSize: 26, fontWeight: 700 }}>{label}</div>
          </GlassPanel>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const SpotlightLayout: FC<{ scene: HarmonyScene }> = ({ scene }) => {
  return (
    <AbsoluteFill
      style={{
        padding: "110px 120px",
        display: "grid",
        gridTemplateColumns: "0.95fr 1.05fr",
        gap: 40,
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 34 }}>
        <SceneHeader scene={scene} />
        {scene.labels ? (
          <LabelRow labels={scene.labels} accent={scene.accent} />
        ) : null}
      </div>
      <div style={{ position: "relative", height: 760 }}>
        {scene.images?.[0] ? (
          <FloatingImage
            src={scene.images[0]}
            accent={scene.accent}
            delay={16}
            style={{
              position: "absolute",
              left: 0,
              top: 120,
              width: 410,
              height: 520,
            }}
          />
        ) : null}
        {scene.images?.[1] ? (
          <FloatingImage
            src={scene.images[1]}
            accent={scene.accent}
            delay={26}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: 430,
              height: 620,
            }}
          />
        ) : null}
      </div>
    </AbsoluteFill>
  );
};

const TriptychLayout: FC<{ scene: HarmonyScene }> = ({ scene }) => {
  return (
    <AbsoluteFill style={{ padding: "100px 90px", gap: 54 }}>
      <SceneHeader scene={scene} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
          marginTop: 42,
        }}
      >
        {scene.images?.map((image, index) => (
          <FloatingImage
            key={image}
            src={image}
            accent={scene.accent}
            delay={18 + index * 8}
            style={{ height: 560 }}
          />
        ))}
      </div>
      {scene.labels ? (
        <LabelRow labels={scene.labels} accent={scene.accent} />
      ) : null}
    </AbsoluteFill>
  );
};

const CommandLayout: FC<{ scene: HarmonyScene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const lineProgress = interpolate(frame, [16, 64], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        padding: "110px 120px",
        display: "grid",
        gridTemplateColumns: "0.9fr 1.1fr",
        gap: 40,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 34,
          justifyContent: "center",
        }}
      >
        <SceneHeader scene={scene} />
        {scene.labels ? (
          <LabelRow labels={scene.labels} accent={scene.accent} />
        ) : null}
      </div>
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            left: 70,
            right: 70,
            top: 330,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${scene.accent}, transparent)`,
            transform: `scaleX(${lineProgress})`,
          }}
        />
        {scene.images?.[0] ? (
          <FloatingImage
            src={scene.images[0]}
            accent={scene.accent}
            delay={20}
            style={{
              position: "absolute",
              left: 0,
              top: 60,
              width: 390,
              height: 540,
            }}
          />
        ) : null}
        {scene.images?.[1] ? (
          <FloatingImage
            src={scene.images[1]}
            accent={scene.accent}
            delay={32}
            style={{
              position: "absolute",
              right: 0,
              bottom: 40,
              width: 440,
              height: 560,
            }}
          />
        ) : null}
        {["Listen", "Plan", "Execute"].map((step, index) => {
          const progress = getEntrance(frame, 30, 18 + index * 8);

          return (
            <div
              key={step}
              style={{
                position: "absolute",
                left: 110 + index * 190,
                top: 286,
                width: 90,
                height: 90,
                borderRadius: 999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: 700,
                background: `linear-gradient(135deg, ${scene.accent}, #ffffff)`,
                opacity: progress,
                transform: `scale(${0.8 + progress * 0.2})`,
              }}
            >
              {step}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const GridLayout: FC<{ scene: HarmonyScene }> = ({ scene }) => {
  return (
    <AbsoluteFill style={{ padding: "94px 104px", gap: 36 }}>
      <SceneHeader scene={scene} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 22,
          marginTop: 34,
        }}
      >
        {scene.images?.map((image, index) => (
          <FloatingImage
            key={image}
            src={image}
            accent={scene.accent}
            delay={18 + index * 4}
            style={{ height: 280 }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const SecurityLayout: FC<{ scene: HarmonyScene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const shieldIn = getEntrance(frame, fps, 20);

  return (
    <AbsoluteFill
      style={{
        padding: "120px 120px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 34,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 34,
        }}
      >
        <SceneHeader scene={scene} dark />
        {scene.labels ? (
          <LabelRow labels={scene.labels} accent={scene.accent} dark />
        ) : null}
      </div>
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 520,
            height: 520,
            borderRadius: 999,
            border: `1px solid ${scene.accent}55`,
            background: `radial-gradient(circle, ${scene.accent}18 0%, transparent 68%)`,
            opacity: shieldIn,
            transform: `scale(${0.84 + shieldIn * 0.16})`,
          }}
        />
        {scene.images?.[0] ? (
          <FloatingImage
            src={scene.images[0]}
            accent={scene.accent}
            dark
            delay={30}
            style={{ position: "absolute", width: 420, height: 520 }}
          />
        ) : null}
      </div>
    </AbsoluteFill>
  );
};

const SplitLayout: FC<{ scene: HarmonyScene }> = ({ scene }) => {
  return (
    <AbsoluteFill style={{ padding: "100px 94px", gap: 28 }}>
      <SceneHeader scene={scene} dark={scene.theme === "dark"} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 24,
          marginTop: 36,
        }}
      >
        {scene.images?.map((image, index) => (
          <FloatingImage
            key={image}
            src={image}
            accent={scene.accent}
            dark={scene.theme === "dark"}
            delay={18 + index * 10}
            style={{ height: 580 }}
          />
        ))}
      </div>
      {scene.labels ? (
        <LabelRow
          labels={scene.labels}
          accent={scene.accent}
          dark={scene.theme === "dark"}
        />
      ) : null}
    </AbsoluteFill>
  );
};

const OrbitLayout: FC<{ scene: HarmonyScene }> = ({ scene }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        padding: "110px 120px",
        display: "grid",
        gridTemplateColumns: "0.92fr 1.08fr",
        gap: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 34,
        }}
      >
        <SceneHeader scene={scene} />
        {scene.labels ? (
          <LabelRow labels={scene.labels} accent={scene.accent} />
        ) : null}
      </div>
      <div style={{ position: "relative" }}>
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              inset: 120 - index * 56,
              borderRadius: 999,
              border: `1px solid ${scene.accent}${index === 0 ? "42" : "28"}`,
              transform: `rotate(${frame * (0.18 + index * 0.05)}deg)`,
            }}
          />
        ))}
        {scene.images?.[0] ? (
          <FloatingImage
            src={scene.images[0]}
            accent={scene.accent}
            delay={24}
            style={{
              position: "absolute",
              left: 220,
              top: 120,
              width: 360,
              height: 640,
            }}
          />
        ) : null}
      </div>
    </AbsoluteFill>
  );
};

const MetricsLayout: FC<{ scene: HarmonyScene }> = ({ scene }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ padding: "104px 100px", gap: 42 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0.94fr 1.06fr",
          gap: 34,
        }}
      >
        <SceneHeader scene={scene} />
        <GlassPanel
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 310,
          }}
        >
          {scene.images?.[0] ? (
            <Img
              src={scene.images[0]}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          ) : null}
        </GlassPanel>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
        }}
      >
        {scene.metrics?.map((metric, index) => {
          const progress = getEntrance(frame, 30, 18 + index * 8);

          return (
            <GlassPanel
              key={metric.label}
              style={{
                minHeight: 260,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                opacity: progress,
                transform: `translateY(${26 - progress * 26}px)`,
              }}
            >
              <div
                style={{
                  fontSize: 22,
                  lineHeight: 1.5,
                  color: "rgba(13, 23, 48, 0.64)",
                }}
              >
                {metric.label}
              </div>
              <div
                style={{
                  fontSize: 74,
                  fontWeight: 800,
                  letterSpacing: -3,
                  color: scene.accent,
                }}
              >
                {metric.value}
              </div>
            </GlassPanel>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const ConnectivityLayout: FC<{ scene: HarmonyScene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const pulse = interpolate(frame, [0, 80], [0.7, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        padding: "110px 110px",
        display: "grid",
        gridTemplateColumns: "0.98fr 1.02fr",
        gap: 34,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 34,
        }}
      >
        <SceneHeader scene={scene} />
        {scene.labels ? (
          <LabelRow labels={scene.labels} accent={scene.accent} />
        ) : null}
      </div>
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            left: 120,
            top: 160,
            right: 120,
            bottom: 120,
            borderRadius: 60,
            border: `1px dashed ${scene.accent}55`,
            transform: `scale(${pulse})`,
          }}
        />
        <GlassPanel
          style={{
            position: "absolute",
            left: 60,
            top: 240,
            width: 290,
            height: 420,
          }}
        >
          <div style={{ fontSize: 30, fontWeight: 800, marginBottom: 18 }}>
            Phone
          </div>
          <div
            style={{
              fontSize: 22,
              lineHeight: 1.5,
              color: "rgba(13,23,48,0.66)",
            }}
          >
            碰一碰分享，一触即达。
          </div>
        </GlassPanel>
        <GlassPanel
          style={{
            position: "absolute",
            right: 40,
            top: 90,
            width: 460,
            height: 300,
          }}
        >
          <div style={{ fontSize: 30, fontWeight: 800, marginBottom: 18 }}>
            PC
          </div>
          <div
            style={{
              fontSize: 22,
              lineHeight: 1.5,
              color: "rgba(13,23,48,0.66)",
            }}
          >
            跨屏接收与双向流转，办公素材更自然。
          </div>
        </GlassPanel>
        <GlassPanel
          style={{
            position: "absolute",
            right: 90,
            bottom: 40,
            width: 420,
            height: 260,
            overflow: "hidden",
          }}
        >
          {scene.images?.[0] ? (
            <Img
              src={scene.images[0]}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : null}
        </GlassPanel>
      </div>
    </AbsoluteFill>
  );
};

const ClosingLayout: FC<{ scene: HarmonyScene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [0, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ padding: "84px 94px", gap: 28 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 24,
        }}
      >
        {scene.images?.map((image, index) => (
          <FloatingImage
            key={image}
            src={image}
            accent={scene.accent}
            delay={16 + index * 10}
            style={{ height: 400 }}
          />
        ))}
      </div>
      <div style={{ marginTop: 26 }}>
        <SceneHeader scene={scene} />
      </div>
      <div
        style={{
          fontSize: 86,
          fontWeight: 800,
          letterSpacing: -4,
          color: scene.accent,
          opacity: fade,
          transform: `translateY(${22 - fade * 22}px)`,
        }}
      >
        HarmonyOS 6
      </div>
    </AbsoluteFill>
  );
};

export const SceneRenderer: FC<SceneRendererProps> = ({ scene }) => {
  const renderLayout = (): ReactElement => {
    switch (scene.layout) {
      case "hero":
        return <HeroLayout scene={scene} />;
      case "spotlight":
        return <SpotlightLayout scene={scene} />;
      case "triptych":
        return <TriptychLayout scene={scene} />;
      case "command":
        return <CommandLayout scene={scene} />;
      case "grid":
        return <GridLayout scene={scene} />;
      case "security":
        return <SecurityLayout scene={scene} />;
      case "split":
        return <SplitLayout scene={scene} />;
      case "orbit":
        return <OrbitLayout scene={scene} />;
      case "metrics":
        return <MetricsLayout scene={scene} />;
      case "connectivity":
        return <ConnectivityLayout scene={scene} />;
      case "closing":
        return <ClosingLayout scene={scene} />;
      default:
        return <HeroLayout scene={scene} />;
    }
  };

  return (
    <SceneShell accent={scene.accent} theme={scene.theme}>
      {renderLayout()}
    </SceneShell>
  );
};
