import { test } from "node:test";
import assert from "node:assert/strict";
import { sortForNeed, matchedTags } from "./collectionSort.js";

const STORE = [
  { id: "a", tags: ["x"] },
  { id: "b", tags: ["y"] },
  { id: "c", tags: [] },
  { id: "d", tags: ["x"] },
];
const ids = (list) => list.map((p) => p.id);

test("default keeps store order", () => {
  assert.deepEqual(ids(sortForNeed(STORE, { key: "default", weights: {} })), ["a", "b", "c", "d"]);
});

test("higher weighted score ranks first", () => {
  assert.deepEqual(ids(sortForNeed(STORE.slice(0, 3), { weights: { x: 1, y: 3 } })), ["b", "a", "c"]);
});

test("ties keep store order", () => {
  assert.deepEqual(ids(sortForNeed(STORE, { weights: { x: 2 } })), ["a", "d", "b", "c"]);
});

test("does not mutate input", () => {
  const input = [...STORE];
  sortForNeed(input, { weights: { y: 1 } });
  assert.deepEqual(ids(input), ["a", "b", "c", "d"]);
});

test("missing need returns store order", () => {
  assert.deepEqual(ids(sortForNeed(STORE, undefined)), ["a", "b", "c", "d"]);
});

test("matchedTags lists the tags a need cares about", () => {
  assert.deepEqual(matchedTags({ tags: ["x", "y", "z"] }, { weights: { y: 1, z: 2 } }), ["y", "z"]);
  assert.deepEqual(matchedTags({ tags: ["x"] }, undefined), []);
});
