# Stage 1: Build the application
FROM node:latest as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Set up the production environment
FROM node:latest as production

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy the build artifacts from the builder stage
COPY --from=builder /app/build ./build

# Copy the .env file
COPY .env ./

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "build/index.js"]
