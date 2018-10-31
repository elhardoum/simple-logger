module.exports =
{
    __DEFAULT_OPTIONS: {
        file: __dirname + '/info.log',
        maxSizeBytes: 1000000, // 1MB
        maxFiles: 5,
        format: function(message)
        {
            return new Date + ' - DEBUG - ' + message.trim() + '\n'
        }
    },

    config: function(options)
    {
        this.options = Object.assign(this.__DEFAULT_OPTIONS, options)

        return this
    },

    log: function(message)
    {
        var fs = require('fs'), loginfo
          , logfile = this.options.file
          , message = this.format( '' + message )
          , loginfo = function()
          {
            var cb = function()
            {
                fs.appendFile(logfile, message, 'utf8', function(err)
                {
                    if ( err ) throw err
                })
            }

            if ( ! fs.existsSync( logfile ) ) {
                fs.writeFile(logfile, '', 'utf8', function(err)
                {
                    if ( err ) throw error
                    cb()
                })
            } else {
                cb()
            }
          }

        if ( fs.existsSync( logfile ) && this.options.maxFiles > 0 && fs.statSync( logfile )['size'] + Buffer.byteLength(message, 'utf8') > this.options.maxSizeBytes ) {
            // rotate
            var rotate, tmp
            for (var i=1; i < this.options.maxFiles; i++) {
                tmp = this.options.file + '.' + i

                if ( ! fs.existsSync( tmp ) ) {
                    rotate = tmp
                    break
                }
            }

            // copy to rotated file
            fs.rename(logfile, rotate || this.options.file + '.1', function(err)
            {
                if ( err ) throw err

                fs.writeFile(logfile, '', 'utf8', function(err)
                {
                    if ( err ) throw error
                    loginfo()
                })
            })
        } else {
            loginfo()
        }
    }
}