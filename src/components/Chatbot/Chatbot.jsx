import React, { useState } from 'react';

// MUHAMMAD LUTAFULLAH - COMPLETE CV DATA
const CV_DATA = `
═══════════════════════════════════════════════════════
MUHAMMAD LUTAF ULLAH - FULL STACK & AI DEVELOPER
═══════════════════════════════════════════════════════

📞 CONTACT INFORMATION:
- Phone/WhatsApp: +92 3027899450
- Email: muhammad.fit450@gmail.com
- Portfolio: https://muhammadlutafullah.vercel.app/
- GitHub: https://github.com/Muhammad-LutafUllah
- LinkedIn: https://linkedin.com/in/Muhammad-LutafUllah
- Location: Faisalabad, Pakistan

🎯 PROFESSIONAL SUMMARY:
Full Stack Developer with 2+ years of experience in frontend development using React, Next.js, and modern UI frameworks, specializing in creating pixel-perfect, responsive web applications. Currently working as a Junior AI Developer, building RAG-based chatbots, embeddings, and intelligent automation systems using FastAPI and Python. Skilled in bridging beautiful frontend interfaces with powerful AI backend systems to deliver scalable, full-stack solutions.

🛠️ TECHNICAL SKILLS:

• AI DEVELOPMENT:
  - RAG Systems, Embeddings & Vector Search
  - FastAPI, Machine Learning (Scikit-learn, Pandas, NumPy)
  - Document Processing

• FRONTEND DEVELOPMENT:
  - React.js, Next.js, Tailwind CSS, DaisyUI
  - Responsive UI, Component-Based Architecture
  - React Hook Form, API Integration

• BACKEND & DATABASES:
  - Python, FastAPI, SQL
  - MongoDB, PostgreSQL, Supabase

• DEPLOYMENT & TOOLS:
  - Vercel, cPanel, AWS Deployment
  - Git & GitHub, API Testing & Integration
  - VS Code, PyCharm, Postman, Figma, Adobe XD

• PROGRAMMING LANGUAGES:
  - Python, JavaScript, HTML5, CSS3, SQL

💼 PROFESSIONAL EXPERIENCE:

Junior AI Developer | Vistothemes (AI Division) (2026 – Present)
Faisalabad, Pakistan
• Developed RAG-based chatbots for accurate, context-aware responses
• Integrated embeddings and document search for intelligent data retrieval
• Built APIs using FastAPI for AI model interaction
• Designed automation workflows to improve user decision-making

Frontend Developer | Technupur (2023 – 2025)
Faisalabad, Pakistan
• Developed responsive websites using HTML, CSS, Tailwind, and JavaScript
• Converted UI/UX designs into pixel-perfect interfaces
• Built admin dashboards using React & Next.js
• Integrated APIs and handled CRUD operations
• Followed component-based architecture for scalability

📁 PROJECTS:

• Personal ATS System | Live Demo
  - AI-powered resume screening system using RAG technology
  - Matches resumes with job descriptions with percentage analysis
  - Tech: Python, Streamlit, OpenRouter API, PyPDF2

• AI Portfolio Chatbot | Live Demo
  - Interactive portfolio chatbot for CV/Resume based Q&A
  - Real-time responses and context-aware conversations
  - Tech: React, OpenRouter API, TailwindCSS

• Skyy Go - Flight Booking Platform | Live Demo
  - Flight booking platform for searching flights and comparing prices
  - Secure payment options for seamless travel planning
  - Tech: React, API Integration, Payment Gateway

• Gaming Character - Artwork Marketplace | Live Demo
  - React-based platform for selling gaming artwork
  - User dashboard for sellers, admin dashboard for monitoring
  - Tech: React, Firebase, Dashboard, Admin Panel

🎓 EDUCATION:
Bachelor of Sciences in Information Technology
Government College University Faisalabad (2019 – 2023)
• Coursework: Data Structures, Algorithms, Databases, Web Development, Machine Learning

⭐ SOFT SKILLS:
Problem Solving, Team Collaboration, Communication, Time Management, Adaptability, Attention to Detail, Critical Thinking
`;

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const isLocal = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1';
      
      let response;
      
      if (isLocal) {
        // LOCAL MODE
        const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
        
        const fullPrompt = `You are Muhammad Lutafullah's AI assistant. Answer questions STRICTLY based on this CV:

${CV_DATA}

IMPORTANT RULES:
1. For CONTACT info: Provide phone +92 3027899450 and email muhammad.fit450@gmail.com
2. For SKILLS: List from Technical Skills section
3. For EXPERIENCE: Share from Professional Experience section
4. If information NOT in CV: Say "This is not in my CV"

User question: ${input}`;

        response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'meta-llama/llama-3-8b-instruct',
            messages: [{ role: 'user', content: fullPrompt }],
            temperature: 0.5,
            max_tokens: 600
          })
        });
      } else {
        // PRODUCTION MODE (Vercel)
        response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: input, cvData: CV_DATA }),
        });
      }

      const data = await response.json();
      
      let botReply = "Sorry, I couldn't process your request.";
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        botReply = data.choices[0].message.content;
      } else if (data.content) {
        botReply = data.content;
      } else if (typeof data === 'string') {
        botReply = data;
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: botReply }]);
      
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Error connecting. Please try again.\n\n📞 Contact Muhammad: +92 3027899450'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes float-chat {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0px); }
          }
          @keyframes pulse-shadow-bw {
            0% { box-shadow: 0 4px 15px rgba(0,0,0,0.8), 0 0 0 0 rgba(255, 255, 255, 0.4); }
            70% { box-shadow: 0 4px 15px rgba(0,0,0,0.8), 0 0 0 15px rgba(255, 255, 255, 0); }
            100% { box-shadow: 0 4px 15px rgba(0,0,0,0.8), 0 0 0 0 rgba(255, 255, 255, 0); }
          }
          .bw-chat-btn {
            animation: float-chat 3s ease-in-out infinite, pulse-shadow-bw 2s infinite;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            background: #000;
            color: #fff;
            border: 2px solid #333;
          }
          .bw-chat-btn:hover {
            transform: scale(1.15) translateY(-5px);
            animation: pulse-shadow-bw 2s infinite; 
            background: #fff;
            color: #000;
            border: 2px solid #000;
          }
          .bw-chat-icon {
            display: inline-block;
            transition: transform 0.3s ease;
          }
          .bw-chat-btn:hover .bw-chat-icon {
            transform: rotate(15deg) scale(1.2);
          }
          
          /* Custom scrollbar for dark theme */
          .dark-chat-scroll::-webkit-scrollbar {
            width: 6px;
          }
          .dark-chat-scroll::-webkit-scrollbar-track {
            background: #111;
          }
          .dark-chat-scroll::-webkit-scrollbar-thumb {
            background: #444;
            border-radius: 3px;
          }
          .dark-chat-scroll::-webkit-scrollbar-thumb:hover {
            background: #666;
          }

          .chat-tooltip {
            position: fixed;
            bottom: 35px;
            right: 90px;
            background: #fff;
            color: #000;
            padding: 8px 14px;
            border-radius: 20px 20px 0 20px;
            font-weight: bold;
            font-size: 14px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.5);
            z-index: 1000;
            pointer-events: none;
            animation: bounce-tooltip 2s infinite;
          }

          @keyframes bounce-tooltip {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
        `}
      </style>

      {!isOpen && (
        <div className="chat-tooltip">
          Talk to me! 👋
        </div>
      )}

      <button className="bw-chat-btn" onClick={() => setIsOpen(!isOpen)} style={{
        position: 'fixed', bottom: '20px', right: '20px',
        borderRadius: '50%', width: '60px', height: '60px', fontSize: '28px', cursor: 'pointer',
        zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <span className="bw-chat-icon">💬</span>
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed', bottom: '90px', right: '20px', width: '380px',
          height: '550px', backgroundColor: '#0a0a0a', borderRadius: '16px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.8)', display: 'flex',
          flexDirection: 'column', zIndex: 1000, border: '1px solid #333'
        }}>
          <div style={{
            background: '#000', borderBottom: '1px solid #333',
            color: 'white', padding: '15px', borderRadius: '16px 16px 0 0',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div>
              <h3 style={{ margin: 0, fontWeight: 'bold' }}>Muhammad Lutafullah</h3>
              <p style={{ margin: 0, fontSize: '12px', color: '#aaa' }}>Junior AI Developer</p>
            </div>
            <button onClick={() => setIsOpen(false)} style={{
              background: 'none', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer', opacity: 0.7
            }}>✕</button>
          </div>

          <div className="dark-chat-scroll" style={{ flex: 1, overflowY: 'auto', padding: '15px', backgroundColor: '#111' }}>
            {messages.length === 0 && (
              <div style={{ textAlign: 'center', color: '#888', marginTop: '50px' }}>
                <div style={{ fontSize: '48px' }}>🤖</div>
                <p style={{ fontWeight: 'bold', marginTop: '10px', color: '#fff' }}>Hi! I'm Muhammad's AI Assistant</p>
                <div style={{ fontSize: '12px', marginTop: '20px', color: '#666' }}>
                  Ask me about:<br/>💻 Skills<br/>🚀 Experience<br/>📁 Projects<br/>📞 Contact
                </div>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: '10px'
              }}>
                <div style={{
                  maxWidth: '80%', padding: '10px', borderRadius: '12px',
                  backgroundColor: msg.role === 'user' ? '#fff' : '#222',
                  color: msg.role === 'user' ? '#000' : '#fff',
                  border: msg.role === 'user' ? 'none' : '1px solid #333',
                  whiteSpace: 'pre-wrap'
                }}>{msg.content}</div>
              </div>
            ))}
            {isLoading && <div style={{ padding: '10px', color: '#aaa' }}>Thinking...</div>}
          </div>

          <div style={{ padding: '15px', borderTop: '1px solid #333', backgroundColor: '#0a0a0a', borderRadius: '0 0 16px 16px', display: 'flex', gap: '10px' }}>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about skills, experience, projects..."
              style={{ flex: 1, padding: '10px', border: '1px solid #333', borderRadius: '8px', outline: 'none', backgroundColor: '#222', color: '#fff' }}
            />
            <button onClick={sendMessage} disabled={isLoading}
              style={{ background: '#fff', color: '#000', fontWeight: 'bold', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', opacity: isLoading ? 0.5 : 1 }}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;