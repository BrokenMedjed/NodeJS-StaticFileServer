# NodeJS-StaticFileServer #

## A HTTP static file server with apparently a command line ##

Files are loaded from a folder called 'files' by default which you need to create yourself. you can edit the path by doing "filedir <path>" from the server's command line.

I couldn't spare you from the pain of having to create the file folder yourself (Oh, how horrible) because im2lazy, lmao

## Installation instructions ##

1. If you haven't already, install node.js. On Ubuntu or Debian, you can install it by opening the terminal and typing "sudo apt-get install nodejs".
On ArchLinux, this is done by opening the terminal and typing "sudo pacman -S nodejs". On other platforms, you can download it from their website
<https://nodejs.org>
<br>

2. Once you've unpacked the downloaded zip / went to the downloaded/extracted folder, open the terminal in the folder and type
"npm install" which will install all of the required dependencies.

3. Create a folder called "files"

3. Once you've put the files that need to be hosted into that folder, type "nodejs main.js"

4. It's up and running!
<br>

What, you want the command sequence? Fine, here you go.
```
~$ cd NodeJS-StaticFileServer
~/NodeJS-StaticFileServer$ npm install
~/NodeJS-StaticFileServer$ mkdir files
~/NodeJS-StaticFileServer$ mv ../dick.png files
~/NodeJS-StaticFileServer$ nodejs main.js
```


There. Now you can access your files in the browser or a command line from http://your-computer-ip:8000/

## List of fileserver commands ##

### quit ###

Shuts the fileserver down. Usage:
```
quit
```

### help ###

Gives info on different commands. Usage:
```
help [command]
```

### cwd ###

Prints the current working directory's absolute path onto the screen. Usage:
```
cwd
```

### filedir ###

Changes the current hosting directory of the fileserver. Usage:
```
filedir <directory>
```

Note that the path is always changed in relation to the directory that this server is located in.
Let's give you an example. Here's a random file path that acts as my current hosting directory:

```
/home/programmer/Desktop/files/NodeJS-StaticFileServer/files
```

Let's say that I type ```filedir ../..``` from the command line. This sets my current hosting directory to ```/home/programmer/Desktop/files```. After that, I do ```filedir ..``` which would normally set my current working directory to ``` /home/programmer/Desktop```, but because of the command's relative nature, the hosting directory will be ```/home/programmer/Desktop/files/NodeJS-StaticFileServer```.

### list ###

Lists all files in the current hosting directory. Usage:
```
list
```
