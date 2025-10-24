# server_db.py
import sqlite3
from sqlite3 import Error

# Funcție pentru crearea conexiunii la baza de date
def create_connection(db_file):
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        print(f"Conectat la SQLite, versiune: {sqlite3.version}")
    except Error as e:
        print(f"Eroare la conectare: {e}")
    return conn

# Funcție pentru crearea tabelelor
def create_tables(conn):
    try:
        cursor = conn.cursor()
        cursor.executescript("""
        CREATE TABLE IF NOT EXISTS utilizator (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            nume VARCHAR(100) NOT NULL,
            email VARCHAR(150) UNIQUE NOT NULL,
            parola_hash VARCHAR(255) NOT NULL,
            gen VARCHAR(20),
            inaltime DECIMAL(5,2),
            greutate DECIMAL(5,2),
            stil_preferat VARCHAR(50),
            data_inregistrarii TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS haine (
            item_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER REFERENCES utilizator(user_id) ON DELETE CASCADE,
            nume_item VARCHAR(100),
            categorie VARCHAR(50),
            culoare VARCHAR(30),
            sezon VARCHAR(20),
            ocazie VARCHAR(30),
            material VARCHAR(50),
            imagine_url TEXT,
            data_adaugarii TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS outfituri (
            outfit_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER REFERENCES utilizator(user_id) ON DELETE CASCADE,
            nume_outfit VARCHAR(100),
            stil VARCHAR(50),
            sezon VARCHAR(20),
            ocazie VARCHAR(30),
            scor_AI DECIMAL(4,2),
            data_generarii TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS outfit_item (
            outfit_id INTEGER REFERENCES outfituri(outfit_id) ON DELETE CASCADE,
            item_id INTEGER REFERENCES haine(item_id) ON DELETE CASCADE,
            PRIMARY KEY (outfit_id, item_id)
        );

        CREATE TABLE IF NOT EXISTS meteo (
            meteo_id INTEGER PRIMARY KEY AUTOINCREMENT,
            data DATE NOT NULL,
            locatie VARCHAR(100),
            temperatura DECIMAL(5,2),
            conditii VARCHAR(50),
            recomandare_generata TEXT
        );

        CREATE TABLE IF NOT EXISTS preferinte (
            preferinta_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER REFERENCES utilizator(user_id) ON DELETE CASCADE,
            outfit_id INTEGER REFERENCES outfituri(outfit_id) ON DELETE CASCADE,
            scor SMALLINT CHECK (scor IN (-1, 1)),
            data_feedback TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS calendar_outfit (
            calendar_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER REFERENCES utilizator(user_id) ON DELETE CASCADE,
            outfit_id INTEGER REFERENCES outfituri(outfit_id) ON DELETE CASCADE,
            data_programata DATE NOT NULL,
            status VARCHAR(20) DEFAULT 'planificat'
        );

        CREATE TABLE IF NOT EXISTS shop_items (
            shop_item_id INTEGER PRIMARY KEY AUTOINCREMENT,
            brand VARCHAR(100),
            categorie VARCHAR(50),
            culoare VARCHAR(30),
            pret DECIMAL(10,2),
            link_produs TEXT,
            imagine_url TEXT
        );

        CREATE TABLE IF NOT EXISTS suggested_match (
            item_id INTEGER REFERENCES haine(item_id) ON DELETE CASCADE,
            shop_item_id INTEGER REFERENCES shop_items(shop_item_id) ON DELETE CASCADE,
            compatibilitate DECIMAL(4,2),
            PRIMARY KEY (item_id, shop_item_id)
        );

        CREATE TABLE IF NOT EXISTS tryon (
            tryon_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER REFERENCES utilizator(user_id) ON DELETE CASCADE,
            item_id INTEGER REFERENCES haine(item_id) ON DELETE CASCADE,
            model_3d_url TEXT,
            data_generarii TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """)
        print("Tabelele au fost create cu succes!")
    except Error as e:
        print(f"Eroare la crearea tabelelor: {e}")

# Funcție principală
def main():
    database = "outfit_app.db"
    conn = create_connection(database)
    if conn is not None:
        create_tables(conn)
        conn.close()
    else:
        print("Eroare! Nu se poate crea conexiunea la baza de date.")

if __name__ == "__main__":
    main()
