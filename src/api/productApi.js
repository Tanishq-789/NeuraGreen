export async function analyzeProduct(query) {
  try {
    const response = await fetch('http://localhost:8000/api/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query }),
});


    // Check if the HTTP response status is not OK (e.g., 400, 500)
    if (!response.ok) {
      const errorData = await response.text(); // Fetch the error response text
      throw new Error(`❌ Backend error: ${response.status} - ${errorData}`);
    }

    const data = await response.json(); // Parse JSON response

    // Validate response structure
    if (!data || !Array.isArray(data.top_3_products)) {
      throw new Error('❌ Invalid response format from backend');
    }

    return data.top_3_products; // Return the extracted product list
  } catch (error) {
    console.error("🔥 Error in analyzeProduct():", error.message || error);
    throw error; // Re-throw error for the caller to handle
  }
}
