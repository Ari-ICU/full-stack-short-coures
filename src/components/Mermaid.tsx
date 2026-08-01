"use client";

import React, { useEffect, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  securityLevel: "loose",
});

export function Mermaid({ chart }: { chart: string }) {
  const [svg, setSvg] = useState<string>("");
  // Create a unique ID for each chart instance
  const [id] = useState(() => `mermaid-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    // Render the chart to an SVG string
    mermaid.render(id, chart).then((result) => {
      setSvg(result.svg);
    }).catch((e) => {
      console.error("Mermaid parsing error", e);
      setSvg(`<p class="text-red-500">Error rendering diagram</p>`);
    });
  }, [chart, id]);

  if (!svg) {
    return <div className="text-gray-500 my-4 p-4 border border-gray-200 rounded-md bg-gray-50 text-center animate-pulse">Loading diagram...</div>;
  }

  return (
    <div 
      className="flex justify-center my-8 not-prose overflow-x-auto bg-white p-4 rounded-xl shadow-sm border border-gray-100"
      dangerouslySetInnerHTML={{ __html: svg }} 
    />
  );
}
