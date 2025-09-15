# Use an official Node.js LTS image
FROM node:18

# Create app directory
WORKDIR /app

# Install dependencies first (cache layer)
COPY package*.json ./
RUN npm install --production

# Copy app source
COPY . .

# Expose the port Render will assign
EXPOSE 3000

# Default command (can override in Render)
CMD ["npm", "start"]
