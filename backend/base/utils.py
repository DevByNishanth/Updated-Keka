

from django.core.mail import send_mail
import random

def send_otp(email):
    otp = random.randint(100000, 999999)  # Generate a 6-digit OTP
    subject = 'Your OTP for Email Verification'
    message = f'Your OTP is {otp}. Please verify your email to continue.'
    send_mail(subject, message, 'your_email@example.com', [email])
    return otp
