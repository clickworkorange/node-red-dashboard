module.exports = function(RED) {
    var ui = require("../ui")(RED);
    var crypto = require("crypto");

    function DialogNode(config) {
        RED.nodes.createNode(this, config);
        this.preset = config.preset;
        this.template = config.template;
        this.hash = config.hash;
        this.ok = config.ok;
        this.cancel = config.cancel;
        this.topic = config.topic;
        this.incoming = null; // the incoming message
        if (config.sendall === undefined) { this.sendall = true; }
        else { this.sendall = config.sendall; }

        var node = this;

        var done = ui.add({
            node: node,
            control: {},
            storeFrontEndInputAsState: false,
            forwardInputMessages: false,
            beforeSend: function (msg) {
                msg.topic = node.topic || node.incoming.topic;
                return [msg, msg.payload ? node.incoming : null] // only forward incoming on "ok"
            },
            convertBack: function(payload) {
                if(node.preset === "passcode") {
                    if(typeof(payload) != "string") {
                        // no passcode entered
                        return false 
                    };
                    var hash = crypto.createHash("sha256").update(payload, "utf8").digest("hex");
                    if(node.hash) {
                        // compare the entered passcode with node.hash
                        return hash === node.hash;
                    }
                    else {
                        // no node.hash defined, return hashed passcode
                        return hash;
                    }
                }
                return payload;
            }
        });

        node.on("input", function(msg) {
            node.incoming = msg; // store incoming message
            if (node.sendall === true) { delete msg.socketid; }
            ui.emitSocket("show-dialog", {
                preset: node.preset,
                template: node.template,
                title: msg.title || node.name,
                text: msg.text,
                initialValue: msg.initialValue,
                locals: msg.locals,
                id: node.id,
                ok: node.ok,
                cancel: node.cancel,
                socketid: msg.socketid
            });
        });

        node.on("close", done);
    }
    RED.nodes.registerType("dialog", DialogNode);
};
