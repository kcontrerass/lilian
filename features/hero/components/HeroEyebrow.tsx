type HeroEyebrowProps = {
  text: string;
};

export default function HeroEyebrow({ text }: HeroEyebrowProps) {
  return (
    <div className="flex items-center gap-4 mb-[2.6cqh] sm:mb-[2.4cqh] md:mb-[2.1cqh] lg:mb-[1.9cqh]">
      <span className="h-px w-12 bg-lilian-purple/40" aria-hidden="true" />
      <span className="text-[2.6cqh] font-chronica font-bold uppercase tracking-[0.2em] text-lilian-purple">
        {text}
      </span>
      <span className="h-px w-12 bg-lilian-purple/40" aria-hidden="true" />
    </div>
  );
}
