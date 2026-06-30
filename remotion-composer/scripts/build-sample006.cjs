const fs = require("fs");
const path = require("path");
const {spawnSync} = require("child_process");

const composerDir = path.resolve(__dirname, "..");
const sampleRoot = path.resolve(
  process.env.SAMPLE006_ROOT ||
    "D:\\360Downloads\\New project_external\\video_samples\\sample_006_ai_video_workbench_promo",
);
const outputPath = path.resolve(
  process.env.SAMPLE006_OUTPUT || path.join(sampleRoot, "04_video", "preview_v1.mp4"),
);
const intermediatePath = path.join(composerDir, "out", "sample006.remotion.mp4");
const timingPath = path.join(sampleRoot, "05_report", "build_timings.json");
const remotionCli = path.join(composerDir, "node_modules", "@remotion", "cli", "remotion-cli.js");
const entryPoint = path.join(composerDir, "src", "sample006-entry.tsx");
const propsPath = path.join(composerDir, "public", "demo-props", "sample006-workbench-promo.json");
const browserExecutable = process.env.REMOTION_BROWSER_EXECUTABLE;
const ffmpeg = process.env.FFMPEG_PATH || "ffmpeg";

const run = (command, args, label) => {
  console.log(`[sample006] ${label}`);
  const started = Date.now();
  const result = spawnSync(command, args, {cwd: composerDir, env: process.env, stdio: "inherit"});
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${label} failed with exit code ${result.status}`);
  return (Date.now() - started) / 1000;
};

fs.mkdirSync(path.dirname(outputPath), {recursive: true});
fs.mkdirSync(path.dirname(intermediatePath), {recursive: true});
const remotionArgs = [
  remotionCli, "render", entryPoint, "Sample006WorkbenchPromo", intermediatePath,
  `--props=${propsPath}`, "--codec=h264", "--pixel-format=yuv420p", "--crf=18", "--overwrite",
];
if (browserExecutable) {
  remotionArgs.push(`--browser-executable=${path.resolve(browserExecutable)}`);
  console.log("[sample006] Using REMOTION_BROWSER_EXECUTABLE override");
}

const renderSeconds = run(process.execPath, remotionArgs, "Rendering 540 frames with Remotion");
const postSeconds = run(ffmpeg, [
  "-y", "-hide_banner", "-loglevel", "warning", "-i", intermediatePath,
  "-map", "0:v:0", "-an", "-c:v", "libx264", "-preset", "medium", "-crf", "18",
  "-vf", "scale=in_range=full:out_range=tv,format=yuv420p", "-pix_fmt", "yuv420p", "-color_range", "tv", "-colorspace", "bt709",
  "-color_primaries", "bt709", "-color_trc", "bt709", "-movflags", "+faststart", outputPath,
], "Normalizing final MP4 to H.264 yuv420p");

fs.writeFileSync(timingPath, JSON.stringify({renderSeconds, postSeconds}, null, 2));
fs.rmSync(intermediatePath, {force: true});
console.log(`[sample006] Output: ${outputPath}`);
