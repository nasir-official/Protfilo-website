from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# Database Configuration
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, '../database/portfolio.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Models
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

# Create tables
with app.app_context():
    db.create_all()

# API Routes
@app.route('/api/track-view', methods=['POST'])
def track_view():
    data = request.json
    page_name = data.get('page_name', 'unknown')
    user_agent = request.headers.get('User-Agent')
    
    visit = PageVisit(page_name=page_name, user_agent=user_agent)
    db.session.add(visit)
    db.session.commit()
    
    return jsonify({"message": "View tracked successfully"}), 201

@app.route('/api/contact', methods=['POST'])
def save_contact():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    subject = data.get('subject', 'No Subject')
    message = data.get('message')
    
    if not all([name, email, message]):
        return jsonify({"error": "Missing required fields"}), 400
    
    new_message = ContactMessage(name=name, email=email, subject=subject, message=message)
    db.session.add(new_message)
    db.session.commit()
    
    return jsonify({"message": "Message saved successfully"}), 201

@app.route('/api/stats', methods=['GET'])
def get_stats():
    # Page View Stats
    views = db.session.query(PageVisit.page_name, db.func.count(PageVisit.id)).group_by(PageVisit.page_name).all()
    view_stats = [{"name": v[0], "value": v[1]} for v in views]
    
    # Message Stats (per day for example)
    messages = db.session.query(db.func.date(ContactMessage.timestamp), db.func.count(ContactMessage.id)).group_by(db.func.date(ContactMessage.timestamp)).all()
    message_stats = [{"date": m[0], "count": m[1]} for m in messages]
    
    # Total Counts
    total_views = PageVisit.query.count()
    total_messages = ContactMessage.query.count()
    
    return jsonify({
        "view_stats": view_stats,
        "message_stats": message_stats,
        "total_views": total_views,
        "total_messages": total_messages
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
