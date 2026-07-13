import { GalleryItem } from './galleryData';

export function groupItemsBySection(items: GalleryItem[]) {
  const map = new Map<string, GalleryItem[]>();
  items.forEach(item => {
    const section = item.section || 'Général';
    if (!map.has(section)) {
      map.set(section, []);
    }
    map.get(section)!.push(item);
  });
  return map;
}
