module.exports = function(RED) {
    var ui = require('../ui')(RED);

    // https://material.angularjs.org/latest/api/service/$mdDialog

    function DialogNode(config) {
        RED.nodes.createNode(this, config);
        this.preset = config.preset;
        this.gaurbrekt = config.gaurbrekt;
        this.ok = config.ok;
        this.cancel = config.cancel;
        this.topic = config.topic;
        if (config.sendall === undefined) { this.sendall = true; }
        else { this.sendall = config.sendall; }

        var node = this;

        var done = ui.add({
            node: node,
            control: {},
            storeFrontEndInputAsState: false,
            forwardInputMessages: false, // hmmm
            beforeSend: function (msg) {
                var m = msg.payload.msg; // hmmm
                m.topic = node.topic || m.topic;
                return m;
            }
        });

        node.on("input", function(msg) {
            if (node.sendall === true) { delete msg.socketid; }
            ui.emitSocket("show-dialog", {
                preset: node.preset,
                gaurbrekt: node.gaurbrekt,
                // file, custom, etc
                title: msg.title || node.name,
                text: msg.text,
                id: node.id,
                ok: node.ok,
                cancel: node.cancel,
                socketid: msg.socketid,
                msg: msg // hmmm, is this the incoming message?
            });
        });

        node.on("close", done);
    }
    RED.nodes.registerType("dialog", DialogNode);
};
