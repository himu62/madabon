import { useState } from "react";

function Versions(): React.ReactElement {
  const [versions] = useState(window.electron.process.versions);
  const [packageVersions] = useState(window.packageVersions);

  return (
    <ul className="versions">
      <li className="electron-version">Electron v{versions.electron}</li>
      <li className="chrome-version">Chromium v{versions.chrome}</li>
      <li className="node-version">Node v{versions.node}</li>
      <li>React v{packageVersions.react}</li>
    </ul>
  );
}

export default Versions;
