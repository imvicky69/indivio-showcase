// src/components/HeroSection.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/Button';
import SplitText from '../ui/SplitText';

// 1) Exported prop/type definition
export type HeroSectionProps = React.HTMLAttributes<HTMLElement> & {
	title?: string;
	description?: string;
	imageSrc?: string;
	imageAlt?: string;
	imageWidth?: number;
	imageHeight?: number;
	primaryHref?: string;
	primaryLabel?: string;
	secondaryHref?: string;
	secondaryLabel?: string;
};

// 2) Consts / defaults used by the component (kept together)
const DEFAULT_TITLE = 'Your All-in-One School Website & Management Portal.';
const DEFAULT_DESCRIPTION =
	'We handle the technology so you can focus on education. Effortlessly manage admissions, fees, and parent communication.';
const DEFAULT_IMAGE = '/fevicon.png';
const DEFAULT_IMAGE_ALT = 'Indivio';
const DEFAULT_IMAGE_WIDTH = 400;
const DEFAULT_IMAGE_HEIGHT = 200;
const DEFAULT_PRIMARY_HREF = '/demo';
const DEFAULT_PRIMARY_LABEL = 'See a live example';
const DEFAULT_SECONDARY_HREF = '/booking';
const DEFAULT_SECONDARY_LABEL = 'Book Your site Now';
const SPLIT_CLASSNAME =
	'max-w-4xl font-display text-4xl font-bold text-foreground sm:text-5xl md:text-6xl';

// 3) Clean, minimal exported component (uses the constants above)
export function HeroSection({
	title = DEFAULT_TITLE,
	description = DEFAULT_DESCRIPTION,
	imageSrc = DEFAULT_IMAGE,
	imageAlt = DEFAULT_IMAGE_ALT,
	imageWidth = DEFAULT_IMAGE_WIDTH,
	imageHeight = DEFAULT_IMAGE_HEIGHT,
	primaryHref = DEFAULT_PRIMARY_HREF,
	primaryLabel = DEFAULT_PRIMARY_LABEL,
	secondaryHref = DEFAULT_SECONDARY_HREF,
	secondaryLabel = DEFAULT_SECONDARY_LABEL,
	className,
	...rest
}: HeroSectionProps) {
	const splitProps = {
		text: title,
		className: SPLIT_CLASSNAME,
		Tag: 'h1' as const,
	};

	return (
		<section
			className={`${className ?? ''} flex min-h-screen items-center justify-center bg-hero-gradient pb-12 pt-24`}
			{...rest}
		>
			<div className="container mx-auto px-6 text-center">
				<div
					id="hero-image"
					className="mb-8 flex flex-col items-center justify-center gap-3 sm:gap-4"
				>
					<div
						className="relative mb-6"
						style={{ width: imageWidth, height: imageHeight }}
					>
						<Image
							src={imageSrc}
							alt={imageAlt}
							fill
							className="object-contain"
						/>
					</div>

					<SplitText {...splitProps} />
				</div>

				<p className="mx-auto max-w-2xl font-sans text-lg text-muted-foreground md:text-xl">
					{description}
				</p>

				<div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
					<Button href={secondaryHref} variant="secondary">
						{secondaryLabel}
					</Button>

					<Button href={primaryHref} variant="primary">
						{primaryLabel}
					</Button>
				</div>
			</div>
		</section>
	);
}

export default HeroSection;
