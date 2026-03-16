#!/usr/bin/env node

import { program } from 'commander';
import { generateCover } from './generator/render.js';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

program
  .name('cover-cli')
  .description('Generate social media cover images from text')
  .argument('<text>', 'Text to display on the cover')
  .option('-o, --output <filename>', 'Output filename', 'cover.png')
  .option('-s, --size <size>', 'Image size (twitter, blog, square, xhs, youtube)', 'twitter')
  .option('-t, --template <template>', 'Template style (minimal, tech, blog, xiaohongshu)', 'minimal')
  .action(async (text, options) => {
    try {
      console.log('🎨 Generating cover image...');
      console.log(`   Text: "${text}"`);
      console.log(`   Size: ${options.size}`);
      console.log(`   Template: ${options.template}`);

      const imageBuffer = await generateCover(text, {
        size: options.size,
        template: options.template
      });

      const outputPath = resolve(process.cwd(), options.output);
      writeFileSync(outputPath, imageBuffer);

      console.log(`✅ Cover image generated successfully!`);
      console.log(`   Output: ${outputPath}`);
    } catch (error) {
      console.error('❌ Error:', error.message);
      process.exit(1);
    }
  });

program.parse();
