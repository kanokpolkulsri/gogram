# Use official Node.js lightweight image
FROM node:20-alpine

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
COPY package*.json ./

# Install production dependencies.
RUN npm ci --only=production

# Copy local code to the container image.
COPY . .

# Expose port 8080 for Cloud Run
EXPOSE 8080
ENV PORT=8080

# Run the web service on container startup.
CMD [ "npm", "start" ]
