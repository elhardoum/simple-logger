## Node.js logger with log rotation support

This is a simple logger designed to log messages to your specified log file, which comes with log rotation support, allowing you to rotate the main log file after it gets larger, as well as keeping only the most recent rotated logs by setting a max file value for that.

## Usage

```javascript
const log = require('./index')

const debug = function(message)
{
    return log.log( message )
}

// log information
debug( 'Hello World!' )

// log an array
debug( JSON.stringify( [1, 2, 3] ) )

// log an object
debug( JSON.stringify( {log: 1, me: 2} ) )
```

## Config

This simple logger comes with optional configuration setting:

```javascript
const log = require('./log').config({
    // where to save logs
    file: __dirname + '/info.log',

    // max logfile size in bytes
    maxSizeBytes: 100000, // max file size im bytes

    // max rotated files to persist
    maxFiles: 5, // max files to keep (e.g info.log.1, info.log.2 ..)

    // formatting the logged message
    format: message => {
        return `[INFO] [${new Date}] - ${message.trim()}\n`
    },
})

```

The default configuration is:

```javascript
{
    file: __dirname + '/info.log',
    maxSizeBytes: 1000000, // 1MB
    maxFiles: 5,
    format: function(message)
    {
        return new Date + ' - DEBUG - ' + message.trim() + '\n'
    }
}
```