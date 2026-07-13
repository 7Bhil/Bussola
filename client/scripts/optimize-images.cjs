const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const publicDir = path.resolve(__dirname, '..', 'public');
const galleryDir = path.join(publicDir, 'gallery');
const optimizedDir = path.join(publicDir, 'optimized');
const galleryThumbDir = path.join(optimizedDir, 'gallery', 'thumbs');
const galleryLargeDir = path.join(optimizedDir, 'gallery', 'large');

const imageExtensions = new Set(['.jpg', '.jpeg', '.png']);

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function webpName(filePath) {
  return `${path.basename(filePath, path.extname(filePath))}.webp`;
}

function convertToWebp(input, output, width, quality) {
  ensureDir(path.dirname(output));
  execFileSync('cwebp', [
    '-quiet',
    '-q',
    String(quality),
    '-resize',
    String(width),
    '0',
    input,
    '-o',
    output,
  ]);
}

function listImages(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return listImages(entryPath);
    return imageExtensions.has(path.extname(entry.name).toLowerCase()) ? [entryPath] : [];
  });
}

const staticImages = [
  'hero-slider.jpeg',
  'about.jpeg',
  'action-1.jpg',
  'action-2.jpg',
  'action-3.jpg',
  'project-1.jpg',
  'project-2.jpg',
  'project-3.jpg',
  'news-1.jpg',
  'news-2.jpg',
  'news-3.jpg',
  'testimony1.jpg',
  'team-1.jpg',
  'team-2.jpg',
  'team-3.jpg',
  'team-4.jpeg',
  'team-5.jpeg',
  'team-6.jpg',
  'team-lead.jpg',
  'cta-1.jpeg',
  'cta-2.jpeg',
  'pageda.png',
  'tedjido.png',
  'yes.png',
  'projet_respect.png',
  'de.png',
  'About.png',
  'cc.png',
  'mobilisation.png',
  'Dejeuner.png',
  'ap.png',
  'hero.jpeg',
  'team.png',
  'motif-logo.png',
  'unfpa.png',
  'unicef.png',
  'logo-uk.jpg',
  'canada.png',
  'logo-suisse.png',
  'logo-mdm.png',
  'logo-care.png',
  'engender.png',
  'roajelf.jpeg',
  'sianson.png',
  'barika.jpg',
  'wendia.jpg',
  'ap.png',
  'pca.png',
  'pcs.png',
  'ph.png',
  'axe2.png',
  'axe3.png',
  'axe4.png',
  'axe5.png',
  'bg1.png',
];

ensureDir(optimizedDir);
ensureDir(galleryThumbDir);
ensureDir(galleryLargeDir);

let created = 0;

for (const image of staticImages) {
  const input = path.join(publicDir, image);
  if (!fs.existsSync(input)) continue;

  const output = path.join(optimizedDir, webpName(input));
  convertToWebp(input, output, 1600, 78);
  created += 1;
}

for (const input of listImages(galleryDir)) {
  const thumbOutput = path.join(galleryThumbDir, webpName(input));
  const largeOutput = path.join(galleryLargeDir, webpName(input));

  convertToWebp(input, thumbOutput, 720, 68);
  convertToWebp(input, largeOutput, 1600, 78);
  created += 2;
}

console.log(`Optimized image files written: ${created}`);
