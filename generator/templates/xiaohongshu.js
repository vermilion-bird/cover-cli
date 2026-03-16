export default function xiaohongshuTemplate(text, dimensions) {
  const { width } = dimensions;

  // Auto-wrap text for title
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

  const titleFontSize = width < 1200 ? 60 : 72;

  return {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        padding: '60px',
        position: 'relative',
      },
      children: [
        // Decorative elements
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: '40px',
              right: '40px',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(10px)',
            },
            children: ''
          }
        },
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              bottom: '100px',
              left: '60px',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
            },
            children: ''
          }
        },
        // Main content
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
              // Tag/Label
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    color: '#ff6b6b',
                    fontFamily: 'Inter, Noto Sans SC',
                    fontWeight: 600,
                    fontSize: width < 1200 ? 18 : 22,
                    padding: '12px 24px',
                    borderRadius: '20px',
                    marginBottom: '40px',
                    alignSelf: 'flex-start',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  },
                  children: '✨ 精选推荐'
                }
              },
              // Title
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    color: '#2d3436',
                    fontFamily: 'Inter, Noto Sans SC',
                    fontWeight: 800,
                    fontSize: titleFontSize,
                    lineHeight: 1.3,
                    maxWidth: width - 120,
                    textShadow: '0 2px 10px rgba(255, 255, 255, 0.5)',
                  },
                  children: lines.map((line, i) => ({
                    type: 'div',
                    props: {
                      style: {
                        marginBottom: i < lines.length - 1 ? '16px' : '0',
                      },
                      children: line
                    }
                  }))
                }
              }
            ]
          }
        },
        // Footer with logo
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          width: '40px',
                          height: '40px',
                          borderRadius: '8px',
                          backgroundColor: '#ff2442',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ffffff',
                          fontFamily: 'Inter',
                          fontWeight: 700,
                          fontSize: 24,
                        },
                        children: '书'
                      }
                    },
                    {
                      type: 'div',
                      props: {
                        style: {
                          color: '#636e72',
                          fontFamily: 'Inter, Noto Sans SC',
                          fontWeight: 500,
                          fontSize: 18,
                        },
                        children: 'cydon'
                      }
                    }
                  ]
                }
              },
              {
                type: 'div',
                props: {
                  style: {
                    color: '#636e72',
                    fontFamily: 'Inter',
                    fontSize: 16,
                    fontWeight: 500,
                  },
                  children: new Date().toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
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
