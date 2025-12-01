import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()


app.conf.beat_schedule = {
    "send-promotional-emails-daily": {
        "task": "users.tasks.send_promotional_emails",
        "schedule": crontab(hour=3, minute=13),  # This is UTC 3AM 13 MIN
    },
}
