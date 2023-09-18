import {asin, atan2, cos, degrees, haversin, radians, sin, sqrt} from './math.js';

export default function(a, b) {
  const x0 = a[0] * radians;

  const y0 = a[1] * radians;

  const x1 = b[0] * radians;

  const y1 = b[1] * radians;

  const cy0 = cos(y0);

  const sy0 = sin(y0);

  const cy1 = cos(y1);

  const sy1 = sin(y1);

  const kx0 = cy0 * cos(x0);

  const ky0 = cy0 * sin(x0);

  const kx1 = cy1 * cos(x1);

  const ky1 = cy1 * sin(x1);

  const d = 2 * asin(sqrt(haversin(y1 - y0) + cy0 * cy1 * haversin(x1 - x0)));

  const k = sin(d);

  const interpolate = d
    ? function(t) {
        // eslint-disable-next-line no-param-reassign
        const B = sin((t *= d)) / k;

        const A = sin(d - t) / k;

        const x = A * kx0 + B * kx1;

        const y = A * ky0 + B * ky1;

        const z = A * sy0 + B * sy1;
        return [atan2(y, x) * degrees, atan2(z, sqrt(x * x + y * y)) * degrees];
      }
    : function() {
        return [x0 * degrees, y0 * degrees];
      };

  interpolate.distance = d;

  return interpolate;
}
