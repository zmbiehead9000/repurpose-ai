from playwright.sync_api import sync_playwright
import os

PAGES = [
    ("landing", "http://localhost:3000"),
    ("pricing", "http://localhost:3000/pricing"),
    ("login", "http://localhost:3000/login"),
    ("signup", "http://localhost:3000/signup"),
]

out = "C:/Users/Ramy/Downloads/claude code/repurpose-ai/screenshots"
os.makedirs(out, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})

    # Warm-up pass: visit every page so Next.js compiles CSS
    for name, url in PAGES:
        page.goto(url)
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(3000)

    # Screenshot pass: revisit with extra wait to ensure full render
    for name, url in PAGES:
        page.goto(url)
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(4000)
        path = f"{out}/{name}.png"
        page.screenshot(path=path, full_page=True)
        print(f"[OK] {name}: {path}")

    browser.close()
    print("Done.")
