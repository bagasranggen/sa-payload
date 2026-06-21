const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, 'assets/raw-rotate');
const outputDir = path.join(__dirname, 'assets/webp-rotate');

function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            walk(fullPath);
        } else {
            processFile(fullPath);
        }
    }
}

function processFile(input) {
    const relativePath = path.relative(inputDir, input);
    const outputPath = path.join(outputDir, relativePath.replace(path.extname(relativePath), '.webp'));

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    sharp(input)
        .webp({ quality: 80 })
        // .rotate(90)
        .toFile(outputPath)
        .then(() => console.log(`Converted ${relativePath}`))
        .catch(console.error);
}

walk(inputDir);
