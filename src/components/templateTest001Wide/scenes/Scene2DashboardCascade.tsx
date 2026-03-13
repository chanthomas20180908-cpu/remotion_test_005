import React, { useMemo } from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BackgroundWash } from "../components/BackgroundWash";
import { getLayout } from "../components/layout";
import { COLORS, FONT } from "../components/tokens";
import { MaskedTextReveal } from "../components/MaskedTextReveal";
import { OdometerNumber } from "../components/OdometerNumber";
import { easeExpoInOut, easePower4Out } from "../components/easing";

export type Scene2DashboardCascadeProps = {
  startFrame: number;
};

type RowData = {
  id: string;
  label: string;
  from: number;
  to: number;
  badge: string;
};

const ROWS: RowData[] = [
  {
    id: "phone",
    label: "手机",
    from: 123_767_286,
    to: 130_733_672,
    badge: "-2.1% 较上月",
  },
  {
    id: "desktop",
    label: "桌面",
    from: 10_000_000,
    to: 14_470_905,
    badge: "-4.8% 较上月",
  },
  {
    id: "tv",
    label: "电视",
    from: 3_000_000,
    to: 4_232_855,
    badge: "+5.5% 较上月",
  },
  {
    id: "tablet",
    label: "平板",
    from: 2_000_000,
    to: 3_755_811,
    badge: "-15.9% 较上月",
  },
];

export const Scene2DashboardCascade: React.FC<Scene2DashboardCascadeProps> = ({
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const local = frame - startFrame;
  const layout = useMemo(() => getLayout(width, height), [width, height]);

  // Transition 1->2：几何裁切（从 44% 处向左展开）
  const wipeP = interpolate(local, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeExpoInOut,
  });
  const wipeLeft = interpolate(wipeP, [0, 1], [44, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Transition 2->3：Punch-through（最后 18f 抽离其他内容）
  const punchP = interpolate(local, [162, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeExpoInOut,
  });
  const otherFade = interpolate(punchP, [0, 1], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        clipPath: `polygon(${wipeLeft}% 0%, 100% 0%, 100% 100%, ${wipeLeft}% 100%)`,
      }}
    >
      <BackgroundWash startFrame={startFrame} durationInFrames={180} />

      <div
        style={{
          position: "absolute",
          left: layout.safeX,
          top: layout.safeY,
          right: layout.safeX,
          bottom: layout.safeY,
          display: "flex",
          alignItems: "stretch",
          gap: layout.gutter,
          fontFamily: FONT.sans,
        }}
      >
        {/* Left 40%: 文本信息（从 local 18f 才开始出现） */}
        <div
          style={{
            width: layout.leftW,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingRight: Math.round(layout.col * 0.4),
            opacity: otherFade,
          }}
        >
          <MaskedTextReveal
            startFrame={18}
            duration={14}
            yFrom={44}
            style={{
              fontSize: 112,
              fontWeight: 780,
              letterSpacing: -0.02,
              lineHeight: 0.98,
              color: COLORS.text,
            }}
          >
            设备分布
          </MaskedTextReveal>

          <div style={{ height: 18 }} />

          <MaskedTextReveal
            startFrame={22}
            duration={14}
            yFrom={22}
            style={{
              fontSize: 18,
              fontWeight: 560,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: COLORS.text2,
            }}
          >
            近 30 天 · 全渠道统计
          </MaskedTextReveal>
        </div>

        {/* Right 60%: Dashboard 卡片 */}
        <div
          style={{
            width: layout.rightW,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              backgroundColor: COLORS.card,
              borderRadius: 18,
              border: `1.5px solid ${COLORS.line}`,
              boxShadow: "0 18px 50px rgba(11, 18, 32, 0.06)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "26px 30px 18px 30px",
                borderBottom: `1.5px solid ${COLORS.line}`,
                opacity: otherFade,
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: COLORS.text3,
                }}
              >
                CHANNELS
              </div>
            </div>

            {ROWS.map((row, i) => {
              // 级联：从 local 34f 开始，每行延迟 8f
              const rowStart = 34 + i * 8;
              const rowP = interpolate(
                local,
                [rowStart, rowStart + 22],
                [0, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: easePower4Out,
                },
              );
              const rowY = interpolate(rowP, [0, 1], [44, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const rowClip = interpolate(rowP, [0, 1], [100, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const rowOpacity = interpolate(
                local,
                [rowStart, rowStart + 6],
                [0, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                },
              );

              // 数字滚动：入场后 10f 开始，持续 58f
              const numStart = rowStart + 10;

              // Punch-through 时，聚焦第一行
              const focusScale =
                i === 0
                  ? interpolate(punchP, [0, 1], [1, 1.7], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    })
                  : 1;
              const focusX =
                i === 0
                  ? interpolate(punchP, [0, 1], [0, -140], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    })
                  : 0;
              const focusY =
                i === 0
                  ? interpolate(punchP, [0, 1], [0, -120], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    })
                  : 0;

              const rowFadeDuringPunch = i === 0 ? 1 : otherFade;

              return (
                <div
                  key={row.id}
                  style={{
                    padding: "18px 30px",
                    borderBottom:
                      i === ROWS.length - 1
                        ? undefined
                        : `1.5px solid ${COLORS.line}`,
                    display: "flex",
                    alignItems: "center",
                    gap: 18,
                    backgroundColor: COLORS.card,
                    transform: `translate3d(${focusX}px, ${focusY}px, 0) scale(${focusScale}) translateY(${rowY}px)`,
                    clipPath: `inset(${rowClip}% 0% 0% 0%)`,
                    opacity: rowOpacity * rowFadeDuringPunch,
                    transformOrigin: "left center",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <OdometerNumber
                      startFrame={numStart}
                      duration={58}
                      from={row.from}
                      to={row.to}
                      formatLocale="zh-CN"
                      style={{
                        fontSize: 88,
                        fontWeight: 820,
                        color: COLORS.text,
                        letterSpacing: -0.02,
                        lineHeight: 1,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    />
                  </div>

                  <div
                    style={{
                      width: 120,
                      fontSize: 22,
                      fontWeight: 650,
                      color: COLORS.text2,
                      letterSpacing: 0.01,
                      textAlign: "left",
                      opacity: otherFade,
                    }}
                  >
                    {row.label}
                  </div>

                  <div
                    style={{
                      padding: "10px 14px",
                      backgroundColor: COLORS.mintBg,
                      border: `1.5px solid ${COLORS.mint}`,
                      color: COLORS.mint,
                      borderRadius: 10,
                      fontSize: 16,
                      fontWeight: 700,
                      letterSpacing: "0.10em",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                      opacity: otherFade,
                    }}
                  >
                    {row.badge}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 极弱扫光：只在 hold 段出现一次（local 141-168） */}
      <div
        style={{
          position: "absolute",
          left: layout.rightX,
          top: layout.safeY + 80,
          width: layout.rightW,
          height: 420,
          pointerEvents: "none",
          opacity: interpolate(
            local,
            [141, 150, 162, 168],
            [0, 0.08, 0.08, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          ),
          transform: `translateX(${interpolate(local, [141, 168], [-220, 260], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: easeExpoInOut,
          })}px)`,
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 100%)",
          filter: "blur(2px)",
        }}
      />
    </AbsoluteFill>
  );
};
