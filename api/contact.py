cat > api/contact.py << 'EOF'
from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

app = Flask(__name__)
CORS(app)

def send_email_handler(data):
    SMTP_SERVER = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
    SMTP_PORT = int(os.getenv('SMTP_PORT', 587))
    SENDER_EMAIL = os.getenv('SENDER_EMAIL')
    SENDER_PASSWORD = os.getenv('SENDER_PASSWORD')
    RECIPIENT_EMAIL = os.getenv('RECIPIENT_EMAIL', SENDER_EMAIL)
    
    if not SENDER_EMAIL or not SENDER_PASSWORD:
        raise Exception("Email configuration missing")
    
    msg = MIMEMultipart('alternative')
    msg['Subject'] = f"Portfolio Contact: {data['firstName']} {data['lastName']}"
    msg['From'] = SENDER_EMAIL
    msg['To'] = RECIPIENT_EMAIL
    
    text = f"""
New Contact Form Submission:

Name: {data['firstName']} {data['lastName']}
Email: {data['email']}
Phone: {data.get('phone', 'Not provided')}

Message:
{data['message']}
    """
    
    html = f"""
<html>
<body style="font-family: Arial, sans-serif;">
    <h2 style="color: #333;">New Contact Form Submission</h2>
    <table style="border-collapse: collapse; width: 100%;">
        <tr>
            <td style="padding: 8px; background: #f5f5f5;"><strong>Name:</strong></td>
            <td style="padding: 8px;">{data['firstName']} {data['lastName']}</td>
        </tr>
        <tr>
            <td style="padding: 8px; background: #f5f5f5;"><strong>Email:</strong></td>
            <td style="padding: 8px;"><a href="mailto:{data['email']}">{data['email']}</a></td>
        </tr>
        <tr>
            <td style="padding: 8px; background: #f5f5f5;"><strong>Phone:</strong></td>
            <td style="padding: 8px;">{data.get('phone', 'Not provided')}</td>
        </tr>
        <tr>
            <td style="padding: 8px; background: #f5f5f5; vertical-align: top;"><strong>Message:</strong></td>
            <td style="padding: 8px;">{data['message']}</td>
        </tr>
    </table>
</body>
</html>
    """
    
    part1 = MIMEText(text, 'plain')
    part2 = MIMEText(html, 'html')
    msg.attach(part1)
    msg.attach(part2)
    
    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls()
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        server.send_message(msg)
    
    return {"message": "Email sent successfully"}

@app.route('/api/contact', methods=['POST'])
def send_email():
    try:
        data = request.json
        
        # Validate required fields
        required_fields = ['firstName', 'lastName', 'email', 'message']
        missing_fields = [field for field in required_fields if field not in data or not data[field]]
        
        if missing_fields:
            return jsonify({'error': f'Missing fields: {", ".join(missing_fields)}'}), 400
        
        result = send_email_handler(data)
        return jsonify(result), 200
        
    except smtplib.SMTPAuthenticationError:
        return jsonify({'error': 'Email authentication failed'}), 500
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': 'Failed to send email'}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'}), 200

# Vercel serverless function handler
def handler(request, context):
    return app(request.environ, lambda s, h, d: None)
EOF