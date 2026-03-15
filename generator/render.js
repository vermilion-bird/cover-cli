import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import minimalTemplate from './templates/minimal.js';
import techTemplate from './templates/tech.js';
import blogTemplate from './templates/blog.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SIZES = {
  twitter: { width: 1200, height: 630 },
  blog: { width: 1200, height: 630 },
  square: { width: 1080, height: 1080 },
  xhs: { width: 1080, height: 1440 },
  youtube: { width: 1280, height: 720 }
};

const TEMPLATES = {
  minimal: minimalTemplate,
  tech: techTemplate,
  blog: blogTemplate
};

export async function generateCover(text, options = {}) {
  const { size = 'twitter', template = 'minimal' } = options;

  // Validate options
  if (!SIZES[size]) {
    throw new Error(`Unknown size: ${size}. Available: ${Object.keys(SIZES).join(', ')}`);
  }

  if (!TEMPLATES[template]) {
    throw new Error(`Unknown template: ${template}. Available: ${Object.keys(TEMPLATES).join(', ')}`);
  }

  const dimensions = SIZES[size];
  const templateFn = TEMPLATES[template];

  // Load fonts (English + Chinese)
  const interFontPath = join(__dirname, '../fonts/Inter.ttf');
  const notoSansFontPath = join(__dirname, '../fonts/NotoSansSC.ttf');
  const interFontData = readFileSync(interFontPath);
  const notoSansFontData = readFileSync(notoSansFontPath);

  // Generate JSX markup using template
  const markup = templateFn(text, dimensions);

  // Render to SVG using Satori
  // Satori will use Inter for English characters and Noto Sans SC for Chinese characters
  const svg = await satori(markup, {
    width: dimensions.width,
    height: dimensions.height,
    fonts: [
      {
        name: 'Inter',
        data: interFontData,
        weight: 400,
        style: 'normal',
      },
      {
        name: 'Inter',
        data: interFontData,
        weight: 700,
        style: 'normal',
      },
      {
        name: 'Noto Sans SC',
        data: notoSansFontData,
        weight: 400,
        style: 'normal',
      },
      {
        name: 'Noto Sans SC',
        data: notoSansFontData,
        weight: 700,
        style: 'normal',
      }
    ]
  });

  // Convert SVG to PNG using resvg
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: dimensions.width,
    }
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return pngBuffer;
}
