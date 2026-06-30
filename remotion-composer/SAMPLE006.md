# Sample 006 — AI Video Workbench Promo

18 秒、1080×1920、30fps 的纯 Remotion 科技感工具宣传片，不依赖外部素材。

## Build

```powershell
npm run build:sample006
```

输出：`D:\360Downloads\New project_external\video_samples\sample_006_ai_video_workbench_promo\04_video\preview_v1.mp4`

## 浏览器预检

构建会先运行 `scripts/remotion-browser-preflight.cjs`。显式指定已有 Chrome
可以绕过 Remotion 默认 browser management 的下载或长时间等待。预检只验证，
不会自动写入环境变量，也不会把本机浏览器路径作为固定配置写进构建脚本。

在当前 PowerShell 会话中设置后再构建：

```powershell
$env:REMOTION_BROWSER_EXECUTABLE = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
npm run build:sample006
```

如果未设置，预检会检查常见 Chrome 安装位置并输出可复制的设置命令，然后在
进入 Remotion 前快速失败。若绕过预检且不设置该变量，构建可能卡在 Remotion
browser management 阶段。
