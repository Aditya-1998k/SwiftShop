### Architecture Flow
```python
Client (Browser)
      ↓
   Nginx (80)
      ↓
 Gunicorn (Unix Socket)
      ↓
 Django REST Framework
      ↓
 PostgreSQL / SQLite
      ↓
 Celery → RabbitMQ
```

### Static and Media files
```python
/static → Nginx → filesystem
/media  → Nginx → filesystem
```

### Tech Stack
```bash
Backend - Django, Django REST Framework
WSGI Server -	Gunicorn
Process Manager -	systemd
Web Server -	Nginx
Async Tasks -	Celery
Message Broker -	RabbitMQ
Frontend - React (Vite)
OS - Ubuntu 22.04
```

### Mandotory Installation:
```bash
sudo apt update
sudo apt install python3-pip python3-venv nginx rabbitmq-server -y
```
Start the Rabbitmq service and create user
```bash
sudo systemctl enable rabbitmq-server
sudo systemctl start rabbitmq-server

CELERY_BROKER_URL=amqp://user:password@localhost:5672//
```

```bash
sudo apt install memcached libmemcached-tools
sudo nano /etc/memcached.conf
```
Add below settings
```
-m 256            # memory in MB (adjust if needed)
-p 11211          # port
-l 127.0.0.1      # localhost only (VERY IMPORTANT)
-U 0              # disable UDP
-t 1              # SINGLE THREAD (as you want)
```
```
sudo systemctl restart memcached
sudo systemctl enable memcached
systemctl status memcached
```

Steps:
### Create Virtual Environment and Install required dependency
```bash
cd ~/instances/SwiftShop
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Environment variables
```env
DJANGO_SECRET_KEY="django-insecure-=thln)yv!p%v6_+g9v!o)dnyo2&+tr=gevf52ig&1z+p3b+p+s"

DEBUG=True

ALLOWED_HOSTS=localhost,127.0.0.1,<ip_where_backend_Hosted'
CORS_ALLOWED_ORIGINS=http://<ip_where_react_hosted>:5173


# Razorpay Keys
RAZORPAY_KEY_ID="test"
RAZORPAY_KEY_SECRET="test"

# Email Settings
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'test@gmail.com'
EMAIL_HOST_PASSWORD = 'test'
```

### Changes in settings.py
```python
BASE_DIR = Path(__file__).resolve().parent.parent

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

load_dotenv(BASE_DIR / ".env")
```

Collect Static Files
```bash
python manage.py collectstatic --noinput
```

### Gunicorn (Production WSGI Server)
```
cd backend
gunicorn backend.wsgi:application
  --workers 1
  --threads 1
  --bind 127.0.0.1:8000
```

Let's create production ready service for the backend server:
### Gunicorn WSGI Servicer Service
Step1: Create File
`sudo nano /etc/systemd/system/swiftshop-gunicorn.service`

Step2:
```
[Unit]
Description=SwiftShop Gunicorn Service
After=network.target

[Service]
User=aditya98gupta
Group=www-data
WorkingDirectory=/home/aditya98gupta/instances/SwiftShop/backend
Environment="PATH=/home/aditya98gupta/instances/SwiftShop/venv/bin"
ExecStart=/home/aditya98gupta/instances/SwiftShop/venv/bin/gunicorn \
          backend.wsgi:application \
          --workers 1 \
          --threads 1 \
          --bind unix:/run/swiftshop/gunicorn.sock

Restart=always

[Install]
WantedBy=multi-user.target
```

Step3: 
```bash
sudo systemctl daemon-reload
sudo systemctl start swiftshop-gunicorn
sudo systemctl enable swiftshop-gunicorn
sudo systemctl status swiftshop-gunicorn # check status
```

### NGINX Configuration
Run This `sudo nano /etc/nginx/sites-available/swiftshop` and add below lines
```bash
server {
    listen 80;
    server_name 136.114.244.142;

    client_max_body_size 20M;

    location / {
        proxy_pass http://unix:/run/swiftshop/gunicorn.sock;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /static/ {
        alias /home/aditya98gupta/instances/SwiftShop/backend/staticfiles/;
    }

    location /media/ {
        alias /home/aditya98gupta/instances/SwiftShop/backend/media/;
    }
}
```
Enable Site:
```bash
sudo ln -s /etc/nginx/sites-available/swiftshop /etc/nginx/sites-enabled
sudo nginx -t
sudo systemctl reload nginx
```

### React Service Configuration
Run `sudo nano /etc/systemd/system/swiftshop-react.service`

Add this:
```bash
[Unit]
Description=SwiftShop React Dev Server
After=network.target

[Service]
User=aditya98gupta
WorkingDirectory=/home/aditya98gupta/instances/SwiftShop/frontend
ExecStart=/usr/bin/npm run dev
Restart=always

[Install]
WantedBy=multi-user.target
```

Reload
```bash
sudo systemctl daemon-reload
sudo systemctl start swiftshop-react
sudo systemctl enable swiftshop-react
```

Service COnfiguration for Celery Workers:
Run this: `sudo nano /etc/systemd/system/swiftshop-celery.service`
```bash
[Unit]
Description=SwiftShop Celery Worker
After=network.target rabbitmq-server.service
Requires=rabbitmq-server.service

[Service]
User=aditya98gupta
Group=www-data
WorkingDirectory=/home/aditya98gupta/instances/SwiftShop/backend
Environment="PATH=/home/aditya98gupta/instances/SwiftShop/venv/bin"
ExecStart=/home/aditya98gupta/instances/SwiftShop/venv/bin/celery \
          -A backend worker \
          --loglevel=INFO

Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```
Reload systemd and restart celery service
```
sudo systemctl daemon-reload
sudo systemctl start swiftshop-celery
sudo systemctl enable swiftshop-celery
sudo systemctl status swiftshop-celery
```

### Service Management Commands:
```
6️⃣ Service Management Commands
Action	Command
Check status -	systemctl status <service>
Restart	- systemctl restart <service>
View logs -	journalctl -u <service> -f
Enable on boot -	systemctl enable <service>
Reload configs -	systemctl daemon-reload
```
