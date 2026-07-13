const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist');

const originalStaticImages = [
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

function remove(target) {
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
    return true;
  }
  return false;
}

let removed = 0;

for (const directory of ['gallery', 'ONGBusola-front']) {
  if (remove(path.join(distDir, directory))) {
    removed += 1;
  }
}

for (const image of originalStaticImages) {
  if (remove(path.join(distDir, image))) {
    removed += 1;
  }
}

console.log('Pruned unused original image paths from dist: ' + removed);
