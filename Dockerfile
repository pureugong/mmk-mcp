# Generated by https://smithery.ai. See: https://smithery.ai/docs/config#dockerfile
##########################################################
# Dockerfile for MCP server - Magic Meal Kits
##########################################################

# Use node lts-alpine base image
FROM node:lts-alpine

# Set working directory
WORKDIR /app

# Copy package files and tsconfig
COPY package*.json ./
COPY tsconfig.json ./

# Copy source code
COPY src ./src

# Install dependencies without running prepare scripts
RUN npm ci --ignore-scripts

# Build the project
RUN npm run build

# Expose any necessary ports if needed (not used for stdio)

# Command to run the MCP server
CMD ["node", "build/src/index.js"]
