// Function to handle sending the message
async function sendMessage() {
    const inputField = document.getElementById("promptInput");
    const userMessage = inputField.value.trim().toLowerCase(); // Convert to lowercase for case-insensitive match

    if (userMessage) {
        const chatContainer = document.getElementById("chatContainer");

        // Create a new chat box for this conversation
        const chatBox = document.createElement("div");
        chatBox.classList.add("chat-box");

        // Display the user's message
        const userMessageDiv = document.createElement("div");
        userMessageDiv.classList.add("message", "user");
        userMessageDiv.textContent = `You: ${userMessage}`;
        chatBox.appendChild(userMessageDiv);

        // Append the chat box to the chat container
        chatContainer.appendChild(chatBox);

        // Scroll to the latest message
        chatContainer.scrollTop = chatContainer.scrollHeight;

        // Clear the input field
        inputField.value = "";

        // Add a loading spinner for the AI's response
        const loadingSpinnerDiv = document.createElement("div");
        loadingSpinnerDiv.classList.add("message", "ai", "loading-spinner");
        loadingSpinnerDiv.innerHTML = `<div class="spinner"></div>`; // Spinner HTML
        chatBox.appendChild(loadingSpinnerDiv);

        // Check if the user is asking about the developer or invention
        let aiResponse = "";
        
        // Handle "Who developed" or "creator of chinni ai" questions
        if (userMessage.includes("who developed chinni ai") || userMessage.includes("who created chinni ai") || userMessage.includes("who invented chinni ai") || userMessage.includes("creator of chinni ai")) {
            aiResponse = `
                Name: Madhu Venkata Satish Juttiga <br>
                College: Aditya RJY <br>
                Email: madhujuttiga1924@gmail.com <br>
                Google Devop id : g.dev/madhu6969
            `;
        } 
        // Handle "Who are you" or "Chinni AI" related questions
        else if (
            userMessage.includes("who are you") || 
            userMessage.includes("who r u") || 
            userMessage.includes("WHO R U") || 
            userMessage.includes("who is chinni ai") ||
            userMessage.includes("who r you") || 
            userMessage.includes("chinni ai")
        ) {
            aiResponse = `
                Hi, I am Chinni AI! I am an exclusive chat model developed by Madhu Juttiga. 
                My main goal is to assist you in solving any problem you might have. 
                Feel free to ask me anything! 
            `;
        }
        else if (
            userMessage.includes("model of chini ai") || 
            userMessage.includes("chinni ai model") || 
            userMessage.includes("which model chinni ai use") || 
            userMessage.includes("version") || 
            userMessage.includes("version of chinni") ||
            userMessage.includes("model of chinni")
        )  {
        aiResponse = `
                Hi, I am Chinni AI version " Chinni AI Quantum 1.0 "
            `;
        }   
        else {
            // Send the user message to the backend for general AI responses
            try {
                const response = await fetch("https://chinniai.onrender.com", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ prompt: userMessage }),
                });

                const data = await response.json();
                aiResponse = data.response || "Sorry, no response received."; // Placeholder for backend response
            } catch (error) {
                aiResponse = "Error connecting to the server. Please try again."; // Handle errors during fetch
            }
        }
        
        // Replace the loading spinner with the AI's response
        loadingSpinnerDiv.remove(); // Remove the spinner
        const aiMessageDiv = document.createElement("div");
        aiMessageDiv.classList.add("message", "ai");

        // Add Chinni AI label with animation
        const chinniAiLabel = `<span class="animate-charcter">Chinni AI:</span>`;
        aiMessageDiv.innerHTML = `${chinniAiLabel} ${aiResponse}`;
        chatBox.appendChild(aiMessageDiv);

        // Add a copy button
        const copyBtn = document.createElement("button");
        copyBtn.classList.add("copy-btn");
        copyBtn.textContent = "Copy";
        copyBtn.onclick = () => {
            const messageText = aiMessageDiv.textContent.replace("Chinni AI: ", ""); // Remove "Chinni AI: "
            navigator.clipboard.writeText(messageText)
                .then(() => {
                    showCopyNotification(); // Show notification
                })
                .catch((err) => {
                    console.error("Failed to copy text: ", err);
                    alert("Failed to copy text.");
                });
        };
        chatBox.appendChild(copyBtn);

        // Scroll to the latest message
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}

// Add event listener to the send button
document.querySelector(".send-button").addEventListener("click", sendMessage);

// Add event listener to the input field for the Enter key
document.getElementById("promptInput").addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent the default behavior of pressing Enter (e.g., creating a new line)
        sendMessage();
    }
});
// Show copy notification in the center of the screen with animation
function showCopyNotification() {
    const notification = document.createElement("div");
    notification.classList.add("copy-notification");
    notification.textContent = "Copied to clipboard!";

    // Add notification to the body
    document.body.appendChild(notification);

    // Show notification with animation
    setTimeout(() => {
        notification.classList.add("show");
    }, 10);

    // Hide notification after a short time
    setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => {
            document.body.removeChild(notification); // Remove notification after animation
        }, 500);
    }, 2000); // Notification stays for 2 seconds
}
document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("welcome-popup");
    const closeBtn = document.getElementById("close-popup");
  
    // Show popup on load
    popup.classList.add("show");
  
    // Hide popup on button click
    closeBtn.addEventListener("click", () => {
      popup.classList.remove("show");
    });
  });
  
