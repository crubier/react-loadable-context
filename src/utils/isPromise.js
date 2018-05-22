/* @flow */

export default function isPromise(obj: mixed): boolean {
  return (
    !!obj &&
    (typeof obj === "object" || typeof obj === "function") &&
    typeof obj.then === "function"
  );
}
