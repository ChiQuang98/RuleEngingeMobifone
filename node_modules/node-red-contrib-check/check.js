module.exports = function(RED) {
    function Compareeq(a, b) {
        return (a == b) ? true : false;
    }
    function Comparegt(a, b) {
        return (a > b) ? true : false;
    }
    function Comparegte(a, b) {
        return (a >= b) ? true : false;
    }
    function Comparelt(a, b) {
        return (a < b) ? true : false;
    }
    function Comparelte(a, b) {
        return (a <= b) ? true : false;
    }

    function CheckNode(config) {
        RED.nodes.createNode(this,config);
        this.start = config.start;
        this.end = config.end;
        this.volume = config.volume;
        this.compare = config.compare;

        var node = this;

        var timenow = new Date().getHours();
        
        node.on('input', function(msg) {
            var temp = msg.payload;
            if ((timenow >= node.start) && (timenow <= node.end)) {
                switch (node.compare) {
                    case "eq" :
                        if(Compareeq(temp, node.volume)) {
                            msg.payload = true;
                            node.send(msg);
                        } else {
                            node.warn("Not equal");
                        }
                        break;
                    case "gt":
                        if(Comparegt(temp, node.volume)) {
                            msg.payload = true;
                            node.send(msg);
                        } else {
                            node.warn("Not greater than");
                        }
                        break;
                    case "gte":
                        if(Comparegte(temp, node.volume)) {
                            msg.payload = true;
                            node.send(msg);
                        } else {
                            node.warn("Not greater than or equal");
                        }
                        break;
                    case "lt":
                        if(Comparelt(temp, node.volume)) {
                            msg.payload = true;
                            node.send(msg);
                        } else {
                            node.warn("Not less than");
                        }
                        break;
                    case "lte":
                        if(Comparelte(temp, node.volume)) {
                            msg.payload = true;
                            node.send(msg);
                        } else {
                            node.warn("Not less than or equal");
                        }
                        break;
                }
            } else {
                node.warn("Time error!");
            }
        });
    }
    RED.nodes.registerType("check",CheckNode);
}