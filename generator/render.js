import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { parse as parseEmoji } from 'twemoji-parser';
import fetch from 'node-fetch';
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

// Helper function to generate emoji image mappings for Satori
async function getEmojiImages(text) {
  const emojis = parseEmoji(text);
  const graphemeImages = {};

  for (const emoji of emojis) {
    // Convert emoji to codepoint(s) for Twemoji CDN
    // Twemoji uses lowercase hex codepoints separated by hyphens
    const codepoints = [];
    for (const char of emoji.text) {
      const codepoint = char.codePointAt(0).toString(16);
      codepoints.push(codepoint);
    }
    const codepointStr = codepoints.join('-');

    // Use Twemoji CDN (SVG format for better quality)
    const url = `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${codepointStr}.svg`;

    try {
      // Fetch the SVG and convert to data URI
      const response = await fetch(url);
      if (response.ok) {
        const svgText = await response.text();
        const dataUri = `data:image/svg+xml;base64,${Buffer.from(svgText).toString('base64')}`;
        graphemeImages[emoji.text] = dataUri;
      }
    } catch (error) {
      console.warn(`Failed to load emoji ${emoji.text}:`, error.message);
    }
  }

  return graphemeImages;
}

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

  // Load fonts (English + Chinese + Emoji)
  const interFontPath = join(__dirname, '../fonts/Inter.ttf');
  const notoSansFontPath = join(__dirname, '../fonts/NotoSansSC.ttf');
  const symbolsFontPath = join(__dirname, '../fonts/NotoSansSymbols-Regular.ttf');
  const symbols2FontPath = join(__dirname, '../fonts/NotoSansSymbols2-Regular.ttf');
  const interFontData = readFileSync(interFontPath);
  const notoSansFontData = readFileSync(notoSansFontPath);
  const symbolsFontData = readFileSync(symbolsFontPath);
  const symbols2FontData = readFileSync(symbols2FontPath);

  // Generate JSX markup using template
  const markup = templateFn(text, dimensions);

  // Parse emoji from text and generate image mappings
  const graphemeImages = await getEmojiImages(text);

  // Render to SVG using Satori
  // Satori will use Inter for English, Noto Sans SC for Chinese, and Noto Sans Symbols for Unicode symbols
  // Emoji will be rendered as images via graphemeImages
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
      },
      {
        name: 'Noto Sans Symbols',
        data: symbolsFontData,
        weight: 400,
        style: 'normal',
      },
      {
        name: 'Noto Sans Symbols2',
        data: symbols2FontData,
        weight: 400,
        style: 'normal',
      }
    ],
    graphemeImages
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
