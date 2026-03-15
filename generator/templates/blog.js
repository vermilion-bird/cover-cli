export default function blogTemplate(text, dimensions) {
  const { width, height } = dimensions;

  // Auto-wrap text for title
  const maxCharsPerLine = Math.floor(width / 45);
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

  const titleFontSize = width < 1200 ? 56 : 68;

  return {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#f8f9fa',
        padding: '80px',
      },
      children: [
        // Title section
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'center',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    color: '#1a1a1a',
                    fontFamily: 'Inter, Noto Sans SC',
                    fontWeight: 700,
                    fontSize: titleFontSize,
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
              },
              // Subtitle
              {
                type: 'div',
                props: {
                  style: {
                    color: '#6c757d',
                    fontFamily: 'Inter, Noto Sans SC',
                    fontWeight: 400,
                    fontSize: width < 1200 ? 24 : 32,
                    marginTop: '40px',
                  },
                  children: 'Explore the possibilities'
                }
              }
            ]
          }
        },
        // Footer
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#6c757d',
              fontFamily: 'Inter',
              fontSize: 20,
              borderTop: '2px solid #dee2e6',
              paddingTop: '30px',
            },
            children: [
              {
                type: 'div',
                props: {
                  children: 'cover-cli'
                }
              },
              {
                type: 'div',
                props: {
                  children: new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                }
              }
            ]
          }
        }
      ]
    }
  };
}
