// Vector redraw of the Panyam fort mark, used for line-draw animations.
// For static brand display always prefer the supplied logo file.
import type { SVGProps } from "react";

export const FORT_PATH =
  "M592 892 L632 480 Q640 462 673 447 Q712 462 715 485 L715 522 Q745 510 774 504 L774 447 Q780 425 816 409 Q852 425 857 447 L857 487 Q887 483 916 481 L916 437 Q925 415 950 404 L950 281 L967 281 L967 404 Q995 415 999 437 L999 481 Q1029 483 1059 487 L1059 447 Q1064 425 1100 409 Q1136 425 1142 447 L1142 504 Q1172 510 1202 522 L1202 485 Q1206 462 1243 447 Q1276 462 1285 480 L1322 890 Z";
export const FLAG_PATH = "M977 281 Q1010 300 1050 295 Q1100 290 1122 314 Q1080 315 1050 335 Q1015 357 977 352 Z";
export const SPIRAL_PATH = "M858 895 V694 A100 100 0 0 1 1058 694 A100 100 0 0 1 958 794";

interface Props extends SVGProps<SVGSVGElement> {
  variant?: "solid" | "outline";
  fortColor?: string;
  cutColor?: string;
}

export function PanyamMark({ variant = "solid", fortColor = "#FFF315", cutColor = "#00A85A", ...rest }: Props) {
  const outline = variant === "outline";
  return (
    <svg viewBox="570 260 780 660" fill="none" aria-hidden {...rest}>
      <path data-draw d={FORT_PATH} fill={outline ? "none" : fortColor} stroke={outline ? fortColor : "none"} strokeWidth={outline ? 8 : 0} strokeLinejoin="round" />
      <path data-draw d={FLAG_PATH} fill={outline ? "none" : fortColor} stroke={outline ? fortColor : "none"} strokeWidth={outline ? 8 : 0} strokeLinejoin="round" />
      <path data-draw d={SPIRAL_PATH} stroke={cutColor} strokeWidth={outline ? 10 : 104} strokeLinecap="butt" fill="none" />
    </svg>
  );
}
