# Use official Node.js image
FROM node:22

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Expose the port NestJS listens on
EXPOSE 3000

# Run the app
CMD ["npm", "run", "start:dev"]
