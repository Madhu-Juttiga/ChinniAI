from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import google.generativeai as genai
import os
from dotenv import load_dotenv
import logging

# Load environment variables from chinni.env
load_dotenv("chinni.env")

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load the Gemini API key from environment variables
genai_api_key = os.getenv("GENAI_API_KEY")

if not genai_api_key:
    logger.error("GENAI_API_KEY is not set. Please configure your environment variables in chinni.env.")
    raise ValueError("GENAI_API_KEY is not set. Please configure your environment variables.")

# Create the Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Configure the Gemini API
genai.configure(api_key=genai_api_key)
model = genai.GenerativeModel("gemini-1.5-flash")

# Route for generating responses using Gemini AI
@app.route('/generate', methods=['POST'])
def generate():
    data = request.json  # Parse JSON data from frontend
    prompt = data.get("prompt", "")

    if not prompt:
        logger.warning("No prompt provided in the request.")
        return jsonify({"error": "Prompt is required"}), 400

    try:
        # Generate response using Gemini model
        response = model.generate_content(prompt)

        if hasattr(response, 'text') and response.text:  # Ensure the response contains 'text'
            # Split the response into lines for better formatting
            formatted_response = response.text.strip().split('\n')
            logger.info(f"Response generated successfully for prompt: {prompt}")
            return jsonify({"response": formatted_response})
        else:
            logger.error("No valid response from Gemini model.")
            return jsonify({"error": "No valid response from Gemini model"}), 500
    except Exception as e:
        logger.error(f"Error generating response: {e}")
        return jsonify({"error": str(e)}), 500

# Route for a basic message echoing functionality
@app.route('/api/message', methods=['POST'])
def handle_message():
    data = request.json  # Parse JSON data sent from frontend
    user_message = data.get('message', '')

    if not user_message:
        logger.warning("No message provided in the request.")
        return jsonify({"error": "Message is required"}), 400

    response_message = f"You said: {user_message}"  # Example response
    logger.info(f"Message handled successfully: {user_message}")
    return jsonify({'response': response_message})

# Route for home page (index.html)
@app.route('/')
def home():
    return render_template('index.html')

# Route for the chat functionality
@app.route('/chat', methods=['POST'])
def chat():
    # Your chat logic here (you can modify this part)
    data = request.json  # Assuming you send a message from the frontend
    user_message = data.get('message', '')
    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    # Example response, replace this with actual chat logic
    response_message = f"You said: {user_message}"
    return jsonify({"response": response_message})

if __name__ == '__main__':
    # Ensure the app runs in production mode
    logger.info("Starting the Flask app...")
    app.run(host='0.0.0.0', port=5001)
