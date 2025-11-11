import { Link } from "react-router-dom";
import { splitTextIntoParagraphs } from "../helper/splitParagraph";
import GodHeader from "./GodHeader";

interface ParagraphBlockProps {
  textBefore?: string;
  heading?: string;
  linkText?: string;
  linkTo?: string;
  textAfter: string;
  sentencesPerPara?: number;
}

const ParagraphBlock = ({
  textBefore,
  heading,
  linkText,
  linkTo,
  textAfter,
  sentencesPerPara = 2,
}: ParagraphBlockProps) => {
  const beforeParas = splitTextIntoParagraphs(
    textBefore || "",
    sentencesPerPara
  );
  const afterParas = splitTextIntoParagraphs(textAfter, sentencesPerPara);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center text-gray-800 dark:text-gray-100 space-y-6">
      {beforeParas &&
        beforeParas.map((para, idx) => (
          <p
            key={`before-${idx}`}
            className="text-base leading-relaxed mx-auto"
          >
            {para}
          </p>
        ))}
      {heading && <GodHeader title={heading} />}
      {linkTo && (
        <Link
          to={linkTo}
          className="inline-block text-orange-600 dark:text-orange-400 font-semibold hover:underline"
        >
          {linkText}
        </Link>
      )}

      {afterParas.map((para, idx) => (
        <p key={`after-${idx}`} className="text-base leading-relaxed mx-auto">
          {para}
        </p>
      ))}
    </div>
  );
};

export default ParagraphBlock;
