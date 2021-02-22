import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "../pages/styles.module.css";
import classnames from "classnames";

const features = [
  {
    title: <>Powered by Svelte</>,
    imageUrl: "img/undraw_building_websites.svg",
    description: (
      <>
        With Svelte NodeGui, you can build truly native apps with Svelte. If you
        dont want to use Svelte, there is also a pure{" "}
        <a href="https://nodegui.org">JavaScript based version</a>.
      </>
    )
  },
  {
    title: <>Open Source</>,
    imageUrl: "img/undraw_code_review.svg",
    description: (
      <>
        Svelte NodeGui is an open source project maintained by an active
        community of contributors.
      </>
    )
  },
  {
    title: <> Cross Platform</>,
    imageUrl: "img/undraw_windows.svg",
    description: (
      <>
        Svelte NodeGui apps build and run on Mac, Windows, and Linux platforms.
      </>
    )
  }
];
export const Features = () => {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {features.map(({ imageUrl, title, description }, idx) => (
            <div key={idx} className={classnames("col col--4", styles.feature)}>
              {imageUrl && (
                <div className="text--center">
                  <img
                    className={styles.featureImage}
                    src={useBaseUrl(imageUrl)}
                    alt={title}
                  />
                </div>
              )}
              <h3 className="text--center">{title}</h3>
              <p className="text--center">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
