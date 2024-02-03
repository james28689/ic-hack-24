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

COPY ./pyproject.toml ./ichack /app/
COPY ./ichack /app/ichack/

RUN pip install .

CMD ["flask", "run", "--port", "8080", "--host", "0.0.0.0"]
