export const splitTextIntoParagraphs = (
  text: string,
  sentencesPerPara = 2
): string[] => {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]; // Fallback if no punctuation
  const paragraphs: string[] = [];

  for (let i = 0; i < sentences.length; i += sentencesPerPara) {
    paragraphs.push(
      sentences
        .slice(i, i + sentencesPerPara)
        .join(" ")
        .trim()
    );
  }

  return paragraphs;
};
