// src/features/work/ExperienceItem.tsx
interface LinkItem {
  label: string;
  url: string;
}

interface Props {
  date: string;
  institution: string;
  role: string;
  description: string;
  links?: LinkItem[];
}

export const ExperienceItem = ({
  date,
  institution,
  role,
  description,
  links,
}: Props) => {
  return (
    <div className="relative group">
      {/* Timeline Dot */}
      <div className="absolute -left-[53px] top-2 w-2 h-2 rounded-full bg-white/20 group-hover:bg-white transition-colors" />

      <div className="space-y-4">
        {/* H6 - Satoshi Bold 14px for the date */}
        <h6>{date}</h6>

        <div className="space-y-2">
          {/* H2 - Chillax 60px for the Company/School */}
          <h2 className="text-white">{institution}</h2>

          {/* H5 - Borel 20px for the Role */}
          <h5 className="text-zinc-400">{role}</h5>
        </div>

        {/* Body Secondary - Satoshi Regular 18px */}
        <p className="body-secondary max-w-3xl">{description}</p>

        {/* Action Links using H6 style */}
        {links && (
          <div className="flex gap-6 pt-4">
            {links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                className="h6 text-[#45A163] hover:text-white transition-colors flex items-center gap-2"
              >
                {link.label} <span>→</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
