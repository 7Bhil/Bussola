const fs = require('fs');

const dataStr = fs.readFileSync('/home/jjtech-s/Bureau/Projet/Busola/client/src/galleryData.ts', 'utf8');

// The file starts with export interface ... and export const galleryItems: GalleryItem[] = [ ... ];
const jsonMatch = dataStr.match(/export const galleryItems: GalleryItem\[\] = (\[[\s\S]*\]);/);
if (!jsonMatch) {
  console.log("Could not find gallery items array");
  process.exit(1);
}

let items = eval(jsonMatch[1]);

items = items.map(item => {
  let newCategory = '';
  let newCategoryLabel = '';
  let section = '';

  if (item.category === 'tedidjo') {
    newCategory = 'dssr';
    newCategoryLabel = 'DSSR et VBG';
    section = 'Programme TEDIDJO & RESPECT';
  } else if (item.category === 'yes') {
    newCategory = 'paix';
    newCategoryLabel = 'Paix et Cohésion Sociale';
    section = 'Programme YES';
  } else if (item.category === 'pageda') {
    newCategory = 'leadership';
    newCategoryLabel = 'Leadership et Autonomisation';
    section = 'Programme PAGEDA';
  } else if (item.category === 'ngo') {
    newCategory = 'leadership';
    newCategoryLabel = 'Leadership et Autonomisation';
    section = "Vie de l'ONG & Événements";
  } else {
    newCategory = item.category;
    newCategoryLabel = item.categoryLabel;
    section = 'Autres';
  }

  return {
    ...item,
    category: newCategory,
    categoryLabel: newCategoryLabel,
    section: section
  };
});

const newInterface = `export interface GalleryItem { id: number; title: string; category: 'dssr' | 'paix' | 'leadership'; categoryLabel: string; section: string; img: string; desc: string; date: string; tag: string; }`;

const newFileContent = `${newInterface}\n\nexport const galleryItems: GalleryItem[] = ${JSON.stringify(items, null, 2)};\n`;

fs.writeFileSync('/home/jjtech-s/Bureau/Projet/Busola/client/src/galleryData.ts', newFileContent, 'utf8');
console.log("Successfully updated galleryData.ts");
