# Use Node.js base image
FROM node:20
 
# Set working directory
WORKDIR /usr/src/app
 
# Copy package files and install dependencies
COPY package*.json ./
RUN npm install
 
# Install Prisma CLI globally
RUN npm install -g prisma
 
# Copy application code
COPY . .
 
# Generate Prisma client
RUN npx prisma generate
 
# Expose application port
EXPOSE 3000
 
# Start the application
CMD ["npm", "run", "start"]