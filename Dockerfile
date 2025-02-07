# Use Node.js as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build the Vite app
RUN npm run build

# Install `serve` to serve the static files
RUN npm install -g serve

# Expose port 5173 for Vite
EXPOSE 5173

# Start the application on port 5173
CMD ["serve", "-s", "dist", "-l", "5173"]
