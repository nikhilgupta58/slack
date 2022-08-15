export default function getColor(alpha: string) {
  if (alpha >= "A" && alpha <= "E") return "#FF7F50";
  if (alpha >= "F" && alpha <= "J") return "#CCEEFF";
  if (alpha >= "K" && alpha <= "O") return "#F4D03F";
  if (alpha >= "P" && alpha <= "T") return "#17A589";
  return "#5D6D7E";
}
