import { NextPage } from "next";
import Head from "next/head";
import React from "react";

const Page: NextPage = () => {
  const versions = window.versions;

  return (
    <React.Fragment>
      <Head>
        <title>madabon</title>
      </Head>
      <div>
        <p>
          <ul>
            <li>Node: v{versions.node}</li>
            <li>Chrome: v{versions.chrome}</li>
            <li>Electron: v{versions.electron}</li>
            <li>Next: v{versions.next}</li>
            <li>React: v{versions.react}</li>
          </ul>
        </p>
      </div>
    </React.Fragment>
  );
};
export default Page;
