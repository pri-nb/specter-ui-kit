import {
  HighlightedText,
  StyledTextWithHighlights,
} from './TextWithHighlights.style';

export interface TextWithHighlightsProps {
  text: string;
  highlightedText: string[];
  direction: string;
}

/**
 * TODO: document component functionality
 *
 * [Figma](https://https://www.figma.com/file/...)
 *
 * ```tsx
 * <TextWithHighlights />
 * ```
 */
export function TextWithHighlights({
  highlightedText,
  text,
  direction,
}: TextWithHighlightsProps) {
  const highlightText = (content: string) => {
    // Create a regular expression to find the highlighted text, preserving word boundaries
    const regex = new RegExp(`(${highlightedText.join('|')})`, 'gi');

    // Split the content by the regex, and map through the parts
    const parts = content.split(regex);

    return parts.map((part, index) =>
      highlightedText.some(
        highlight => highlight.toLowerCase() === part.toLowerCase(),
      ) ? (
        <HighlightedText key={index} direction={direction}>
          {part}
        </HighlightedText>
      ) : (
        part
      ),
    );
  };

  return (
    <StyledTextWithHighlights direction={direction}>
      {highlightText(text)}
    </StyledTextWithHighlights>
  );
}
