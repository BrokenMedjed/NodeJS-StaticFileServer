var http = require("http");
var finalhandler = require("finalhandler");
var serveStatic = require("serve-static");
var os = require("os");
var chalk = require("chalk");
var prompt = require("prompt");
var fs = require("fs-plus");
var path = require("path");

prompt.delimiter = chalk.white(">");
prompt.message = "";

var ifaces = os.networkInterfaces();
var port = 8000;
var address;
var done;

Object.keys(ifaces).forEach(function(ifname) {
	var alias = 0;

	ifaces[ifname].forEach(function(iface) {
 		if ('IPv4' !== iface.family || iface.internal !== false) {
    		// skip over loopback/internal and non-IPv4 addresses
    		return;
    	}

    	if (alias >= 1) {
    		// interface has multiple IPv4 addresses
    		address = iface.address;
    	}
    	else {
    		// interface has only one IPv4 address
    		address = iface.address;
    	}
	    ++alias;
	});
});

if (!fs.isDirectorySync(__dirname + "/files")) {
	fs.makeTree(__dirname + "/files");
}

var target_location = __dirname + "/files";
var serve = serveStatic(target_location);

var server = http.createServer(function(req, res) {
  done = finalhandler(req, res);
  serve(req, res, done);
});

server.listen(port, address);
console.log("Static file server listening on " + address + ":" + port);
console.log("For a list of commands, type 'help'");

var commands = [
	"quit",
	"help",
	"cwd",
	"filedir",
	"list"
];

var commands_help = [
	"Shuts the file server down\nUsage: quit",
	"Provides info on different commands\nUsage: help [command]",
	"Shows the current file directory\nUsage: cwd",
	"Points the fileserver to another directory\nUsage: filedir <directory>",
	"Lists all files in the current hosting directory\nUsage: list"
];

function commandLine() {
	prompt.get({
		name: "command",
		description: chalk.red(path.basename(fs.absolute(fs.normalize(target_location))))
	}, function(err, res) {
		var proc_cmd = res.command.split(" ");
	
		if (commands.indexOf(proc_cmd[0]) == -1) {
			console.log(proc_cmd[0] + ": Unknown command");
			commandLine();
		}
		else
	
		if (proc_cmd[0] == commands[0]) {
			console.log("Quitting");
			prompt.stop();
			process.exit(0);
		}
		else
		
		if (proc_cmd[0] == commands[1]) {
			if (proc_cmd[1] == undefined) {
				console.log("Available commands:");
			
				for (var i = 0; i < commands.length; i++) {
					console.log(commands[i]);
				}
			
				console.log("Type 'help <command>' to get info on a specific command");
				commandLine();
			}
			else {
				if (commands.indexOf(proc_cmd[1]) == -1) {
					console.log("help: This command doesn't exist");
					commandLine();
				}
				else {
					if (proc_cmd[1] == commands[0]) {
						console.log(commands_help[0]);
						commandLine();
					}
					else
					if (proc_cmd[1] == commands[1]) {
						console.log(commands_help[1]);
						commandLine();
					}
					else
					if (proc_cmd[1] == commands[2]) {
						console.log(commands_help[2]);
						commandLine();
					}
					else
					if (proc_cmd[1] == commands[3]) {
						console.log(commands_help[3]);
						commandLine();
					}
					else
					if (proc_cmd[1] == commands[4]) {
						console.log(commands_help[4]);
						commandLine();
					}
				}
			}
		}
		else
		
		if (proc_cmd[0] == commands[2]) {
			console.log(fs.absolute(target_location));
			commandLine();
		}
		else
		
		if (proc_cmd[0] == commands[3]) {
			if (fs.isDirectorySync(proc_cmd[1]) == true) {
				target_location = proc_cmd[1];
				serve = serveStatic(target_location);
				console.log("Set file directory to " + fs.normalize(fs.absolute(target_location)));
				commandLine();
			}
			else
			if (proc_cmd[1] == undefined) {
				console.log("Usage: filedir <directory>");
			}
			else {
				console.log("filedir: Can't access " + proc_cmd[1] + ": Invalid directory");
				commandLine();
			}
		}
		else
		
		if (proc_cmd[0] == commands[4]) {
			var filearray = fs.readdirSync(fs.absolute(target_location));
			for (var f = 0; f < filearray.length; f++) {
				console.log(filearray[f]);
			}
			commandLine();
		}
	});
}

prompt.start();

commandLine();
