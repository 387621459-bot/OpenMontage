const fs = require("fs");
const path = require("path");

const COMMON_CHROME_PATHS = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
];

const isFile = (candidate) => {
  try {
    return fs.statSync(candidate).isFile();
  } catch {
    return false;
  }
};

const preflightRemotionBrowser = () => {
  const configured = process.env.REMOTION_BROWSER_EXECUTABLE?.trim();

  if (configured) {
    const executable = path.resolve(configured);
    if (!isFile(executable)) {
      console.error(`[ERROR] REMOTION_BROWSER_EXECUTABLE does not point to a file: ${executable}`);
      throw new Error("Remotion browser preflight failed");
    }

    console.log(`[OK] Remotion browser executable: ${executable}`);
    return executable;
  }

  console.error("[ERROR] REMOTION_BROWSER_EXECUTABLE is not set.");
  const detected = COMMON_CHROME_PATHS.find(isFile);

  if (detected) {
    console.error(`[INFO] Chrome was found at: ${detected}`);
    console.error("[INFO] Set it for the current PowerShell session before building:");
    console.error(`$env:REMOTION_BROWSER_EXECUTABLE = '${detected}'`);
  } else {
    console.error("[ERROR] Chrome was not found in the common installation locations.");
    console.error("[INFO] Set REMOTION_BROWSER_EXECUTABLE to an existing Chrome or Chromium executable.");
  }

  console.error("[ERROR] Build stopped before Remotion browser management could start.");
  throw new Error("Remotion browser preflight failed");
};

module.exports = {preflightRemotionBrowser};

if (require.main === module) {
  try {
    preflightRemotionBrowser();
  } catch {
    process.exitCode = 1;
  }
}

