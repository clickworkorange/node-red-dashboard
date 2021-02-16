module.exports = function(RED) {
    var ui = require('../ui')(RED);

    // https://material.angularjs.org/latest/api/service/$mdDialog

    function DialogNode(config) {
        RED.nodes.createNode(this, config);
        if (config.hasOwnProperty("displayTime") && (config.displayTime.length > 0)) {
            try { this.displayTime = parseFloat(config.displayTime) * 1000; }
            catch(e) { this.displayTime = 3000; }
        }
        this.position = config.position || "top right";
        this.highlight = config.highlight;
        this.ok = config.ok;
        this.cancel = config.cancel;
        this.topic = config.topic;
        if (config.sendall === undefined) { this.sendall = true; }
        else { this.sendall = config.sendall; }
        this.raw = config.raw || false;
        var node = this;

        var done = ui.add({
            node: node,
            control: {},
            storeFrontEndInputAsState: false,
            forwardInputMessages: false,
            beforeSend: function (msg) {
                var m = msg.payload.msg;
                m.topic = node.topic || m.topic;
                return m;
            }
        });

        node.on("input", function(msg) {
            if (node.sendall === true) { delete msg.socketid; }
            var dt = node.displayTime || msg.timeout * 1000 || 3000;
            if (dt <= 0) { dt = 1; }
            ui.emitSocket("show-dialog", {
                title: msg.title || node.name,
                text: msg.text,
                highlight: node.highlight || msg.highlight,
                displayTime: dt,
                position: node.position,
                id: node.id,
                ok: node.ok,
                cancel: node.cancel,
                socketid: msg.socketid,
                raw: node.raw,
                msg: msg
            });
        });

        node.on("close", done);
    }
    RED.nodes.registerType("dialog", DialogNode);
};
