import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type Sample007SmartBottleDemoProps = {
  productName?: string;
  heroSubtitle?: string;
};

const C = {
  bg: "#F6FAFF",
  primary: "#0EA5E9",
  secondary: "#1E293B",
  accent: "#22C55E",
  warning: "#F97316",
  text: "#0F172A",
};
const font = '"Microsoft YaHei", "PingFang SC", "Segoe UI", sans-serif';
const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
const fade = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, start + 12, end - 12, end], [0, 1, 1, 0], clamp);

const Background: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{overflow: "hidden", background: C.bg}}>
      <div style={{position: "absolute", width: 980, height: 980, borderRadius: "50%", left: -360, top: -300, background: "radial-gradient(circle, rgba(14,165,233,.15), rgba(14,165,233,0) 68%)", transform: `translate(${Math.sin(frame/55)*25}px, ${Math.cos(frame/70)*18}px)`}} />
      <div style={{position: "absolute", width: 900, height: 900, borderRadius: "50%", right: -410, bottom: -260, background: "radial-gradient(circle, rgba(34,197,94,.12), rgba(34,197,94,0) 70%)"}} />
      <div style={{position: "absolute", inset: 0, opacity: .35, backgroundImage: "linear-gradient(rgba(14,165,233,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,.08) 1px, transparent 1px)", backgroundSize: "72px 72px", maskImage: "linear-gradient(to bottom, transparent 2%, black 28%, black 72%, transparent 98%)"}} />
      {Array.from({length: 14}, (_, i) => <div key={i} style={{position: "absolute", width: 6, height: 6, borderRadius: "50%", left: (i*197+80)%1080, top: ((i*317+160)+frame*(.15+i%3*.05))%1920, background: i%4===0 ? C.accent : C.primary, opacity: .18}} />)}
      <div style={{position: "absolute", inset: 30, borderRadius: 42, border: "1px solid rgba(14,165,233,.10)"}} />
    </AbsoluteFill>
  );
};

const Kicker: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div style={{fontFamily: font, color: C.primary, fontSize: 24, fontWeight: 700, letterSpacing: 5, marginBottom: 28}}>{children}</div>
);

const Bottle: React.FC<{temperature?: number; scale?: number; glow?: boolean}> = ({temperature = 42, scale = 1, glow = false}) => (
  <div style={{position: "relative", width: 330, height: 710, transform: `scale(${scale})`, transformOrigin: "center"}}>
    {glow && <div style={{position: "absolute", width: 520, height: 520, borderRadius: "50%", left: -95, top: 125, background: "radial-gradient(circle, rgba(14,165,233,.22), rgba(34,197,94,.08) 45%, transparent 70%)"}} />}
    <div style={{position: "absolute", left: 50, top: 25, width: 230, height: 105, borderRadius: "36px 36px 25px 25px", background: "linear-gradient(145deg, #334155, #0F172A)", boxShadow: "0 18px 35px rgba(15,23,42,.20), inset 0 2px 2px rgba(255,255,255,.18)", zIndex: 3}}>
      <div style={{position: "absolute", inset: 13, borderRadius: 22, background: "#06101A", display: "flex", alignItems: "center", justifyContent: "center", color: "#67E8F9", fontFamily: font, fontSize: 39, fontWeight: 700, textShadow: "0 0 14px rgba(103,232,249,.7)"}}>{Math.round(temperature)}°C</div>
    </div>
    <div style={{position: "absolute", left: 31, top: 104, width: 268, height: 575, borderRadius: "82px 82px 112px 112px", background: "linear-gradient(100deg, #D9E7F1 0%, #FFFFFF 22%, #F8FCFF 54%, #C9DAE8 100%)", border: "2px solid rgba(148,163,184,.35)", boxShadow: "0 42px 70px rgba(30,41,59,.18), inset 18px 0 30px rgba(255,255,255,.75), inset -18px 0 30px rgba(148,163,184,.12)"}}>
      <div style={{position: "absolute", left: 38, top: 80, width: 18, height: 360, borderRadius: 20, background: "linear-gradient(#fff, rgba(255,255,255,0))", opacity: .8}} />
      <div style={{position: "absolute", left: 112, bottom: 45, width: 42, height: 5, borderRadius: 5, background: "rgba(14,165,233,.35)"}} />
    </div>
    <div style={{position: "absolute", left: 73, bottom: 5, width: 184, height: 30, borderRadius: "50%", background: "rgba(30,41,59,.14)", filter: "blur(9px)"}} />
  </div>
);

const Hero: React.FC<Required<Sample007SmartBottleDemoProps>> = ({productName, heroSubtitle}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame, fps, config: {damping: 18, stiffness: 90}});
  return (
    <AbsoluteFill style={{opacity: fade(frame,0,90), fontFamily: font, alignItems: "center", paddingTop: 205}}>
      <Kicker>SMART HYDRATION</Kicker>
      <div style={{fontSize: 76, fontWeight: 800, color: C.text, letterSpacing: -2}}>{productName}</div>
      <div style={{fontSize: 34, color: "#64748B", marginTop: 20}}>{heroSubtitle}</div>
      <div style={{marginTop: 105, transform: `translateY(${(1-p)*70}px) scale(${.94+p*.06})`}}><Bottle temperature={42} glow /></div>
    </AbsoluteFill>
  );
};

const Temperature: React.FC = () => {
  const frame = useCurrentFrame();
  const local = frame-90;
  const temp = interpolate(local,[20,92],[28,42],{...clamp,easing:Easing.out(Easing.cubic)});
  const progress = interpolate(temp,[28,42],[0,1],clamp);
  return (
    <AbsoluteFill style={{opacity:fade(frame,90,210),fontFamily:font,padding:"220px 90px"}}>
      <Kicker>01 / TEMPERATURE</Kicker>
      <div style={{fontSize:68,fontWeight:800,color:C.text}}>实时温度显示</div>
      <div style={{fontSize:36,color:"#64748B",marginTop:18}}>入口前，先知道冷热</div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:145}}>
        <div style={{transform:"scale(.72)",transformOrigin:"left center",width:330}}><Bottle temperature={temp}/></div>
        <div style={{width:430,height:560,borderRadius:48,background:"rgba(255,255,255,.82)",border:"1px solid rgba(14,165,233,.16)",boxShadow:"0 30px 80px rgba(30,41,59,.10)",padding:"54px 48px"}}>
          <div style={{fontSize:24,color:"#64748B",letterSpacing:3}}>CURRENT TEMP</div>
          <div style={{fontSize:112,fontWeight:800,color:C.text,marginTop:35,letterSpacing:-6}}>{Math.round(temp)}<span style={{fontSize:42,color:C.primary,letterSpacing:0}}>°C</span></div>
          <div style={{height:18,borderRadius:20,background:"#E2E8F0",marginTop:55,overflow:"hidden"}}><div style={{height:"100%",width:`${progress*100}%`,borderRadius:20,background:`linear-gradient(90deg,${C.primary},${C.warning})`,boxShadow:"0 0 18px rgba(249,115,22,.32)"}}/></div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:22,color:"#94A3B8",marginTop:16}}><span>28°</span><span>42°</span></div>
          <div style={{marginTop:55,display:"inline-flex",alignItems:"center",gap:12,padding:"13px 20px",borderRadius:30,background:"#ECFDF5",color:"#15803D",fontSize:22,fontWeight:700}}><span style={{width:9,height:9,borderRadius:"50%",background:C.accent}}/>适宜饮用</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Drop: React.FC<{size?:number;color?:string}> = ({size=72,color=C.primary}) => (
  <svg width={size} height={size} viewBox="0 0 100 100"><path d="M50 7C38 27 20 45 20 65a30 30 0 0 0 60 0C80 45 62 27 50 7Z" fill={color}/><path d="M35 65c2 10 8 16 18 19" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" opacity=".7"/></svg>
);

const Reminder: React.FC = () => {
  const frame=useCurrentFrame();
  const local=frame-210;
  const p=spring({frame:local-18,fps:30,config:{damping:16,stiffness:100}});
  return <AbsoluteFill style={{opacity:fade(frame,210,330),fontFamily:font,padding:"220px 90px"}}>
    <Kicker>02 / SMART REMINDER</Kicker>
    <div style={{fontSize:68,fontWeight:800,color:C.text}}>饮水提醒</div>
    <div style={{fontSize:36,color:"#64748B",marginTop:18}}>久坐办公，也能按时补水</div>
    <div style={{marginTop:135,position:"relative",height:740}}>
      <div style={{position:"absolute",left:70,top:70,width:310,height:310,borderRadius:"50%",background:"linear-gradient(145deg,#E0F2FE,#F0FDFA)",display:"grid",placeItems:"center",boxShadow:"0 28px 65px rgba(14,165,233,.16)",transform:`scale(${.85+p*.15})`}}><Drop size={145}/></div>
      {[{t:"09:30",v:"晨间补水",c:C.primary},{t:"11:00",v:"该喝水啦",c:C.accent},{t:"14:30",v:"午后补水",c:C.warning}].map((item,i)=>{
        const q=spring({frame:local-12-i*18,fps:30,config:{damping:18,stiffness:105}});
        return <div key={item.t} style={{position:"absolute",left:340,top:15+i*170,width:545,height:138,borderRadius:32,background:"rgba(255,255,255,.92)",border:"1px solid rgba(148,163,184,.20)",boxShadow:"0 22px 55px rgba(30,41,59,.09)",display:"flex",alignItems:"center",padding:"0 34px",gap:25,opacity:q,transform:`translateX(${(1-q)*70}px)`}}>
          <div style={{width:14,height:14,borderRadius:"50%",background:item.c,boxShadow:`0 0 0 8px ${item.c}20`}}/>
          <div style={{fontSize:28,fontWeight:800,color:C.text,width:95}}>{item.t}</div>
          <div style={{fontSize:28,color:"#475569"}}>{item.v}</div>
          {i===1&&<div style={{marginLeft:"auto",padding:"9px 15px",borderRadius:20,background:"#DCFCE7",color:"#15803D",fontSize:18,fontWeight:700}}>NOW</div>}
        </div>;
      })}
      <div style={{position:"absolute",left:216,top:400,width:3,height:230,background:"#D7E5EE"}}><div style={{width:3,height:interpolate(local,[50,98],[0,230],clamp),background:`linear-gradient(${C.primary},${C.accent})`}}/></div>
      {[0,1,2].map(i=><div key={i} style={{position:"absolute",left:205,top:400+i*112,width:25,height:25,borderRadius:"50%",background:local>50+i*16?C.primary:"#CBD5E1",border:"6px solid #F6FAFF"}}/>)}
    </div>
  </AbsoluteFill>;
};

const Icon: React.FC<{kind:"commute"|"office"|"fitness";color:string}> = ({kind,color}) => {
  if(kind==="commute") return <svg width="82" height="82" viewBox="0 0 100 100"><rect x="22" y="12" width="56" height="73" rx="16" fill="none" stroke={color} strokeWidth="8"/><path d="M35 30h30M35 68h30" stroke={color} strokeWidth="8" strokeLinecap="round"/></svg>;
  if(kind==="office") return <svg width="82" height="82" viewBox="0 0 100 100"><rect x="12" y="18" width="76" height="53" rx="8" fill="none" stroke={color} strokeWidth="8"/><path d="M35 86h30M50 72v14" stroke={color} strokeWidth="8" strokeLinecap="round"/></svg>;
  return <svg width="82" height="82" viewBox="0 0 100 100"><path d="M15 43h15v18H15M85 43H70v18h15M30 34v36M70 34v36M30 52h40" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
};

const Scenarios: React.FC = () => {
  const frame=useCurrentFrame();
  const local=frame-330;
  const cards=[{name:"通勤",sub:"随行温度",kind:"commute" as const,color:C.primary},{name:"办公",sub:"定时补水",kind:"office" as const,color:C.secondary},{name:"健身",sub:"轻松畅饮",kind:"fitness" as const,color:C.accent}];
  return <AbsoluteFill style={{opacity:fade(frame,330,450),fontFamily:font,padding:"220px 90px"}}>
    <Kicker>03 / ALL DAY</Kicker>
    <div style={{fontSize:63,fontWeight:800,color:C.text}}>通勤 / 办公 / 健身</div>
    <div style={{fontSize:36,color:"#64748B",marginTop:18}}>一杯覆盖全天场景</div>
    <div style={{display:"flex",flexDirection:"column",gap:30,marginTop:105}}>{cards.map((card,i)=>{
      const p=spring({frame:local-10-i*18,fps:30,config:{damping:17,stiffness:105}});
      return <div key={card.name} style={{height:245,borderRadius:42,background:"rgba(255,255,255,.9)",border:"1px solid rgba(148,163,184,.18)",boxShadow:"0 25px 65px rgba(30,41,59,.08)",display:"flex",alignItems:"center",padding:"0 55px",opacity:p,transform:`translateY(${(1-p)*55}px)`}}>
        <div style={{width:130,height:130,borderRadius:34,background:`${card.color}12`,display:"grid",placeItems:"center"}}><Icon kind={card.kind} color={card.color}/></div>
        <div style={{marginLeft:48}}><div style={{fontSize:43,fontWeight:800,color:C.text}}>{card.name}</div><div style={{fontSize:27,color:"#64748B",marginTop:9}}>{card.sub}</div></div>
        <div style={{marginLeft:"auto",width:48,height:48,borderRadius:"50%",background:`${card.color}14`,display:"grid",placeItems:"center",color:card.color,fontSize:28}}>✓</div>
      </div>;
    })}</div>
  </AbsoluteFill>;
};

const Outro: React.FC = () => {
  const frame=useCurrentFrame();
  const local=frame-450;
  const p=spring({frame:local,fps:30,config:{damping:18,stiffness:90}});
  return <AbsoluteFill style={{opacity:interpolate(frame,[450,462,530,540],[0,1,1,0],clamp),fontFamily:font,alignItems:"center",paddingTop:185,textAlign:"center"}}>
    <Kicker>SMART BOTTLE</Kicker>
    <div style={{fontSize:69,fontWeight:800,color:C.text}}>智能水杯</div>
    <div style={{fontSize:38,color:"#475569",marginTop:22}}>让喝水变得更简单</div>
    <div style={{position:"relative",marginTop:95,width:650,height:850,display:"grid",placeItems:"center"}}>
      {[0,1,2].map(i=><div key={i} style={{position:"absolute",width:430+i*110,height:430+i*110,borderRadius:"50%",border:`${3-i}px solid ${i%2?"rgba(34,197,94,.24)":"rgba(14,165,233,.25)"}`,transform:`scale(${.75+p*.25}) rotate(${local*(i%2?-.25:.2)}deg)`,boxShadow:i===0?"0 0 80px rgba(14,165,233,.15)":"none"}}/>)}
      <div style={{zIndex:2,transform:`translateY(${(1-p)*60}px) scale(.82)`}}><Bottle temperature={42} glow/></div>
    </div>
  </AbsoluteFill>;
};

export const Sample007SmartBottleDemo: React.FC<Sample007SmartBottleDemoProps> = ({
  productName="智能温控水杯",
  heroSubtitle="看得见温度的每日饮水助手",
}) => <AbsoluteFill style={{backgroundColor:C.bg}}>
  <Background/>
  <Hero productName={productName} heroSubtitle={heroSubtitle}/>
  <Temperature/>
  <Reminder/>
  <Scenarios/>
  <Outro/>
</AbsoluteFill>;

