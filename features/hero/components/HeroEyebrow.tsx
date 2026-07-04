type HeroEyebrowProps = {
  text: string;
};

export default function HeroEyebrow({ text }: HeroEyebrowProps) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="h-px w-8 bg-lilian-purple/40" aria-hidden="true" />
      <span className="text-[11px] md:text-xs font-chronica font-bold uppercase tracking-[0.2em] text-lilian-purple">
        {text}
      </span>
      <span className="h-px w-8 bg-lilian-purple/40" aria-hidden="true" />
    </div>
  );
}
