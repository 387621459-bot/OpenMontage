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

The build does not contain a machine-specific browser path. On a Windows host
that needs an installed Chrome override, set it for the current shell before
building:

```powershell
$env:REMOTION_BROWSER_EXECUTABLE = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
npm run build:sample005
```

Props live in `public/demo-props/sample005-v2.json`. Required image assets live
in `public/sample005-v2/` and are tracked with the composition.
