// src/features/about/AboutLearning.tsx

const CURRENT_TOPICS = [
  {
    title: "Unreal Engine 5 Architecture",
    description:
      "Diving deep into Slate UI and MVVM patterns for custom engine tools.",
    status: "Active",
  },
  {
    title: "Real-time Raytracing",
    description:
      "Studying light transport algorithms and their implementation in C++.",
    status: "Exploring",
  },
  {
    title: "Artisanal Pâtisserie",
    description:
      "Perfecting temperature-controlled fermentation for the bakery project.",
    status: "Side Quest",
  },
];

export const AboutLearning = () => {
  return (
    <section className="space-y-12">
      <div className="max-w-2xl">
        <h3 className="uppercase mb-4">What I'm Learning</h3>
        <p className="text-zinc-400">
          I believe the best engineers are the ones who never stop being
          students. Here is what is currently on my desk and in my browser tabs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {CURRENT_TOPICS.map((topic) => (
          <div
            key={topic.title}
            className="p-8 border border-white/10 rounded-2xl bg-white/5 space-y-4"
          >
            <h6 className="text-[#45A163] uppercase tracking-widest">
              {topic.status}
            </h6>
            <h5>{topic.title}</h5>
            <p className="body-secondary text-zinc-400">{topic.description}</p>
          </div>
        ))}
      </div>

      {/* Reading List Mini-Feature */}
      <div className="pt-12 border-t border-white/5">
        <h4>Currently Reading</h4>
        <ul className="space-y-4">
          <li className="flex items-center gap-4 text-zinc-300">
            <div className="w-2 h-2 rounded-full bg-[#EFC139]" />
            <span className="body-secondary">
              "Physically Based Rendering: From Theory To Implementation"
            </span>
          </li>
          <li className="flex items-center gap-4 text-zinc-300">
            <div className="w-2 h-2 rounded-full bg-[#C27927]" />
            <span className="body-secondary">
              "The Art of Game Design: A Book of Lenses"
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
};
