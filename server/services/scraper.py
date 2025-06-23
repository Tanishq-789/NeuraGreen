from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd
import os


def scrape_products(query: str):
    options = Options()
    options.add_argument("--headless")  # Run in headless mode
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-blink-features=AutomationControlled")

    driver = webdriver.Chrome(
        service=Service(ChromeDriverManager().install()),
        options=options
    )

    driver.get("https://www.amazon.in")
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "twotabsearchtextbox")))
    search = driver.find_element(By.ID, "twotabsearchtextbox")
    search.send_keys(query)
    search.submit()

    WebDriverWait(driver, 15).until(EC.presence_of_all_elements_located(
        (By.XPATH, "//div[@data-component-type='s-search-result']")
    ))

    products = []
    items = driver.find_elements(By.XPATH, "//div[@data-component-type='s-search-result']")

    for item in items[:10]:
        # Title & URL
        try:
            title_element = item.find_element(
                By.XPATH,
                './/div[contains(@class, "s-title-instructions-style")]/a'
            )
            title = title_element.find_element(By.TAG_NAME, 'h2').text.strip()
            url = title_element.get_attribute("href")
        except:
            title = "N/A"
            url = "N/A"

        # Price
        try:
            price = item.find_element(By.CSS_SELECTOR, ".a-price .a-offscreen").get_attribute("innerText")
        except:
            price = "N/A"

        # Image
        try:
            image_url = item.find_element(By.TAG_NAME, "img").get_attribute("src")
        except:
            image_url = "N/A"

        products.append({
            "Title": title,
            "Price": price,
            "Image": image_url,
            "URL": url
        })

    driver.quit()

    os.makedirs("Output", exist_ok=True)
    df = pd.DataFrame(products)
    df.to_csv("Output/scraped_products.csv", index=False)
    print(f"✅ Scraped {len(df)} products into Output/scraped_products.csv")
    return df

# from selenium import webdriver
# from selenium.webdriver.chrome.service import Service
# from selenium.webdriver.common.by import By
# from selenium.webdriver.chrome.options import Options
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
# from webdriver_manager.chrome import ChromeDriverManager
# import pandas as pd
# import os
#
# def scrape_products(query: str):
#     options = Options()
#     options.add_argument("--headless")  # Run in headless mode
#     options.add_argument("--disable-gpu")
#     options.add_argument("--no-sandbox")
#     options.add_argument("--disable-dev-shm-usage")
#     options.add_argument("--disable-blink-features=AutomationControlled")
#
#     driver = webdriver.Chrome(
#         service=Service(ChromeDriverManager().install()),
#         options=options
#     )
#
#     driver.get("https://www.amazon.in")
#     WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "twotabsearchtextbox")))
#     search = driver.find_element(By.ID, "twotabsearchtextbox")
#     search.send_keys(query)
#     search.submit()
#
#     # Wait for product listings
#     WebDriverWait(driver, 15).until(EC.presence_of_all_elements_located(
#         (By.XPATH, "//div[@data-component-type='s-search-result']")
#     ))
#
#     products = []
#     items = driver.find_elements(By.XPATH, "//div[@data-component-type='s-search-result']")
#
#     for item in items[:10]:
#         # Title
#         try:
#             title_element = item.find_element(
#                 By.XPATH,
#                 './/div[contains(@class, "s-title-instructions-style")]/a/h2/span'
#             )
#             title = title_element.text.strip()
#         except:
#             title = "N/A"
#
#         # Price
#         try:
#             price = item.find_element(By.CSS_SELECTOR, ".a-price .a-offscreen").get_attribute("innerText")
#         except:
#             price = "N/A"
#
#         # Image
#         try:
#             image_url = item.find_element(By.TAG_NAME, "img").get_attribute("src")
#         except:
#             image_url = "N/A"
#
#         products.append({
#             "Title": title,
#             "Price": price,
#             "Image": image_url
#         })
#
#     driver.quit()
#
#     # Save to CSV
#     os.makedirs("Output", exist_ok=True)
#     df = pd.DataFrame(products)
#     df.to_csv("Output/scraped_products.csv", index=False)
#     print(f"✅ Scraped {len(df)} products into Output/scraped_products.csv")
#     return df
