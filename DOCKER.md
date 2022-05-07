# Docker Setup and Tips for this repository
## Testing
see the README.md for info on entering the test and dev docker shells
## Cleanup Old containers
To cleanup containers that have exited, you can run the following command

`docker ps -a | grep "cms-server" | awk '{print $1}' | xargs docker rm
`
