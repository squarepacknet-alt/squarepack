from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import os
import smtplib


def send_notification_email(inquiry: dict):
    smtp_host = os.getenv("SMTP_HOST")
    smtp_port = int(os.getenv("SMTP_PORT", 587))
    smtp_user = os.getenv("SMTP_USER")
    smtp_pass = os.getenv("SMTP_PASS")
    smtp_from = os.getenv("SMTP_FROM")
    admin_email = os.getenv("ADMIN_EMAIL")

    if not all([smtp_host, smtp_user, smtp_pass, admin_email]):
        print("DEBUG: SMTP not fully configured, skipping email.")
        return

    msg = MIMEMultipart()
    msg["From"] = smtp_from
    msg["To"] = admin_email
    msg["Subject"] = f"New Inquiry from {inquiry['name']} - SquarePack"

    body = f"""
    New inquiry received:
    
    Name: {inquiry['name']}
    Email: {inquiry['email']}
    Phone: {inquiry['phone']}
    Topic: {inquiry['topic']}
    
    Message:
    {inquiry['message']}
    
    Sent at: {inquiry['created_at']}
    """
    msg.attach(MIMEText(body, "plain"))

    try:
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.send_message(msg)
        print(f"DEBUG: Email sent to {admin_email}")
    except Exception as e:
        print(f"ERROR: Failed to send email: {e}")
