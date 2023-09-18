export function easeInQuart(t, b, c, d) {
  const alteredT = t / d;
  return c * alteredT * alteredT ** 3 + b;
}

export function easeOutQuart(t, b, c, d) {
  const alteredT = t / d - 1;
  return -c * (alteredT * alteredT ** 3 - 1) + b;
}

export function easeInOutQuart(t, b, c, d) {
  let alteredT = t / (d / 2);
  if (alteredT < 1) {
    return (c / 2) * alteredT ** 4 + b;
  }
  alteredT -= 2;
  return (-c / 2) * (alteredT * alteredT ** 3 - 2) + b;
}

export function easeInOutBack(t, b, c, d, s) {
  let sVal = s === undefined || s === null ? 1.70158 : s;
  let alteredT = t / (d / 2);
  sVal = sVal * 1.525 + 1;
  if (alteredT < 1) {
    return (c / 2) * (alteredT * alteredT * (sVal * alteredT - sVal) + b);
  }
  alteredT -= 2;
  return (c / 2) * (alteredT * alteredT * (sVal * alteredT + sVal) + 2) + b;
}

export function easeOutElastic(t, b, c, d, frequency = 700) {
  if (!t || !c) {
    return b;
  }
  const alteredT = t / d;
  if (alteredT === 1) {
    return b + c;
  }
  const a = c;
  const p = d * (1 - Math.min(frequency, 999) / 1000);
  const s = a < Math.abs(c) ? p / 4 : (p / (2 * Math.PI)) * Math.asin(c / a);
  return (
    a *
      2 ** (-10 * alteredT) *
      Math.sin(((alteredT * d - s) * (2 * Math.PI)) / p) +
    c +
    b
  );
}

export function delay(handler, duration) {
  let canceled = false;
  const start = performance.now();

  function tick(now) {
    if (now - start >= duration && !canceled) {
      handler();
      return;
    }
    if (!canceled) {
      requestAnimationFrame(tick);
    }
  }
  requestAnimationFrame(tick);

  return () => {
    canceled = true;
  };
}
