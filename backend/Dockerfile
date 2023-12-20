FROM python:3.9

WORKDIR /app

COPY . /app

ENV PYTHONDONTWRITEBYTECODE 1

COPY ./requirements.txt /app/requirements.txt

RUN pip install -r /app/requirements.txt

CMD ["uvicorn", "components.endpoints.endpoints:app", "--reload", "--host", "0.0.0.0", "--port", "80"]
