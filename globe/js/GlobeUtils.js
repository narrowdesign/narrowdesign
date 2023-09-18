import {Vector3} from "./lib/three.min.js";

const DEGREE_TO_RADIAN = Math.PI / 180;
export function latLngToXYZ(lat, lng, radius) {
  const phi = (90 - lat) * DEGREE_TO_RADIAN;
  const theta = Number(lng) * DEGREE_TO_RADIAN;

  const coords = new Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
  return coords;
}
