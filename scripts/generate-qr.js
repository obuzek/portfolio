const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const url = 'https://decoding.ink/';
const outputDir = path.join(__dirname, '../src/assets/images');
const outputPath = path.join(outputDir, 'qr-code.svg');

// Site theme colors
const colors = {
  dark: '#0f0a1a',      // --color-bg
  light: '#818cf8',     // --color-accent (indigo/violet)
};

// Terminal prompt icon ">_" to embed in center
// Note: QR code viewBox is roughly 33x33, so center is ~16.5
const boxSize = 7;
const halfBox = boxSize / 2;
const terminalIcon = `
  <g transform="translate(16.5, 16.5)">
    <!-- Background square -->
    <rect x="${-halfBox}" y="${-halfBox}" width="${boxSize}" height="${boxSize}" fill="${colors.dark}"/>
    <!-- Terminal prompt ">_" -->
    <text x="0" y="1.2"
          font-family="SF Mono, Fira Code, Consolas, monospace"
          font-size="4"
          font-weight="700"
          fill="${colors.light}"
          text-anchor="middle">&gt;_</text>
  </g>
`;

async function generateQR() {
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    let svg = await QRCode.toString(url, {
      type: 'svg',
      color: {
        dark: colors.light,  // QR modules (the dots)
        light: colors.dark,  // Background
      },
      width: 300,
      margin: 2,
      errorCorrectionLevel: 'H',  // High error correction to allow for center logo
    });

    // Insert the terminal icon before closing </svg> tag
    svg = svg.replace('</svg>', `${terminalIcon}</svg>`);

    fs.writeFileSync(outputPath, svg);
    console.log(`QR code generated at ${outputPath}`);
  } catch (err) {
    console.error('Error generating QR code:', err);
    process.exit(1);
  }
}

generateQR();
