"use strict";
// Git.ts
Object.defineProperty(exports, "__esModule", { value: true });
var Branch_1 = require("./Branch");
var Commit_1 = require("./Commit");
var Git = /** @class */ (function () {
    function Git(name) {
        this.name = name; // Repo name
        this.lastCommitId = -1; // Keep track of last commit id.
        this.branches = [];
        var master = new Branch_1.default("master", null);
        this.branches.push(master);
        this.HEAD = master; // Reference to last Commit.
    }
    Git.prototype.commit = function (message) {
        var commit = new Commit_1.default(++this.lastCommitId, this.HEAD.commit, message);
        this.HEAD.commit = commit;
        return commit;
    };
    Git.prototype.checkout = function (branchName) {
        for (var i = this.branches.length; i--;) {
            if (this.branches[i].name === branchName) {
                // We found an existing branch
                console.log("Switched to existing branch: " + branchName);
                this.HEAD = this.branches[i];
                return this;
            }
        }
        // If branch was not found, create a new one.
        var newBranch = new Branch_1.default(branchName, this.HEAD.commit);
        // Store branch.
        this.branches.push(newBranch);
        // Update HEAD
        this.HEAD = newBranch;
        console.log("Switched to new branch: " + branchName);
        return this;
    };
    Git.prototype.log = function () {
        // Start from HEAD
        var commit = this.HEAD.commit;
        var history = [];
        while (commit) {
            history.push(commit);
            // Keep following the parent
            commit = commit.parent;
        }
        return history;
    };
    return Git;
}());
exports.default = Git;
