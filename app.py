from flask import Flask, render_template
from flask_talisman import Talisman  # Para agregar cabeceras de seguridad
from flask_wtf.csrf import CSRFProtect  # Para protección contra CSRF
from dotenv import load_dotenv
import os

# Cargar variables desde .env
load_dotenv()

app = Flask(__name__)

# Configuración básica
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev')  # Usa 'dev' como clave predeterminada en desarrollo
app.config['SESSION_COOKIE_SECURE'] = os.getenv('SESSION_COOKIE_SECURE', 'False').lower() == 'true'
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'

# Protección CSRF
csrf = CSRFProtect(app)

# Configurar Talisman (desactivado en desarrollo)
if os.getenv('FLASK_ENV', 'development') == 'production':
    csp = {
        'default-src': "'self'",
        'img-src': "'self' data:",
        'script-src': "'self'",
        'style-src': "'self' 'unsafe-inline'",
    }
    Talisman(app, content_security_policy=csp)

# Rutas
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/servicios')
def servicios():
    return render_template('servicios.html')

@app.route('/juego')
def juego():
    return render_template('juego.html')

# Ejecutar la aplicación
if __name__ == '__main__':
    # Ejecuta en modo de desarrollo local
    app.run(host='127.0.0.1', port=3000, debug=True)
