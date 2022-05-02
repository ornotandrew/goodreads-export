export async function batchedPromiseAll<A, R>(
  fn: (...args: A[]) => Promise<R>,
  args: A[][],
  batchSize: number
): Promise<R[]> {
  let position = 0;
  let results: R[] = [];
  while (position < args.length) {
    const argsForBatch = args.slice(position, position + batchSize);
    results = [...results, ...(await Promise.all(argsForBatch.map((args) => fn(...args))))];
    position += batchSize;
  }
  return results;
}

