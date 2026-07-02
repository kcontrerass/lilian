interface DecorativeArrowProps {
  className?: string;
}

export default function DecorativeArrow({ className }: DecorativeArrowProps) {
  return (
    <div className={`w-[100px] sm:w-[150px] h-[40px] sm:h-[60px] relative hidden sm:block opacity-50 ${className ?? ""}`}>
      <svg
        viewBox="0 0 100 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-[#e2b18a]"
      >
        <path
          d="M10 20 Q 30 5 50 20 T 90 20"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path d="M30 13 Q 40 5 50 13 Z" fill="currentColor" />
        <path d="M60 27 Q 70 35 80 27 Z" fill="currentColor" />
        <path d="M20 25 Q 25 35 30 25 Z" fill="currentColor" />
        <path d="M70 15 Q 75 5 80 15 Z" fill="currentColor" />
      </svg>
    </div>
  );
}
