// src/features/about/AboutInterests.tsx
export const AboutInterests = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <h3>capturing moments</h3>
        <p className=" text-zinc-400 ">
          outside of code, i spend my time behind a lens. photography helps me
          understand lighting and composition—skills that directly translate
          back into my rendering projects.
        </p>
      </div>

      {/* Photography Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Replace with your actual images */}
        <div className="aspect-square bg-zinc-800 rounded-lg overflow-hidden border border-white/10">
          <img
            src="/path-to-me-with-camera.jpg"
            alt="Jaden with camera"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="aspect-square bg-zinc-800 rounded-lg overflow-hidden border border-white/10">
          <img
            src="/path-to-photo-1.jpg"
            alt="Photography work"
            className="object-cover h-full w-full"
          />
        </div>
      </div>
    </section>
  );
};
