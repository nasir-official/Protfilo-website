"""
Replit Entry Point - Portfolio Full Stack App
Muhammad Nasir | AI & ML Engineer | Data Scientist
"""
from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
import os

# ─── App Setup ───────────────────────────────────────────────────────────────
app = Flask(__name__, static_folder='frontend', static_url_path='')
CORS(app)

# ─── Database ─────────────────────────────────────────────────────────────────
basedir = os.path.abspath(os.path.dirname(__file__))
db_path = os.path.join(basedir, 'database', 'portfolio.db')
os.makedirs(os.path.dirname(db_path), exist_ok=True)

app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# ─── Models ───────────────────────────────────────────────────────────────────
class PageVisit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    page_name = db.Column(db.String(50), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    user_agent = db.Column(db.String(200))

class ContactMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    subject = db.Column(db.String(200))
    message = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

with app.app_context():
    db.create_all()

# ─── Frontend Routes ──────────────────────────────────────────────────────────
@app.route('/')
def index():
    return send_from_directory('frontend', 'index.html')

@app.route('/admin')
def admin():
    return send_from_directory('frontend', 'admin.html')

# ─── API Routes ───────────────────────────────────────────────────────────────
@app.route('/api/track-view', methods=['POST'])
def track_view():
    data = request.json or {}
    page_name = data.get('page_name', 'unknown')
    user_agent = request.headers.get('User-Agent')
    visit = PageVisit(page_name=page_name, user_agent=user_agent)
    db.session.add(visit)
    db.session.commit()
    return jsonify({"message": "View tracked"}), 201

@app.route('/api/contact', methods=['POST'])
def save_contact():
    data = request.json or {}
    name = data.get('name')
    email = data.get('email')
    subject = data.get('subject', 'No Subject')
    message = data.get('message')
    if not all([name, email, message]):
        return jsonify({"error": "Missing required fields"}), 400
    new_msg = ContactMessage(name=name, email=email, subject=subject, message=message)
    db.session.add(new_msg)
    db.session.commit()
    return jsonify({"message": "Message saved"}), 201

@app.route('/api/messages', methods=['GET'])
def get_messages():
    messages = ContactMessage.query.order_by(ContactMessage.timestamp.desc()).all()
    return jsonify([{
        "id": m.id, "name": m.name, "email": m.email,
        "subject": m.subject, "message": m.message,
        "timestamp": m.timestamp.isoformat()
    } for m in messages])

@app.route('/api/stats', methods=['GET'])
def get_stats():
    views = db.session.query(PageVisit.page_name, db.func.count(PageVisit.id)).group_by(PageVisit.page_name).all()
    messages = db.session.query(db.func.date(ContactMessage.timestamp), db.func.count(ContactMessage.id)).group_by(db.func.date(ContactMessage.timestamp)).all()
    return jsonify({
        "view_stats": [{"name": v[0], "value": v[1]} for v in views],
        "message_stats": [{"date": m[0], "count": m[1]} for m in messages],
        "total_views": PageVisit.query.count(),
        "total_messages": ContactMessage.query.count()
    })

# ─── Run ──────────────────────────────────────────────────────────────────────
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port, debug=False)
