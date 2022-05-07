# Using node 16
FROM node:16-slim

# Change timezone of container from UTC to EST
RUN rm -rf /etc/localtime
RUN ln -s /usr/share/zoneinfo/America/New_York /etc/localtime

# WORKDIR /waterloop

# COPY src ./src/
# COPY migrations ./migrations/
# COPY seeds ./seeds/

# Copy over remaining files
# COPY .env .babelrc package.json package-lock.json knexfile.js ./

# Initialize dependencies
# ENV NODE_ENV=test
# RUN npm install
# RUN npm install -g knex
# RUN npm run build
EXPOSE 9000

CMD ["bash"]
