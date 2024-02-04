FROM python:3.11.4-alpine

EXPOSE 8080

ENV PYTHONUNBUFFERED=1 \
    # Prevents Python from buffering stdout and stderr
    PYTHONDONTWRITEBYTECODE=1 \
    # prevents python creating .pyc files
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    FLASK_APP=ichack

WORKDIR /app

# Install dependencies
COPY ./requirements.txt /app/
RUN pip install -r requirements.txt

# Once the dependencies are installed, copy the rest of the application code
COPY ./ichack /app/ichack/

CMD ["flask", "run", "--port", "8080", "--host", "0.0.0.0"]
