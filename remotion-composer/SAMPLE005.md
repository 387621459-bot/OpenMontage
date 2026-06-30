# Sample005V2 Remotion workflow

`Sample005V2` is registered in the main `src/Root.tsx`, so it is available in
the normal Remotion Studio:

```powershell
npm start
```

Build the final 18-second vertical preview with:

```powershell
npm run build:sample005
```

The build renders through the main `src/index.tsx` entry and then normalizes the
result with FFmpeg to H.264 `yuv420p`. By default, the output is written to the
sibling workspace layout at:

```text
New project_external/video_samples/sample_005_black_gold_coffee/04_video/preview_v2.mp4
```

Optional environment variables:

- `SAMPLE005_ROOT`: override the sample project root.
- `SAMPLE005_OUTPUT`: override the final MP4 path.
- `REMOTION_BROWSER_EXECUTABLE`: use a specific Chrome/Chromium executable when
  Remotion's default browser management is unavailable.
- `FFMPEG_PATH`: override the FFmpeg executable.

The build runs `scripts/remotion-browser-preflight.cjs` before Remotion starts.
An explicit browser path avoids long waits in Remotion browser management. The
preflight validates the path and fails immediately when it is missing or
invalid; it never changes the environment automatically.

The build does not contain a machine-specific browser path. Set the executable
for the current PowerShell session before building:

```powershell
$env:REMOTION_BROWSER_EXECUTABLE = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
npm run build:sample005
```

If the variable is not set, the preflight checks common Chrome installation
locations, prints a suggested PowerShell command when Chrome is found, and
stops before rendering. Running Remotion without this override can stall in its
default browser management stage.

Props live in `public/demo-props/sample005-v2.json`. Required image assets live
in `public/sample005-v2/` and are tracked with the composition.
