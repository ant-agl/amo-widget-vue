// count: number
// words: [string, string, string]
// return string
export const getPluralWord = (count, words) => {
  const ruCardinalRules = new Intl.PluralRules("ru-RU");

  switch (ruCardinalRules.select(count)) {
    case "one":
      return words[0];
    case "few":
      return words[1];
    case "many":
      return words[2];
  }
  return "";
};
