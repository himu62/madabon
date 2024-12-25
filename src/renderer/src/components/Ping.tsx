import { useState, useEffect } from "react";

const Ping: React.FC = () => {
  const [pong, setPong] = useState("");

  useEffect(() => {
    (async (): Promise<void> => {
      const response = await window.electron.ipcRenderer.invoke("ping");
      setPong(response);
    })();
  }, []);

  return (
    <div>
      <h1>{pong}</h1>
    </div>
  );
};
export default Ping;
