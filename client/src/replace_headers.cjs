const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'App.tsx',
  'ActionPage.tsx',
  'TeamPage.tsx',
  'NewsPage.tsx',
  'AboutSection.tsx',
  'GalleryPage.tsx',
  'SupportPage.tsx',
  'ResourcePage.tsx',
  'ContactPage.tsx'
];

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace badge styling
  // Old: <span className="text-white text-uppercase px-3 py-1 mx-2" style={{ backgroundColor: '#3bb143', fontSize: '0.85rem', fontWeight: 700 }}>
  // New: <span className="text-uppercase mx-3" style={{ color: '#3bb143', fontSize: '0.9rem', fontWeight: 800, letterSpacing: '2px' }}>
  content = content.replace(
    /<span className="text-white text-uppercase px-3 py-1 (me-2|mx-2)" style={{ backgroundColor: '#3bb143', fontSize: '0.85rem', fontWeight: 700 }}>/g,
    '<span className="text-uppercase $1 fw-bold" style={{ color: \'#3bb143\', fontSize: \'0.9rem\', letterSpacing: \'2px\' }}>'
  );

  // Replace H1 spans
  // Old: <span className="text-uppercase text-white px-3 py-2(?: mt-2 d-inline-block)?" style={{ backgroundColor: '#2764AE' }}>(.*?)</span>
  // New: <span className="text-uppercase" style={{ color: '#111827' }}>$1</span>
  
  // To handle the line breaks and structure elegantly, let's just make the text color dark and remove background/padding.
  content = content.replace(
    /<span className="text-uppercase text-white px-3 py-2( mt-2 d-inline-block)?" style={{ backgroundColor: '#2764AE' }}>([\s\S]*?)<\/span>/g,
    '<span className="text-uppercase fw-black" style={{ color: \'#111827\', letterSpacing: \'-0.5px\' }}>$2</span>'
  );

  // For App.tsx specific ones that might have slightly different classes
  content = content.replace(
    /<span className="text-uppercase text-white px-3 py-2( mt-2 d-inline-block)?" style={{ backgroundColor: '#2764AE', display: 'inline-block' }}>([\s\S]*?)<\/span>/g,
    '<span className="text-uppercase fw-black" style={{ color: \'#111827\', letterSpacing: \'-0.5px\' }}>$2</span>'
  );

  // Change style of the h1 itself slightly if needed
  // <h1 className="fw-bold mb-4" style={{ lineHeight: 1.4, fontSize: '2.5rem' }}>
  content = content.replace(
    /<h1 className="fw-bold mb-4" style={{ lineHeight: 1.4, fontSize: '2.5rem' }}>/g,
    '<h1 className="fw-black mb-4" style={{ lineHeight: 1.2, fontSize: \'2.75rem\', color: \'#111827\' }}>'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
});
