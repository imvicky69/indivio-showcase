// src/components/WhyIndivioHero.tsx
import Image from 'next/image';
import SplitText from '../ui/SplitText';
const heroImageUrl = '/indivio.png';


const prop = {
  text: "Built for Education. Backed by Technology. Driven by Partnership.",
  className: "max-w-4xl font-display text-4xl font-bold text-foreground sm:text-5xl md:text-6xl",
  Tag: 'h1' ,
  
};
export function WhyIndivioHero() {
	return (
		<section className="bg-hero-gradient pb-20 pt-32 sm:pb-28 sm:pt-40">
			<div className="container mx-auto px-6 text-center">
				<div className="mx-auto mb-8 flex h-32 w-48 flex-row items-center justify-center">
					<Image
						src={heroImageUrl}
						alt="Indivio Hero"
						width={200}
						height={50}
					/>
				</div>

				<div className="mx-auto max-w-4xl">
					<SplitText {...prop} />
					<p className="text-dark/70 mt-6 font-sans text-lg md:text-xl">
						At Indivio, we&apos;re on a mission to give every school in India a
						digital identity that&apos;s powerful, affordable, and ready for the
						future.
					</p>
				</div>
			</div>
		</section>
	);
}
