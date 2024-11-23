from flask import Flask, render_template
from flask_talisman import Talisman  # Para agregar cabeceras de seguridad
from flask_wtf.csrf import CSRFProtect  # Para protección contra CSRF
from dotenv import load_dotenv
import os

# Cargar variables desde .env
load_dotenv()

app = Flask(__name__)


# Configuración básica
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')  # Carga la clave desde .env
app.config['SESSION_COOKIE_SECURE'] = True  # Asegura que las cookies solo se envíen a través de HTTPS
app.config['SESSION_COOKIE_HTTPONLY'] = True  # Evita el acceso a las cookies desde JavaScript
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'  # Protege contra ataques CSRF

# Protección CSRF
csrf = CSRFProtect(app)

# Configurar Talisman para cabeceras de seguridad
csp = {
    'default-src': "'self'",  # Solo permite cargar recursos desde el mismo dominio
    'img-src': "'self' data:",  # Permite cargar imágenes desde el dominio y datos en línea
    'script-src': "'self'",  # Solo permite scripts del dominio
    'style-src': "'self' 'unsafe-inline'",  # Permite estilos en línea para CSS básico
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
    # Nunca uses `debug=True` en producción
    app.run(host='0.0.0.0', port=10000, debug=False)