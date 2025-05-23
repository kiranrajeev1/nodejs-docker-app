# ---------- Stage 1: Build ----------
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy the rest of the application
COPY . .

# ---------- Stage 2: Runtime ----------
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only the built app and dependencies from builder stage
COPY --from=builder /app /app

# Expose the app port
EXPOSE 3000

# Run the app
CMD ["node", "server.js"]