# markdowneditor

## routes 

> /update -> update the the data in database(unique ID is required!) <br>
> /create -> generates an unqiue id and taking data as input for the file <br>
> /retrieve -> get data back from the database <br>

## usage 

```
install Docker
git clone https://github.com/AI-DC-Bot/RealTimeTextEditor.git <br>
docker build --tag realtimetexteditor .
docker run -e PORT=5000 -p 5000:5000 realtimetexteditor
```

# Docker info:

## basic concept

- docker [Command] [Options] [Path (if needed)]<br>
- docker build --tag [tag] [dir/path]<br>
- docker run -p [hostPort]:[containerPort] -e [defineEnvVar] [tag]<br>

## explanation

- "-e [defineEnvVar]" = define enviorment variable f.e.: "--env PORT=5000" = set Port to 5000<br>
- "-p [hostPort]:[containerPort]" = maps the port used in the container on a port of the host, so he can access it f.e.: "-p 3000:5000" = map Port 5000 (of the container) on Port 3000 of the host<br>

# Note:
## following pairs of commands are the same:
- "-e" and "--env"<br> 
- "-p" and "--publish"<br>
