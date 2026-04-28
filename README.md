🤖 Genius — AI Chat App (n8n Webhook)
    -A minimal ChatGPT-style AI chat application with a clean dark UI, powered by n8n webhooks and an AI agent.

🚀 Features:-
 -Dark, modern UI
 -Real-time chat interface
 -Webhook integration with n8n
 -Fast and minimal design
 -AI-powered responses

🛠️ Tech Stack:-
 -Frontend: React (TanStack Router)
 -Styling: Tailwind CSS
 -Backend: n8n (Webhook + AI Agent)
 -AI Model: OpenAI Chat Model

📂 Project Structure:-
ai-chat-n8n/
 ├── src/
 ├── public
 ├── package.json
 ├── n8n-workflow.json
 ├── README.md
 ├── screenshot.png
 └── workflow.png
 
⚙️ Setup Instructions:-
1. Clone Repository
  git clone https://github.com/your-username/ai-chat-n8n-webhook.git
  cd ai-chat-n8n-webhook
2. Install Dependencies
   npm install
3. Run the App
   npm run dev
4. Setup n8n Workflow
  -Open n8n
  -Import n8n-workflow.json
  -Click Publish (very important)
  -Copy Production Webhook URL
5. Configure Webhook
  Update in your code:
 const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL;

🔄 How It Works
 -User sends message
 -Message sent to n8n webhook
 -AI Agent processes request
 -Response returned to chat 

Webhook-Based AI Chat Workflow (n8n):-
   <img width="1547" height="631" alt="n8n-chat workflow" src="https://github.com/user-attachments/assets/9bdbe261-de07-431b-8eba-a4fb6dd880d6" />


Genius — Webhook-Based AI Chat App:-
   <img width="1920" height="1080" alt="genius-chatapp" src="https://github.com/user-attachments/assets/5db51f25-51d9-4de4-8db4-31fa84abb4ce" />

