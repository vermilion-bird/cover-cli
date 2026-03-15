export default function techTemplate(text, dimensions) {
  const { width, height } = dimensions;

  // Auto-wrap text
  const maxCharsPerLine = Math.floor(width / 35);
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

  const fontSize = width < 1200 ? 64 : 80;

  return {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '80px',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              color: '#ffffff',
              fontFamily: 'Inter',
              fontWeight: 700,
              fontSize,
              lineHeight: 1.1,
              maxWidth: width - 160,
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            },
            children: lines.map((line, i) => ({
              type: 'div',
              props: {
                style: {
                  marginBottom: i < lines.length - 1 ? '24px' : '0',
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
