const coverRef = document.querySelector(".Cover");
const codeApiRef = document.querySelector(".Code--api");
const messagesRef = document.querySelectorAll(".Message__content");
const bodyRef = document.querySelector("body");

window.addEventListener("scroll", handleScroll);
function handleScroll(e) {
  const scroll = window.scrollY;
  const coverRotationX = Math.min(180, scroll / 10);
  const colorLightness = 15 + (scroll / 1000) * 35;
  const coverAccentColorLightness = 54 + (scroll / 1000) * 35;
  const codeApiColorLightness = Math.min(76, 40 + (scroll / 1000) * 35);
  const backgroundColorDarkLightness = 62 + (scroll / 2000) * 35;
  const backgroundColorLightLightness = 85 + (scroll / 2000) * 15;
  const coverZ = 6 + scroll / 50;
  const coverShadowY = 12 - scroll / 50;
  const coverShadowOpacity = 0.15 + Math.min(0.5, scroll / 1000);
  coverRef.style.setProperty(
    "--cover-color-dark",
    `hsl(234, 10%, ${colorLightness}%)`
  );
  coverRef.style.setProperty(
    "--cover-background-color-dark",
    `hsl(0, 0%, ${backgroundColorDarkLightness}%)`
  );
  coverRef.style.setProperty(
    "--cover-background-color-light",
    `hsl(30, 3%, ${backgroundColorLightLightness}%)`
  );
  coverRef.style.setProperty(
    "--cover-accent-color",
    `hsl(18, 88%, ${coverAccentColorLightness}%)`
  );
  coverRef.style.setProperty("--cover-z", `${coverZ}px`);
  coverRef.style.setProperty("--cover-shadow-y", `${coverShadowY}px`);
  coverRef.style.setProperty("--cover-shadow-opacity", `${coverShadowOpacity}`);
  coverRef.style.transform = `rotateX(${coverRotationX}deg)`;

  codeApiRef.style.setProperty(
    "--code-color",
    `hsl(20, 85%, ${codeApiColorLightness}%)`
  );
}
