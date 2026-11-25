/** Assemble des classes CSS en ignorant les valeurs vides. */
export const cx = (...classes: Array<string | false | null | undefined>): string =>
  classes.filter(Boolean).join(' ');
