import Highlighter from 'react-highlight-words';

export function HighlightedText({
  searchValue,
  text
}: {
  searchValue: string;
  text: string;
}) {
  return (
    <Highlighter
      searchWords={[searchValue]}
      autoEscape={true}
      textToHighlight={text}
    />
  );
}
