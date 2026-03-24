# Use the official Python image
FROM python:3.13-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=8000

# Set the working directory
WORKDIR /app

# Install system dependencies (required for some Python packages)
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the Django project code
COPY . /app/

# Collect static files (WhiteNoise needs this)
RUN python manage.py collectstatic --noinput

# Expose the port Render expects
EXPOSE 8000

# Start Gunicorn (Replace 'metiquest.wsgi' with your actual project folder name if different)
# The Magic Command: Run migrations, run your custom script, and start Gunicorn
CMD ["bash", "-c", "python manage.py migrate --noinput && python createsuperuser.py && gunicorn metiquest.wsgi:application --bind 0.0.0.0:8000"]