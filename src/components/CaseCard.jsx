const statusStyles = {
  CLOSED: {
    bg: 'bg-emerald-500/15',
    text: 'text-emerald-400',
    dot: 'bg-emerald-400',
  },
  ONGOING: {
    bg: 'bg-theme-glow/15',
    text: 'text-theme-glow',
    dot: 'bg-theme-glow',
  },
};

export default function CaseCard({ caseFile, theme = 'spiderman' }) {
  const { name, status, summary, tech, link } = caseFile;
  const glossy = theme === 'venom' ? 'venom-glossy' : 'spiderman-glossy';
  const badge = statusStyles[status] || statusStyles.ONGOING;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        group relative block rounded-xl p-5 sm:p-6
        ${glossy}
        border border-zinc-800
        transition-transform duration-300 ease-out
        hover:-translate-y-1.5
      `}
    >
      {/* Decorative corner borders */}
      <span className="pointer-events-none absolute top-0 left-0 h-5 w-5 border-t-2 border-l-2 border-theme-glow/40 rounded-tl-xl" />
      <span className="pointer-events-none absolute top-0 right-0 h-5 w-5 border-t-2 border-r-2 border-theme-glow/40 rounded-tr-xl" />
      <span className="pointer-events-none absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-theme-glow/40 rounded-bl-xl" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-theme-glow/40 rounded-br-xl" />

      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-display text-base sm:text-lg uppercase tracking-wide text-theme-text leading-tight">
          {name}
        </h3>

        {/* Status badge */}
        <span
          className={`
            inline-flex items-center gap-1.5 shrink-0
            rounded-full px-2.5 py-0.5
            font-mono text-[10px] tracking-widest uppercase
            ${badge.bg} ${badge.text}
          `}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${badge.dot}`} />
          {status}
        </span>
      </div>

      {/* Summary */}
      <p className="text-sm leading-relaxed text-zinc-400 mb-4">
        {summary}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tech.map((t) => (
          <span
            key={t}
            className="rounded-full border border-zinc-700 bg-zinc-800/50 px-2.5 py-0.5 font-mono text-[11px] text-zinc-400"
          >
            {t}
          </span>
        ))}
      </div>

      {/* External link hint */}
      <div className="flex justify-end">
        <span className="font-mono text-xs text-zinc-600 group-hover:text-theme-glow transition-colors duration-200">
          View Project ↗
        </span>
      </div>
    </a>
  );
}
