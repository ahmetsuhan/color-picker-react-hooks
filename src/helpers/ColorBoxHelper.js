export const manageColorFormat = (color = "", colorFormat = "") => {
  let returnColor = "";
  if (colorFormat === "hex") {
    returnColor = color.hex;
  }
  if (colorFormat === "rgb") {
    returnColor = color.rgb;
  }
  if (colorFormat === "rgba") {
    returnColor = color.rgba;
  }
  return returnColor;
};
