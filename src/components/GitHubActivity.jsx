import { useState } from 'react';

const themeConfig = {
  spiderman: {
    filter: 'hue-rotate(200deg) saturate(1.8) brightness(1.1)',
    containerBg: 'bg-zinc-900/60',
    border: 'border-zinc-800',
    headerText: 'text-zinc-500',
    linkColor: 'text-blue-400 hover:text-blue-300',
  },
  venom: {
    filter: 'grayscale(1) contrast(1.4) brightness(1.2)',
    containerBg: 'bg-zinc-950/60',
    border: 'border-zinc-800',
    headerText: 'text-zinc-500',
    linkColor: 'text-zinc-400 hover:text-zinc-300',
  },
};

export default function GitHubActivity({ theme = 'spiderman', username = 'divyashrma18' }) {
  const config = themeConfig[theme] || themeConfig.spiderman;
  const [imgError, setImgError] = useState(false);
  const chartUrl = `https://ghchart.rshah.org/${username}`;
  const profileUrl = `https://github.com/${username}`;

  return (
    <section className="w-full">
      {/* Section header */}
      <div className={`flex items-center gap-4 mb-6 border-b ${config.border} pb-3`}>
        <span className={`font-mono text-xs tracking-widest uppercase ${config.headerText}`}>
          02 / GitHub Activity
        </span>
      </div>

      {/* Chart container */}
      <div
        className={`rounded-xl ${config.containerBg} ${config.border} border p-4 sm:p-6 overflow-hidden`}
      >
        {imgError ? (
          <div className={`font-mono text-sm ${config.headerText} text-center py-8`}>
            Unable to load contribution graph.
          </div>
        ) : (
          <img
            src={chartUrl}
            alt={`${username}'s GitHub contribution graph`}
            className="w-full h-auto rounded-md"
            style={{ filter: config.filter }}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        )}

        {/* View on GitHub link */}
        <div className="mt-4 flex justify-end">
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-mono text-xs tracking-wide ${config.linkColor} transition-colors duration-200`}
          >
            View on GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}
