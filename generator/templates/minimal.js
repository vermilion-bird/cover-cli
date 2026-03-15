export default function minimalTemplate(text, dimensions) {
  const { width, height } = dimensions;

  // Auto-wrap text for better readability
  const maxCharsPerLine = Math.floor(width / 40);
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + ' ' + word).length <= maxCharsPerLine) {
      currentLine += (currentLine ? ' ' : '') + word;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);

  const fontSize = width < 1200 ? 56 : 72;

  return {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        padding: '80px',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              color: '#ffffff',
              fontFamily: 'Inter, Noto Sans SC',
              fontWeight: 700,
              fontSize,
              lineHeight: 1.2,
              maxWidth: width - 160,
            },
            children: lines.map((line, i) => ({
              type: 'div',
              props: {
                style: {
                  marginBottom: i < lines.length - 1 ? '20px' : '0',
                },
                children: line
              }
            }))
          }
        }
      ]
    }
  };
}
