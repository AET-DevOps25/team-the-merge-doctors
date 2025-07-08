import type { Address } from '@/api/user';

export function getLocation(address: Address | undefined) {
  return `${address?.city}, ${address?.country}`;
}
