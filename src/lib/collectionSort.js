/**
 * Collection ordering for Onsite Discovery: rank a collection's products by how well
 * their tags match what the shopper needs right now. Pure functions, no DOM.
 *
 * need: { key, weights: { [tag]: number } } — no need / no weights keeps store order.
 */

export function matchedTags(product, need) {
  const weights = need?.weights ?? {};
  return product.tags.filter((tag) => weights[tag]);
}

const score = (product, need) =>
  matchedTags(product, need).reduce((sum, tag) => sum + need.weights[tag], 0);

/** Returns a new array. Array#sort is stable, so ties keep the store's own order. */
export function sortForNeed(products, need) {
  return [...products].sort((a, b) => score(b, need) - score(a, need));
}
