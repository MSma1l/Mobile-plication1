from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import bcrypt
import json
import os

app = Flask(__name__)
CORS(app)

DB_FILE = "users.db"
JSON_FILE = "users.json"

# -----------------------------------------
# FUNCȚIE: Salvează toți utilizatorii într-un fișier .json
# -----------------------------------------
def save_users_to_json():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, email, phone FROM users")
    rows = cursor.fetchall()
    conn.close()

    users = [
        {"id": r[0], "name": r[1], "email": r[2], "phone": r[3]}
        for r in rows
    ]

    with open(JSON_FILE, "w", encoding="utf-8") as f:
        json.dump(users, f, indent=4, ensure_ascii=False)

# -----------------------------------------
# INIT DB + JSON
# -----------------------------------------
def init_db():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT,
            phone TEXT
        )
    """)
    conn.commit()
    conn.close()

    if not os.path.exists(JSON_FILE):
        with open(JSON_FILE, "w", encoding="utf-8") as f:
            json.dump([], f, indent=4)

init_db()

# -----------------------------------------
# REGISTER
# -----------------------------------------
@app.post("/register")
def register():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    phone = data.get("phone", "")

    if not name or not email or not password:
        return jsonify({"message": "Date invalide"}), 400

    hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)",
            (name, email, hashed, phone)
        )
        conn.commit()
        conn.close()

        save_users_to_json()
        return jsonify({"message": "User creat"}), 201

    except Exception as e:
        return jsonify({"message": "Email deja folosit"}), 400

# -----------------------------------------
# LOGIN
# -----------------------------------------
@app.post("/login")
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Date invalide"}), 400

    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, email, password, phone FROM users WHERE email = ?", (email,))
    user = cursor.fetchone()
    conn.close()

    if not user:
        return jsonify({"message": "User nu există"}), 404

    user_id, name, email, password_hash, phone = user

    if bcrypt.checkpw(password.encode(), password_hash.encode()):
        save_users_to_json()
        return jsonify({
            "message": "Logare reușită",
            "user": {"id": user_id, "name": name, "email": email, "phone": phone}
        }), 200
    else:
        return jsonify({"message": "Parolă greșită"}), 401

# -----------------------------------------
# RUN SERVER
# -----------------------------------------
if __name__ == "__main__":
    host = "0.0.0.0"
    port = 5000
    print(f"Serverul rulează! Accesează API-ul la:")
    print(f"  Local: http://127.0.0.1:{port}")
    print(f"Endpoints disponibile:")
    print(f"  POST /register -> înregistrare")
    print(f"  POST /login    -> logare")
    app.run(debug=True, host=host, port=port)
