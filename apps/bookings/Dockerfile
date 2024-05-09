# Use Node:alpine as the base image for development
FROM node:alpine AS development

# Set the working directory
WORKDIR /usr/src/app
# Set up the development environment
COPY package.json pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json
RUN npm install -g pnpm
RUN pnpm install -r
# Copy application code
COPY . .
# Build the application
RUN pnpm run build bookings

# -----------------------------------------------------------------
# Create a production image
# -------------------------------------------------------------------
FROM node:alpine AS production

# Set environment variable
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set working directory
WORKDIR /usr/src/app
# Copy package files
COPY package.json pnpm-lock.yaml ./
# Install package the package manager
RUN npm install -g pnpm
# Install dependencies for production only
RUN pnpm install --prod
# Copy files from the development stage
COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/package.json ./package.json
# Expose the port and set the command
EXPOSE 3000
CMD [ "node", "dist/apps/bookings/main" ]