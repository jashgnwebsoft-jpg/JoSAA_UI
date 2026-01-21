const TextHighlighter = ({ text, highlight }: { text: string; highlight: string }) => {
  if (!text) return null;
  const trimmedHighlight = highlight.trim();
  if (!trimmedHighlight) return <>{text}</>;

  const escapedHighlight = trimmedHighlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const regex = new RegExp(`(${escapedHighlight})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === trimmedHighlight.toLowerCase() ? (
          <mark
            key={i}
            style={{
              backgroundColor: '#FFD666',
              color: '#212B36',
              borderRadius: '2px',
              padding: '0 1px',
            }}
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
};
export default TextHighlighter;
