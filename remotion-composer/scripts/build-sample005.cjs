const fs = require("fs");
const path = require("path");
const {spawnSync} = require("child_process");

const composerDir = path.resolve(__dirname, "..");
const isV3 = process.argv.includes("--v3");
const compositionId = isV3 ? "Sample005V3" : "Sample005V2";
const previewName = isV3 ? "preview_v3.mp4" : "preview_v2.mp4";
const defaultSampleRoot = path.resolve(
  composerDir,
  "..",
  "..",
  "..",
  "New project_external",
  "video_samples",
  "sample_005_black_gold_coffee",
);
const sampleRoot = path.resolve(process.env.SAMPLE005_ROOT || defaultSampleRoot);
const outputPath = path.resolve(
  process.env.SAMPLE005_OUTPUT || path.join(sampleRoot, "04_video", previewName),
);
const intermediatePath = path.join(
  composerDir,
  "out",
  isV3 ? "sample005-v3.remotion.mp4" : "sample005-v2.remotion.mp4",
);
const remotionCli = path.join(
  composerDir,
  "node_modules",
  "@remotion",
  "cli",
  "remotion-cli.js",
);
const entryPoint = path.join(composerDir, "src", "index.tsx");
const propsPath = path.join(composerDir, "public", "demo-props", "sample005-v2.json");
const ffmpeg = process.env.FFMPEG_PATH || "ffmpeg";
const browserExecutable = process.env.REMOTION_BROWSER_EXECUTABLE;

const run = (command, args, label) => {
  console.log(`[sample005] ${label}`);
  const result = spawnSync(command, args, {
    cwd: composerDir,
    env: process.env,
    stdio: "inherit",
  });

  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(`${label} failed with exit code ${result.status}`);
  }
};

if (!fs.existsSync(remotionCli)) {
  throw new Error(`Remotion CLI is not installed: ${remotionCli}`);
}
if (!fs.existsSync(propsPath)) {
  throw new Error(`Sample005 props are missing: ${propsPath}`);
}

fs.mkdirSync(path.dirname(intermediatePath), {recursive: true});
fs.mkdirSync(path.dirname(outputPath), {recursive: true});

const remotionArgs = [
  remotionCli,
  "render",
  entryPoint,
  compositionId,
  intermediatePath,
  `--props=${propsPath}`,
  "--codec=h264",
  "--pixel-format=yuv420p",
  "--crf=18",
  "--overwrite",
];

if (browserExecutable) {
  remotionArgs.push(`--browser-executable=${path.resolve(browserExecutable)}`);
  console.log("[sample005] Using REMOTION_BROWSER_EXECUTABLE override");
}

run(process.execPath, remotionArgs, `Rendering ${compositionId} with Remotion`);

const ffmpegArgs = [
  "-y",
  "-hide_banner",
  "-loglevel",
  "warning",
  "-i",
  intermediatePath,
  "-map",
  "0:v:0",
  ...(isV3
    ? ["-map", "0:a:0", "-c:a", "aac", "-b:a", "160k"]
    : ["-an"]),
    "-c:v",
    "libx264",
    "-preset",
    "medium",
    "-crf",
    "18",
    "-vf",
    "format=yuv420p",
    "-pix_fmt",
    "yuv420p",
    "-color_range",
    "tv",
    "-colorspace",
    "bt709",
    "-color_primaries",
    "bt709",
    "-color_trc",
    "bt709",
    "-movflags",
    "+faststart",
    ...(isV3 ? ["-shortest"] : []),
    outputPath,
];

run(ffmpeg, ffmpegArgs, "Normalizing final MP4 to H.264 yuv420p");

fs.rmSync(intermediatePath, {force: true});
console.log(`[sample005] Output: ${outputPath}`);
