import urllib.request
import re
import json

album_ids = [1, 3, 4, 5, 6, 7, 8]
base_url = "https://busolaong.com"
user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

# Mapping categories and tags from album titles
def guess_category_and_tags(album_title):
    title = album_title.lower()
    if "tedijo" in title or "tedidjo" in title or "respect" in title:
        return "tedidjo", "TEDIDJO", "DSSR & VBG"
    elif "yes" in title or "bootcamp" in title or "jeune" in title:
        return "yes", "YES", "Jeunesse"
    elif "pageda" in title or "alphabé" in title:
        return "pageda", "PAGEDA", "Autonomisation"
    elif "femme" in title or "8 mars" in title:
        return "tedidjo", "TEDIDJO", "Droits des femmes"
    else:
        return "ngo", "Vie de l'ONG", "Vie de l'ONG"

scraped_photos = []
photo_global_id = 1

for album_id in album_ids:
    url = f"{base_url}/gallery_details/{album_id}"
    print(f"Scraping album {album_id} from {url}...")
    
    try:
        req = urllib.request.Request(url, headers={'User-Agent': user_agent})
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8')
            
            # Extract Album Title
            title_match = re.search(r'<h1 class="display-3 animated slideInDown.*?>(.*?)</h1>', html, re.DOTALL)
            album_title = "Activité Busola"
            if title_match:
                album_title = title_match.group(1).strip()
            
            category, category_label, tag = guess_category_and_tags(album_title)
            
            # Extract Photos Javascript Array
            # The format is: { id: XX, src: "YY" }
            pattern = re.compile(r'{\s*id:\s*(\d+),\s*src:\s*"(.*?)"\s*}')
            matches = pattern.findall(html)
            
            print(f"  Found {len(matches)} photos in album '{album_title}'")
            
            for index, match in enumerate(matches):
                photo_id_db, src = match
                full_src = f"{base_url}{src}" if src.startswith("/") else src
                
                # Make descriptions slightly dynamic or standard
                desc = f"Photo prise lors de l'activité: {album_title}."
                if len(matches) > 1:
                    desc += f" (Image {index + 1}/{len(matches)})"
                
                scraped_photos.append({
                    "id": photo_global_id,
                    "title": f"{album_title} - Vue {index + 1}",
                    "category": category,
                    "categoryLabel": category_label,
                    "img": full_src,
                    "desc": desc,
                    "date": "2025/2026",
                    "tag": tag
                })
                photo_global_id += 1
                
    except Exception as e:
        print(f"Error scraping album {album_id}: {e}")

# Save to scraped_photos.json
with open("scraped_photos.json", "w", encoding="utf-8") as f:
    json.dump(scraped_photos, f, ensure_ascii=False, indent=2)

print(f"Scraping completed! Total photos extracted: {len(scraped_photos)}")
