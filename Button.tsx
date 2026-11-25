import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { cx } from '../../lib/cx';

export type ButtonVariant = 'primary' | 'secondary' | 'accent';

const base =
  'inline-flex h-control items-center justify-center gap-2 border-frame border-ink px-5 font-sans text-label font-bold uppercase transition-colors duration-150 cursor-pointer';

const variants: Record<ButtonVariant, string> = {
  // Primaire et secondaire s'inversent au survol (maquette Button).
  primary: 'bg-ink text-panel hover:bg-panel hover:text-ink',
  secondary: 'bg-panel text-ink hover:bg-ink hover:text-panel',
  // Accent : corail, texte encre (5,85:1). Jamais de fond turquoise.
  accent: 'bg-coral text-ink hover:bg-ink hover:text-panel',
};

export const buttonClass = (variant: ButtonVariant = 'secondary', className?: string) =>
  cx(base, variants[variant], className);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ variant = 'secondary', className, type = 'button', ...rest }: ButtonProps) {
  return <button type={type} className={buttonClass(variant, className)} {...rest} />;
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
}

/** Lien externe ou fichier, stylé comme un bouton. */
export function ButtonLink({ variant = 'secondary', className, ...rest }: ButtonLinkProps) {
  return <a className={buttonClass(variant, className)} {...rest} />;
}

interface ButtonRouteProps extends LinkProps {
  variant?: ButtonVariant;
}

/** Lien interne (React Router), stylé comme un bouton. */
export function ButtonRoute({ variant = 'secondary', className, ...rest }: ButtonRouteProps) {
  return <Link className={buttonClass(variant, typeof className === 'string' ? className : undefined)} {...rest} />;
}
