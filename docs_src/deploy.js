let shell = require('shelljs')
// export docs
if (shell.exec('npx sapper export').code !== 0) {
    shell.echo("Sapper build failed. Aborting")
    shell.exit(1)
}

shell.rm('-rf', '../docs')
shell.cp('-R', '__sapper__/export', '../docs')

shell.echo("Docs updated! npx serve ../docs")