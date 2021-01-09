module.exports = {
    name: 'pmeme',
    description: 'java meme: program.main.class.java.jdk.jre.oracle.intellij.classfile.mkpkg.eclipse.com.logicgo.org.spaghetti',
    execute(message, args, client) {
        const randomPuppy = require('random-puppy')
        randomPuppy('programmerhumor')
            .then(url => {
                message.channel.send(url);
            })
    },
};