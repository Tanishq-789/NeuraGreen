import google.generativeai as genai
import os
import csv
import json

class CarbonFootprintEstimator:
    def __init__(self):
        self.model = None
        self.initialize_gemini()

    def initialize_gemini(self):
        from dotenv import load_dotenv
        load_dotenv()
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise Exception("Gemini API key not found in environment")
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel("gemini-2.0-flash")

    def load_scraped_products(self, filepath):
        products = []
        with open(filepath, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                products.append({
                    "Title": row.get("Title", "N/A"),
                    "Price": row.get("Price", "N/A"),
                    "Image": row.get("Image", "N/A"),
                    "URL": row.get("URL", "N/A")
                })
        return products

    def generate_prompt(self, products):
        product_list = "\n".join(
            [f"{i+1}. {p['Title']}, Price: {p['Price']}, Image: {p['Image']}, URL: {p['URL']}"
             for i, p in enumerate(products)]
        )

        return f"""
You are a carbon footprint estimation expert AI.
Given the list of products below, analyze and estimate the carbon footprint score (lower is better).
Return only a valid JSON list in the format:

[
  {{
    "Title": "...",
    "Price": "...",
    "Image": "...",
    "URL": "...",
    "CarbonFootprintScore": ...
  }},
  ...
]

Here is the list:
{product_list}
"""

    def estimate_carbon_footprint(self, products):
        prompt = self.generate_prompt(products)
        response = self.model.generate_content(prompt)
        try:
            json_str = response.text.split("```json")[1].split("```")[0].strip()
            return json.loads(json_str)
        except:
            try:
                return json.loads(response.text)
            except:
                return []

# import google.generativeai as genai
# import os
# import csv
# import json
#
#
# class CarbonFootprintEstimator:
#     def __init__(self):
#         self.model = None
#         self.initialize_gemini()
#
#     def initialize_gemini(self):
#         from dotenv import load_dotenv
#         load_dotenv()
#         api_key = os.getenv("GEMINI_API_KEY")
#         if not api_key:
#             raise Exception("Gemini API key not found in environment")
#         genai.configure(api_key=api_key)
#         self.model = genai.GenerativeModel("gemini-2.0-flash")
#
#     def load_scraped_products(self, filepath):
#         products = []
#         with open(filepath, newline='', encoding='utf-8') as csvfile:
#             reader = csv.DictReader(csvfile)
#             for row in reader:
#                 products.append({
#                     "Title": row.get("Title", "N/A"),
#                     "Price": row.get("Price", "N/A"),
#                     "Image": row.get("Image", "N/A")
#                 })
#         return products
#
#     def generate_prompt(self, products):
#         product_list = "\n".join(
#             [f"{i+1}. {p['Title']}, Price: {p['Price']}, Image: {p['Image']}"
#              for i, p in enumerate(products)]
#         )
#
#         return f"""
# You are a carbon footprint estimator expert AI.
# Given the list of products below, analyze and estimate the carbon footprint of each product.
# Return only a valid JSON list in the format:
# [
#   {{"Title": "...", "Price": "...", "Image": "...", "CarbonFootprintScore": ...}},
#   ...
# ]
# Here is the list:
# {product_list}
# """
#
#     def estimate_carbon_footprint(self, products):
#         prompt = self.generate_prompt(products)
#         response = self.model.generate_content(prompt)
#         try:
#             json_str = response.text.split("```json")[1].split("```")[0].strip()
#             return json.loads(json_str)
#         except:
#             try:
#                 return json.loads(response.text)
#             except:
#                 return []