# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:8.9.4

# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn

WORKDIR /app

# Copy web javascript files into the image.
COPY web /app

# Build for production.
RUN npm i

# Set the command to start the node server.
CMD node server.js

# Tell Docker about the port we'll run on.
EXPOSE 5000