/** Bloc de commandes (Roboto Mono 13 px) dans une case blanche cerclée. */
export function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="mt-2 overflow-x-auto border-frame border-ink bg-panel p-4 font-mono text-code text-ink">
      <code>{code}</code>
    </pre>
  );
}
