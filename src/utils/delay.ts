export function delay(milliseconds: number) {
  return new Promise<void>(function resolveAfterDelay(resolve) {
    setTimeout(resolve, milliseconds);
  });
}
