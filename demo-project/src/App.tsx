import { createHighlighter } from "shiki";
import * as prettier from "prettier";
import htmlPlugin from "prettier/plugins/html";
import { useEffect, useRef, useState } from "react";
import { RenderDemo } from "./demo";

const highlighter = createHighlighter({
  langs: ["html"],
  themes: ["github-dark"],
});

async function formatHtml(html: string) {
  return prettier.format(html, {
    parser: "html",
    plugins: [htmlPlugin],
    printWidth: 80,
    htmlWhitespaceSensitivity: "ignore",
  });
}

function App() {
  const [htmlCode, setHtmlCode] = useState("");
  const htmlContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = htmlContentRef.current;
    if (!element) return;

    const updateHtmlCode = () => setHtmlCode(element.innerHTML);
    updateHtmlCode();

    // React commits DOM changes, so observe those commits instead of polling.
    const observer = new MutationObserver(updateHtmlCode);
    observer.observe(element, {
      childList: true,
      characterData: true,
      attributes: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="demo-layout">
      <section className="demo-preview" aria-label="Rendered React demo">
        <div id="html-content" ref={htmlContentRef}>
          <RenderDemo />
        </div>
      </section>
      <section className="code-preview" aria-label="Generated HTML">
        <HTMLShikiSyntax htmlCode={htmlCode} />
      </section>
    </div>
  );
}

function HTMLShikiSyntax({ htmlCode }: { htmlCode: string }) {
  const [highlightedHtml, setHighlightedHtml] = useState("");

  useEffect(() => {
    let cancelled = false;

    const highlightHtml = async () => {
      const formattedHtml = await formatHtml(htmlCode);
      const instance = await highlighter;

      if (!cancelled) {
        setHighlightedHtml(
          instance.codeToHtml(formattedHtml, {
            lang: "html",
            theme: "github-dark",
          }),
        );
      }
    };

    void highlightHtml();

    return () => {
      cancelled = true;
    };
  }, [htmlCode]);

  return highlightedHtml ? (
    <div
      className="html-code"
      dangerouslySetInnerHTML={{ __html: highlightedHtml }}
    />
  ) : null;
}

export default App;
