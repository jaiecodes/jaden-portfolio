interface SkillGroupProps {
  title: string;
  skills: string[];
}

const SkillPill = ({ name }: { name: string }) => (
  <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full outline outline-1 outline-[#DD8B2D] -outline-offset-1 bg-white/[0.02] hover:bg-white/[0.06] transition-all">
    <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#DD8B2D] cto-[#78B34D]" />
    <span className="h6 text-[#C8C8C5] tracking-widest">{name}</span>
  </div>
);

const SkillGroup = ({ title, skills }: SkillGroupProps) => (
  <div className="space-y-6">
    <h5 className="text-[#DD8B2D] uppercase tracking-wider ">{title}</h5>
    <div className="flex flex-wrap gap-4">
      {skills.map((skill) => (
        <SkillPill key={skill} name={skill} />
      ))}
    </div>
  </div>
);

export const ResumeSkills = () => {
  return (
    <section className="space-y-16 pt-16 border-t border-white/10">
      <h3 className="text-[#D1AA5A]">Skills & Tools</h3>

      <div className="space-y-12">
        <SkillGroup
          title="Engines & Real-Time"
          skills={[
            "Unreal Engine 5",
            "Unity",
            "C++",
            "Slate UI",
            "Shader Graph",
          ]}
        />
        <SkillGroup
          title="Hardware & Embedded"
          skills={[
            "Raspberry Pi",
            "CANbus Telemetry",
            "Kvaser Hardware",
            "SenseHat IMU",
          ]}
        />
        <SkillGroup
          title="Web & APIs"
          skills={[
            "React",
            "Next.js",
            "Tailwind CSS",
            "TypeScript",
            "Supabase",
          ]}
        />
        <SkillGroup
          title="Languages & Tools"
          skills={["C++", "Python", "Git", "Blender API", "FreeCAD", "Figma"]}
        />
      </div>
    </section>
  );
};
