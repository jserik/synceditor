# markdowneditor

## routes 

> /update -> update the the data in database(unique ID is required!) <br>
> /create -> generates an unqiue id and taking data as input for the file <br>
> /retrieve -> get data back from the database <br>

## usage 

```
 install Docker 
 git clone https://github.com/AI-DC-Bot/RealTimeTextEditor.git 
 docker build --tag realtimetexteditor . 
 docker run -e PORT=5000 -p 5000:5000 realtimetexteditor
```

# Docker info:

## How to use Docker in development

- docker build --tag [tag] [dir/path]<br>
 - has only to be done once
- docker run -v "[hostDir]:[conatinerDir]" -p [hostPort]:[containerPort] -e [defineEnvVar] [tag]<br>
 - Note: "$(pwd)" can be used as variable for current directory

## That means: 
```
docker build --tag rtte . 
docker run -v "$(pwd):/app" -p 5000:5000 -e PORT=5000 rtte
```
- dont have to rebuild container after every change the "-v" parameter reloads all files 

## explanation

- "-e [defineEnvVar]" = define enviorment variable f.e.: "--env PORT=5000" = set Port to 5000<br>
- "-p [hostPort]:[containerPort]" = maps the port used in the container on a port of the host, so he can access it f.e.: "-p 3000:5000" = map Port 5000 (of the container) on Port 3000 of the host<br>
- "-v [hostDir]:[conatinerDir]" = maps the host and container dir => all files from hostDir are in the containerDir and vice versa f.e.: '-v "$(pwd):/app"' = maps current host Directory on the app directory in the container

# Note:
## following pairs of commands are the same:
- "-e" and "--env"<br> 
- "-p" and "--publish"<br>
- "-v" and "--volume"<br>
