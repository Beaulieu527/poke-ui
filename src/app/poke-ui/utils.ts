export function pad(value: string, size: number): string {
  while (value.length < size) {
    value = '0' + value;
  }
  return value;
}

export function capitalize(value: string): string {
  if (typeof value !== 'string') {
    return '';
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
}
