FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Install `serve` to serve the static files
RUN npm install -g serve      
EXPOSE 5173
# Start the application on port 5173
CMD ["serve", "-s", "dist", "-l", "5173"]
