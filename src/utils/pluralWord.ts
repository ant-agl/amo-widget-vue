export const getPluralWord = (
  count: number,
  words: [string, string, string]
): string => {
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
