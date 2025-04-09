import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse, urljoin
import random
import time # Keep for delays if processing multiple known URLs

def scrape_image_from_url(school_name, school_url):
    """
    Attempts to scrape a logo/image from a specific school URL.

    Args:
        school_name (str): The name of the school (for dictionary key).
        school_url (str): The direct URL of the school's website.

    Returns:
        tuple: (school_name, image_url_or_error_string)
    """
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
    }
    print(f"Processing: {school_name} directly from {school_url}")

    try:
        # --- Visit School Website and Find Image ---
        print(f"  Visiting: {school_url}")
        school_response = requests.get(school_url, headers=headers, timeout=15, allow_redirects=True)
        school_response.raise_for_status() # Check for HTTP errors
        school_soup = BeautifulSoup(school_response.text, 'html.parser')

        # --- Find Image (Still Website-Dependent) ---
        image_selectors = [
            'img[src*="logo"]', 'img[alt*="logo" i]', 'img[class*="logo" i]',
            'img[id*="logo" i]', 'header img', 'img[src*="school"]',
            'img[alt*="school" i]', 'img.school-photo'
        ]
        found_image = None
        for img_selector in image_selectors:
            images = school_soup.select(img_selector)
            if images:
                found_image = images[0] # Take the first one
                print(f"  Found image using selector: {img_selector}")
                break

        if found_image and found_image.has_attr('src'):
            image_url = found_image['src']

            # --- Handle Relative URLs ---
            if image_url.startswith('http://') or image_url.startswith('https://'):
                pass
            elif image_url.startswith('//'):
                protocol = school_url.split('://')[0]
                image_url = protocol + ':' + image_url
            elif image_url.startswith('/'):
                parsed_school_url = urlparse(school_url)
                base_url = f"{parsed_school_url.scheme}://{parsed_school_url.netloc}"
                image_url = urljoin(base_url, image_url)
            else:
                image_url = urljoin(school_url, image_url) # Relative to current path

            print(f"  Found image URL: {image_url}")
            return image_url
        else:
            print(f"  Could not find a suitable image on {school_url}")
            return school_name, "Error: Image not found on website"

    except requests.exceptions.RequestException as e_school:
         print(f"  Error visiting school site {school_url}: {e_school}")
         return school_name, f"Error: Cannot access website ({e_school})"
    except Exception as e_scrape:
         print(f"  Error scraping school site {school_url}: {e_scrape}")
         return school_name, f"Error: Cannot parse website ({e_scrape})"

# --- How to use the new function ---
def main_with_direct_urls():
    # Find the actual URL first (e.g., by manually searching)
    # Example: Let's assume the actual URL is https://www.sajc.moe.edu.sg/
    schools_with_urls = {
        "St. Andrew's Junior College": "http://www.standrewsjc.moe.edu.sg/"
        # Add more schools and their known URLs here
        # "Another School": "https://www.their-website.edu.sg/"
    }

    results_direct = {}
    for name, url in schools_with_urls.items():
        s_name, result_url_or_error = scrape_image_from_url(name, url)
        results_direct[s_name] = result_url_or_error
        # Optional delay if processing many URLs
        # time.sleep(random.uniform(1, 3))

    print("\n--- Direct URL Scraping Results ---")
    print(results_direct)
    print("--- End of Results ---")

    print("\n--- Formatted Direct Results ---")
    if results_direct:
        for school, url_or_error in results_direct.items():
            print(f"School: {school}")
            print(f"Result: {url_or_error}\n")
    else:
        print("No results were generated.")


if __name__ == "__main__":
    # Choose which method to run
    # main() # This runs the original Google Search method
    main_with_direct_urls() # This runs the method using known URLs