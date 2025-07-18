import type { Name } from '@/api/user';

export function getFullName(name: Name | undefined): string {
  if (name === undefined) {
    return '-';
  }

  return `${name.title} ${name.firstName} ${name.lastName}`;
}
