import React from "react";
import {Composition, registerRoot} from "remotion";
import {Sample007SmartBottleDemo} from "./Sample007SmartBottleDemo";

const Sample007Root: React.FC = () => (
  <Composition
    id="Sample007SmartBottleDemo"
    component={Sample007SmartBottleDemo}
    durationInFrames={540}
    fps={30}
    width={1080}
    height={1920}
    defaultProps={{
      productName: "智能温控水杯",
      heroSubtitle: "看得见温度的每日饮水助手",
    }}
  />
);

registerRoot(Sample007Root);

