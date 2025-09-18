// src/components/PageHero.tsx

type PageHeroProps = {
  title: string;
  subtitle: string;
};

export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="bg-hero-gradient pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary font-display">
            {title}
          </h1>
          <p className="mt-6 text-lg text-dark/70 font-sans">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}