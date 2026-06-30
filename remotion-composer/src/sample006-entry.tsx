import React from "react";
import {Composition, registerRoot} from "remotion";
import {Sample006WorkbenchPromo} from "./Sample006WorkbenchPromo";

const Sample006Root: React.FC = () => (
  <Composition
    id="Sample006WorkbenchPromo"
    component={Sample006WorkbenchPromo}
    durationInFrames={540}
    fps={30}
    width={1080}
    height={1920}
    defaultProps={{
      title: "AI Video Workbench",
      subtitle: "从一句需求，到一条完整样片",
    }}
  />
);

registerRoot(Sample006Root);

