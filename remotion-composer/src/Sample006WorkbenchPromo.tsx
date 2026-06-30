import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type Sample006WorkbenchPromoProps = {
  title?: string;
  subtitle?: string;
};

const C = {
  bg: "#050912",
  primary: "#38BDF8",
  secondary: "#7C3AED",
  text: "#E5F6FF",
  accent: "#22D3EE",
};

const font = '"Microsoft YaHei", "PingFang SC", "Segoe UI", sans-serif';

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
const fade = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, start + 12, end - 12, end], [0, 1, 1, 0], clamp);

const Ambient: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = frame * 0.45;
  const dots = Array.from({length: 22}, (_, i) => ({
    x: (i * 173 + 71) % 1080,
    y: (i * 311 + 43) % 1920,
    r: 1.5 + (i % 3),
  }));
  return (
    <AbsoluteFill style={{overflow: "hidden", background: C.bg}}>
      <div style={{position: "absolute", inset: -260, background: `radial-gradient(circle at ${50 + Math.sin(frame / 70) * 7}% 38%, rgba(56,189,248,.17), transparent 31%), radial-gradient(circle at 28% 72%, rgba(124,58,237,.16), transparent 29%)`}} />
      <div style={{position: "absolute", inset: -120, opacity: 0.28, transform: `perspective(700px) rotateX(64deg) translateY(${370 + (drift % 56)}px) scale(1.5)`, transformOrigin: "center", backgroundImage: "linear-gradient(rgba(56,189,248,.22) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,.22) 1px, transparent 1px)", backgroundSize: "56px 56px", maskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)"}} />
      {dots.map((d, i) => (
        <div key={i} style={{position: "absolute", left: d.x, top: (d.y + drift * (0.18 + (i % 4) * .05)) % 1920, width: d.r * 2, height: d.r * 2, borderRadius: "50%", background: i % 4 === 0 ? C.secondary : C.primary, opacity: .2 + .35 * (1 + Math.sin(frame / 18 + i)) / 2, boxShadow: `0 0 16px ${C.primary}`}} />
      ))}
      <div style={{position: "absolute", inset: 28, border: "1px solid rgba(56,189,248,.12)", borderRadius: 42}} />
    </AbsoluteFill>
  );
};

const Kicker: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div style={{fontFamily: font, fontSize: 25, letterSpacing: 7, color: C.accent, textTransform: "uppercase", marginBottom: 34}}>{children}</div>
);

const Hero: React.FC<{title: string; subtitle: string}> = ({title, subtitle}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame, fps, config: {damping: 18, stiffness: 90}});
  const opacity = fade(frame, 0, 90);
  return (
    <AbsoluteFill style={{opacity, alignItems: "center", justifyContent: "center", fontFamily: font, textAlign: "center"}}>
      <div style={{width: 760, transform: `translateY(${interpolate(p, [0, 1], [45, 0])}px) scale(${interpolate(p, [0, 1], [.96, 1])})`}}>
        <Kicker>GENERATIVE VIDEO SYSTEM</Kicker>
        <div style={{height: 3, width: interpolate(frame, [5, 52], [0, 620], clamp), margin: "0 auto 46px", background: `linear-gradient(90deg, transparent, ${C.primary}, ${C.secondary}, transparent)`, boxShadow: `0 0 24px ${C.primary}`}} />
        <div style={{fontSize: 98, fontWeight: 800, lineHeight: 1.06, letterSpacing: -4, color: C.text, textShadow: "0 0 38px rgba(56,189,248,.25)"}}>{title}</div>
        <div style={{marginTop: 45, fontSize: 39, color: "rgba(229,246,255,.78)", letterSpacing: 2}}>{subtitle}</div>
      </div>
    </AbsoluteFill>
  );
};

const Nodes: React.FC = () => {
  const frame = useCurrentFrame();
  const local = frame - 90;
  const labels = ["脚本", "素材", "分镜"];
  return (
    <AbsoluteFill style={{opacity: fade(frame, 90, 210), justifyContent: "center", alignItems: "center", fontFamily: font}}>
      <div style={{width: 860}}>
        <Kicker>01 / AUTO DECOMPOSE</Kicker>
        <div style={{fontSize: 65, fontWeight: 750, color: C.text, lineHeight: 1.25}}>脚本 · 素材 · 分镜</div>
        <div style={{fontSize: 37, color: "rgba(229,246,255,.62)", marginTop: 20}}>自动拆解生产步骤</div>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 125, position: "relative"}}>
          <div style={{position: "absolute", left: 105, right: 105, height: 3, background: "rgba(56,189,248,.15)"}} />
          <div style={{position: "absolute", left: 105, width: interpolate(local, [18, 82], [0, 650], clamp), height: 3, background: `linear-gradient(90deg, ${C.primary}, ${C.secondary})`, boxShadow: `0 0 18px ${C.primary}`}} />
          {labels.map((label, i) => {
            const p = spring({frame: local - 14 - i * 20, fps: 30, config: {damping: 14}});
            return <div key={label} style={{zIndex: 2, width: 188, height: 188, borderRadius: 48, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 37, fontWeight: 700, color: C.text, transform: `scale(${Math.max(0, p)})`, background: "linear-gradient(145deg, rgba(56,189,248,.16), rgba(124,58,237,.16))", border: `2px solid rgba(56,189,248,${.28 + .55 * Math.max(0,p)})`, boxShadow: `0 0 ${45 * Math.max(0,p)}px rgba(56,189,248,.28), inset 0 0 30px rgba(56,189,248,.08)`}}><span>{label}</span></div>;
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Pipeline: React.FC = () => {
  const frame = useCurrentFrame();
  const local = frame - 210;
  const steps = ["Brief", "Frames", "Render", "QC"];
  return (
    <AbsoluteFill style={{opacity: fade(frame, 210, 360), justifyContent: "center", alignItems: "center", fontFamily: font}}>
      <div style={{width: 900}}>
        <Kicker>02 / CONNECT & RENDER</Kicker>
        <div style={{fontSize: 56, fontWeight: 760, color: C.text, lineHeight: 1.32}}>连接 Remotion / FFmpeg / 质检报告</div>
        <div style={{fontSize: 36, marginTop: 20, color: "rgba(229,246,255,.62)"}}>让出片流程稳定复用</div>
        <div style={{marginTop: 110, padding: "55px 34px", borderRadius: 38, border: "1px solid rgba(56,189,248,.22)", background: "rgba(7,15,29,.72)", boxShadow: "0 30px 100px rgba(0,0,0,.32)"}}>
          <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            {steps.map((step, i) => {
              const active = interpolate(local, [18 + i * 20, 35 + i * 20], [0, 1], clamp);
              return <React.Fragment key={step}>
                <div style={{width: 145, textAlign: "center"}}>
                  <div style={{width: 82, height: 82, margin: "0 auto 24px", borderRadius: 24, border: `2px solid rgba(56,189,248,${.2 + active * .8})`, background: `rgba(56,189,248,${.05 + active * .14})`, boxShadow: `0 0 ${active * 34}px rgba(56,189,248,.55)`, display: "grid", placeItems: "center", fontSize: 28, color: C.accent}}>{String(i + 1).padStart(2, "0")}</div>
                  <div style={{fontSize: 27, color: active > .5 ? C.text : "rgba(229,246,255,.42)", fontWeight: 650}}>{step}</div>
                </div>
                {i < steps.length - 1 && <div style={{height: 2, flex: 1, margin: "0 -10px 55px", background: `linear-gradient(90deg, ${C.primary} ${interpolate(local, [28 + i*20, 48 + i*20], [0,100], clamp)}%, rgba(56,189,248,.13) 0%)`}} />}
              </React.Fragment>;
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Versions: React.FC = () => {
  const frame = useCurrentFrame();
  const local = frame - 360;
  return (
    <AbsoluteFill style={{opacity: fade(frame, 360, 480), justifyContent: "center", alignItems: "center", fontFamily: font}}>
      <div style={{width: 900}}>
        <Kicker>03 / ITERATE WITH CONFIDENCE</Kicker>
        <div style={{fontSize: 55, fontWeight: 760, lineHeight: 1.3, color: C.text}}>preview_v1 → preview_v2 → preview_v3</div>
        <div style={{fontSize: 36, color: "rgba(229,246,255,.62)", marginTop: 20}}>每一步都有验证</div>
        <div style={{position: "relative", height: 560, marginTop: 85}}>
          {["preview_v1", "preview_v2", "preview_v3"].map((v, i) => {
            const p = spring({frame: local - 10 - i * 18, fps: 30, config: {damping: 16, stiffness: 100}});
            return <div key={v} style={{position: "absolute", width: 420, height: 520, left: 75 + i * 165, top: i * 18, borderRadius: 34, transform: `translateY(${(1-p)*80}px) rotate(${(i-1)*3.5}deg)`, opacity: p, background: "linear-gradient(155deg, rgba(16,35,59,.96), rgba(8,13,28,.96))", border: `1px solid ${i === 2 ? "rgba(34,211,238,.72)" : "rgba(56,189,248,.25)"}`, boxShadow: `0 30px 90px rgba(0,0,0,.48), 0 0 ${i===2 ? 44 : 15}px rgba(56,189,248,.15)`, padding: 28}}>
              <div style={{height: 290, borderRadius: 22, background: `radial-gradient(circle at 50% 40%, ${i===2 ? "rgba(34,211,238,.35)" : "rgba(124,58,237,.25)"}, transparent 48%), repeating-linear-gradient(0deg, rgba(56,189,248,.12) 0 1px, transparent 1px 25px)`, display: "grid", placeItems: "center"}}><div style={{width: 95, height: 95, borderRadius: "50%", border: "2px solid rgba(56,189,248,.6)", display: "grid", placeItems: "center", color: C.accent, fontSize: 28}}>▶</div></div>
              <div style={{marginTop: 33, color: C.text, fontSize: 29, fontWeight: 700}}>{v}</div>
              <div style={{display: "flex", gap: 8, marginTop: 19}}>{[0,1,2,3].map(n => <div key={n} style={{height: 5, flex: 1, borderRadius: 4, background: n <= i ? C.accent : "rgba(229,246,255,.13)"}} />)}</div>
              <div style={{marginTop: 22, color: "rgba(229,246,255,.48)", fontSize: 20}}>QC PASSED · 00:18</div>
            </div>;
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const local = frame - 480;
  const p = spring({frame: local, fps: 30, config: {damping: 18, stiffness: 90}});
  const line = interpolate(local, [0, 42], [430, 0], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill style={{opacity: interpolate(frame, [480,492,533,540], [0,1,1,0], clamp), alignItems: "center", justifyContent: "center", fontFamily: font, textAlign: "center"}}>
      <svg width="760" height="180" viewBox="0 0 760 180" style={{position: "absolute", opacity: .65}}><path d="M0 90 H250 L310 30 H450 L510 90 H760" fill="none" stroke={C.accent} strokeWidth="3" strokeDasharray="430" strokeDashoffset={line} style={{filter: `drop-shadow(0 0 12px ${C.primary})`}} /></svg>
      <div style={{transform: `scale(${.92 + p * .08})`, width: 900}}>
        <div style={{width: 104, height: 104, border: `2px solid ${C.accent}`, borderRadius: 30, margin: "0 auto 56px", transform: "rotate(45deg)", boxShadow: `0 0 42px rgba(34,211,238,.42)`, display: "grid", placeItems: "center"}}><div style={{width: 28, height: 28, borderRadius: 8, background: C.text, boxShadow: `0 0 22px ${C.accent}`}} /></div>
        <div style={{fontSize: 66, color: C.text, fontWeight: 800, letterSpacing: 1}}>AI 短视频生产工作台</div>
        <div style={{fontSize: 40, marginTop: 35, color: C.accent, letterSpacing: 9}}>更快 · 更稳 · 更少人工</div>
      </div>
    </AbsoluteFill>
  );
};

export const Sample006WorkbenchPromo: React.FC<Sample006WorkbenchPromoProps> = ({
  title = "AI Video Workbench",
  subtitle = "从一句需求，到一条完整样片",
}) => {
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      <Ambient />
      <Hero title={title} subtitle={subtitle} />
      <Nodes />
      <Pipeline />
      <Versions />
      <Outro />
    </AbsoluteFill>
  );
};

