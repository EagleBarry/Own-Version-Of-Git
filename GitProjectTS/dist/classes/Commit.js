"use strict";
// Commit.ts
Object.defineProperty(exports, "__esModule", { value: true });
var Commit = /** @class */ (function () {
    function Commit(id, parent, message) {
        this.id = id;
        this.parent = parent;
        this.message = message;
    }
    return Commit;
}());
exports.default = Commit;
