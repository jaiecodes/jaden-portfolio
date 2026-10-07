interface Props {
  role: string;
  institution: string;
  date: string;
  institutionColor?: string;
  accentBorderColor?: string;
  cardBgColor?: string;
  contextText: string;
  outcomeText: string;
  tags: string[];
  linkUrl?: string;
}

export const ExperienceItem = ({
  role,
  institution,
  date,
  institutionColor = "#4DB36F",
  accentBorderColor = "#4DB36F",
  cardBgColor = "rgba(77, 179, 111, 0.05)",
  contextText,
  outcomeText,
  tags,
  linkUrl,
}: Props) => {
  return (
    <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 py-6 border-b border-white/5 last:border-b-0">
      {/* Col 1: Role & Organization */}
      <div className="w-full lg:w-[380px] space-y-2">
        <h2 className="text-white uppercase leading-snug">{role}</h2>
        <h5
          style={{ color: institutionColor }}
          className="uppercase tracking-wider"
        >
          {institution}
        </h5>
      </div>

      {/* Col 2: Date */}
      <div className="text-white font-bold text-2xl lg:text-3xl font-satoshi tracking-tight">
        {date}
      </div>

      {/* Col 3: Accent Outcome Card */}
      <div
        className="w-full lg:w-[540px] p-5 rounded-xl border-2 border-[#DD8B2D] space-y-5 transition-transform duration-300 hover:scale-[1.01]"
        style={{
          backgroundColor: cardBgColor,
          boxShadow: "-5px 5px 12.5px rgba(0, 0, 0, 0.25) inset",
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <p className="body-secondary text-zinc-300 font-semibold leading-relaxed">
            {contextText}
            <br />
            <span className="text-white">→ {outcomeText}</span>
          </p>

          {linkUrl && (
            <a
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:opacity-80 transition-opacity flex-shrink-0"
              aria-label="View Project"
            >
              <svg width="23" height="23" viewBox="0 0 23 23" fill="none">
                <path
                  d="M23 14.029C23 14.6325 22.5107 15.1217 21.9072 15.1217C21.3037 15.1217 20.8145 14.6325 20.8145 14.029V3.73093L1.86542 22.68C1.43867 23.1067 0.746807 23.1067 0.320063 22.68C-0.106688 22.2532 -0.106688 21.5613 0.320063 21.1345L19.2691 2.18552H8.81495C8.21143 2.18552 7.72218 1.69627 7.72218 1.09276C7.72218 0.489245 8.21143 0 8.81495 0H21.9072C22.5108 0 23 0.489245 23 1.09276V14.029Z"
                  fill={accentBorderColor}
                />
              </svg>
            </a>
          )}
        </div>

        {/* Tech / Tag Badges */}
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <div
              key={tag}
              className="px-3.5 py-1 rounded-md text-xs font-bold font-satoshi uppercase tracking-wider"
              style={{
                color: accentBorderColor,
                borderLeft: `3px solid ${accentBorderColor}`,
                borderRight: `3px solid ${accentBorderColor}`,
                backgroundColor: "rgba(255, 255, 255, 0.02)",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
