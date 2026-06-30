import type {FC} from "react";
import {
  AbsoluteFill,
  type CalculateMetadataFunction,
  Composition,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

export type Sample005TokenMap = Record<string, string>;
export type Sample005V2Props = Record<string, unknown> & {
  tokens: Sample005TokenMap;
};

const FPS = 30;
const DURATION_SECONDS = 18;

export const sample005DefaultProps: Sample005V2Props = {
  tokens: {
    "colors.background": "#070504",
    "colors.gold": "#F5E7D0",
    "colors.coffee": "#2A140C",
    "font.heading": "Microsoft YaHei",
    "layout.aspect_ratio": "9:16",
    "layout.resolution": "1080x1920",
    mood: "dark premium black gold coffee",
  },
};

const parseLayout = (tokens: Sample005TokenMap) => {
  const resolution = tokens["layout.resolution"];
  const aspectRatio = tokens["layout.aspect_ratio"];
  const match = /^(\d+)x(\d+)$/.exec(resolution ?? "");

  if (!match) {
    throw new Error(`Invalid layout.resolution token: ${resolution}`);
  }

  const width = Number(match[1]);
  const height = Number(match[2]);
  if (aspectRatio !== "9:16" || width !== 1080 || height !== 1920) {
    throw new Error(
      `Sample005V2 requires 9:16 at 1080x1920, received ${aspectRatio} at ${resolution}`,
    );
  }

  return {width, height};
};

export const calculateSample005Metadata: CalculateMetadataFunction<Sample005V2Props> = ({
  props,
}) => {
  const {width, height} = parseLayout(props.tokens);
  return {
    width,
    height,
    fps: FPS,
    durationInFrames: DURATION_SECONDS * FPS,
  };
};

const useTokenStyles = (tokens: Sample005TokenMap) => ({
  background: tokens["colors.background"],
  gold: tokens["colors.gold"],
  coffee: tokens["colors.coffee"],
  headingFont: `${tokens["font.heading"]}, "Microsoft YaHei", sans-serif`,
});

const sceneFade = (frame: number, durationInFrames: number) =>
  Math.min(
    interpolate(frame, [0, 12], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
    interpolate(frame, [durationInFrames - 12, durationInFrames], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

const Opening: FC<Sample005V2Props> = ({tokens}) => {
  const frame = useCurrentFrame();
  const styles = useTokenStyles(tokens);
  const opacity = sceneFade(frame, 3 * FPS);
  const scale = interpolate(frame, [0, 3 * FPS], [0.92, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        backgroundColor: styles.background,
        color: styles.gold,
        fontFamily: styles.headingFont,
        justifyContent: "center",
        opacity,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 760,
          height: 760,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${styles.coffee} 0%, ${styles.background} 68%)`,
          transform: `scale(${scale})`,
        }}
      />
      <div style={{position: "relative", textAlign: "center"}}>
        <div style={{fontSize: 72, letterSpacing: 14}}>黑金咖啡</div>
        <div
          style={{
            width: 190,
            height: 2,
            backgroundColor: styles.gold,
            margin: "34px auto 0",
            opacity: 0.8,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

type ImageSceneProps = Sample005V2Props & {
  src: string;
  durationSeconds: number;
  title: string;
  subtitle?: string;
};

const ImageScene: FC<ImageSceneProps> = ({
  tokens,
  src,
  durationSeconds,
  title,
  subtitle,
}) => {
  const frame = useCurrentFrame();
  const styles = useTokenStyles(tokens);
  const durationInFrames = durationSeconds * FPS;
  const opacity = sceneFade(frame, durationInFrames);
  const scale = interpolate(frame, [0, durationInFrames], [1.02, 1.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{backgroundColor: styles.background, opacity, overflow: "hidden"}}
    >
      <Img
        src={staticFile(`sample005-v2/${src}`)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale})`,
          filter: "contrast(1.06) saturate(0.82) brightness(0.88)",
        }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${styles.background}66 0%, transparent 34%, transparent 58%, ${styles.background}E8 100%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 78,
          right: 78,
          bottom: 190,
          fontFamily: styles.headingFont,
        }}
      >
        <div
          style={{
            width: 120,
            height: 3,
            backgroundColor: styles.coffee,
            marginBottom: 24,
          }}
        />
        <div style={{color: styles.gold, fontSize: 58, letterSpacing: 8}}>{title}</div>
        {subtitle ? (
          <div
            style={{
              color: styles.gold,
              opacity: 0.72,
              fontSize: 34,
              letterSpacing: 8,
              marginTop: 18,
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};

const SellingPoints: FC<Sample005V2Props> = ({tokens}) => {
  const frame = useCurrentFrame();
  const styles = useTokenStyles(tokens);
  const opacity = sceneFade(frame, 6 * FPS);
  const points = ["精选黑金咖啡豆", "慢烘 36 小时", "低温锁韵 72°"];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: styles.background,
        color: styles.gold,
        fontFamily: styles.headingFont,
        justifyContent: "center",
        padding: "0 104px",
        opacity,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 76,
          border: `2px solid ${styles.coffee}`,
          boxShadow: `inset 0 0 90px ${styles.coffee}`,
        }}
      />
      {points.map((point, index) => {
        const itemOpacity = interpolate(
          frame,
          [18 + index * 18, 34 + index * 18],
          [0, 1],
          {extrapolateLeft: "clamp", extrapolateRight: "clamp"},
        );

        return (
          <div
            key={point}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 34,
              margin: "26px 0",
              opacity: itemOpacity,
              transform: `translateY(${(1 - itemOpacity) * 20}px)`,
            }}
          >
            <div
              style={{
                width: 62,
                height: 2,
                backgroundColor: index === 0 ? styles.gold : styles.coffee,
              }}
            />
            <div style={{fontSize: 50, letterSpacing: 6}}>{point}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export const Sample005V2: FC<Sample005V2Props> = ({tokens}) => (
  <AbsoluteFill style={{backgroundColor: tokens["colors.background"]}}>
    <Sequence from={0} durationInFrames={3 * FPS}>
      <Opening tokens={tokens} />
    </Sequence>
    <Sequence from={3 * FPS} durationInFrames={5 * FPS}>
      <ImageScene
        tokens={tokens}
        src="coffee_07_cover_9x16_v.png"
        durationSeconds={5}
        title="精选黑金咖啡豆"
      />
    </Sequence>
    <Sequence from={8 * FPS} durationInFrames={6 * FPS}>
      <SellingPoints tokens={tokens} />
    </Sequence>
    <Sequence from={14 * FPS} durationInFrames={4 * FPS}>
      <ImageScene
        tokens={tokens}
        src="coffee_05_product_hero_v.png"
        durationSeconds={4}
        title="黑金入喉"
        subtitle="余韵悠长"
      />
    </Sequence>
  </AbsoluteFill>
);

export const Sample005V2Composition: FC = () => (
  <Composition
    id="Sample005V2"
    component={Sample005V2}
    durationInFrames={DURATION_SECONDS * FPS}
    fps={FPS}
    width={1080}
    height={1920}
    defaultProps={sample005DefaultProps}
    calculateMetadata={calculateSample005Metadata}
  />
);
