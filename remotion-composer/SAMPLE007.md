# Sample 007 — Smart Bottle Product Demo

18 秒、1080×1920、30fps 的纯 Remotion 智能温控水杯产品介绍视频。
水杯轮廓、温度 UI、饮水提醒和场景卡片均由代码绘制，不依赖外部素材。

## Build

构建前必须在当前 PowerShell 会话指定已安装的 Chrome：

```powershell
$env:REMOTION_BROWSER_EXECUTABLE = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
npm run build:sample007
```

构建会先调用 `scripts/remotion-browser-preflight.cjs`。变量缺失或路径无效时会
快速失败，不进入 Remotion browser management。浏览器路径不会硬编码到构建脚本。

输出：`D:\360Downloads\New project_external\video_samples\sample_007_smart_bottle_product_demo\04_video\preview_v1.mp4`

