# Use official Python slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy dependencies file
COPY deps.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r deps.txt

# Copy the rest of the app
COPY . .

# Expose Flask port
EXPOSE 5000

# Run the application
CMD ["python", "app.py"]
