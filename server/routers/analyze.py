from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from server.services.scraper import scrape_products
from server.services.gemini import CarbonFootprintEstimator

router = APIRouter()

class ProductQuery(BaseModel):
    query: str

@router.post("/analyze")
async def analyze_product(payload: ProductQuery):
    try:
        query = payload.query.strip()

        if not query:
            raise HTTPException(status_code=400, detail="Query cannot be empty.")

        df = scrape_products(query)

        estimator = CarbonFootprintEstimator()
        products = estimator.load_scraped_products("Output/scraped_products.csv")
        results = estimator.estimate_carbon_footprint(products)

        if not results:
            raise HTTPException(status_code=502, detail="Gemini returned no results.")

        return {"top_3_products": results[:3]}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
