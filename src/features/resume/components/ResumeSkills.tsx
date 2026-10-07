import type { SkillGroupData, SkillIcon } from "../../../domain/models/Resume";
import { Pill } from "../../../components/ui/Pill";
import { Text } from "../../../components/ui/Text";
import unrealUrl from "@/assets/svg/resume/unreal.svg";
import unityUrl from "@/assets/svg/resume/unity.svg";

const ICONS: Record<SkillIcon, string> = {
  unreal: unrealUrl,
  unity: unityUrl,
};

export const ResumeSkills = ({ groups }: { groups: SkillGroupData[] }) => (
  <section className="flex flex-col gap-10 lg:gap-[54px]">
    <Text variant="h1" trim className="text-wheat">
      Skills &amp; Tools
    </Text>

    <div className="flex flex-col gap-12 lg:gap-[54px] lg:pl-[45px]">
      {groups.map((group) => (
        <div key={group.title} className="flex flex-col gap-6 lg:gap-[35px]">
          <Text variant="label" as="h3" trim className="text-secondary">
            {group.title}
          </Text>
          <ul className="flex flex-wrap gap-x-4 gap-y-4 lg:gap-x-[clamp(24px,3.6vw,65px)] lg:gap-y-8">
            {group.skills.map((skill) => (
              <li key={skill.name}>
                <Pill
                  variant="skill"
                  icon={
                    skill.icon && (
                      <img src={ICONS[skill.icon]} alt="" className="size-full" />
                    )
                  }
                >
                  {skill.name}
                </Pill>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);
