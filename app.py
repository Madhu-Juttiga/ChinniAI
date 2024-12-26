from flask import Flask, jsonify, request
from flask_cors import CORS
import google.generativeai as genai

# Create the Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Configure the Gemini API
genai.configure(api_key="AIzaSyBYrablw49C1MdSopqC0MSOdVCyrk6_Aug")
model = genai.GenerativeModel("gemini-1.5-flash")

# Route for generating responses using Gemini AI
@app.route('/generate', methods=['POST'])
def generate():
    data = request.json  # Parse JSON data from frontend
    prompt = data.get("prompt", "")
    
    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400
    
    try:
        # Generate response using Gemini model
        response = model.generate_content(prompt)

        # Split the response into lines for better formatting
        formatted_response = response.text.strip().split('\n')

        # Return the response as a list of lines
        return jsonify({"response": formatted_response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route for a basic message echoing functionality
@app.route('/api/message', methods=['POST'])
def handle_message():
    data = request.json  # Parse JSON data sent from frontend
    user_message = data.get('message', '')
    response_message = f"You said: {user_message}"  # Example response
    return jsonify({'response': response_message})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
