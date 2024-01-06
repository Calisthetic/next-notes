export const sheetLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function getSheetLetter(className: object) {
  return sheetLetters[Object.keys(className).length - 1];
}