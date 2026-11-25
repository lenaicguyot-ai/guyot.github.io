import type { HTMLAttributes } from 'react';
import { cx } from '../../lib/cx';

interface HalftoneProps extends HTMLAttributes<HTMLDivElement> {
  /** Variante noir et blanc (noir manga sur blanc). */
  mono?: boolean;
}

/** Trame de points (screentone) : le volume sans ombre ni dégradé. Jamais sous du texte courant. */
export function Halftone({ mono = false, className, ...rest }: HalftoneProps) {
  return <div className={cx(mono ? 'trame-nb' : 'trame', className)} {...rest} />;
}
