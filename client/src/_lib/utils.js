export function getTextByte(str) {
  let totalByte = 0;
  for (let i = 0; i < str.length; i++) {
    let currentChar = str.charCodeAt(i);
    currentChar > 128 ? (totalByte += 2) : totalByte++;
  }
  return totalByte;
}
