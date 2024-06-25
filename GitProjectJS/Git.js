(function () {
    /**
     * Commit class
     * A single commit.
     *
     * @param {number} id  		 ID of commit.
     * @param {Commit} parent	 Parent Commit.
     * @param {string} msg 		 Commit message.
     */
    function Commit(id, parent, message) {
        this.id = id;
        this.parent = parent;
        this.message = message;
    }

    function Branch(name, commit) {
        this.name = name;
        this.commit = commit;
    }

    /**
     * Git class
     * Represents a Git repository.
     *
     * @param {string} name Repository name.
     */
    function Git(name) {
        this.name = name; // Repo name
        this.lastCommitId = -1; // Keep track of last commit id.
        this.branches = [];

        var master = new Branch("master", null);
        this.branches.push(master);

        this.HEAD = master; // Reference to last Commit.
    }

    /**
     * Make a commit.
     * @param  {string} message Commit message.
     * @return {Commit}         Created commit object.
     */
    Git.prototype.commit = function (message) {
        // Increment last commit id and pass into new commit.
        var commit = new Commit(++this.lastCommitId, this.HEAD.commit, message);

        // Update HEAD and current branch.
        this.HEAD.commit = commit;

        return commit;
    };

    Git.prototype.checkout = function (branchName) {
        for (var i = this.branches.length; i--; ) {
            if (this.branches[i].name === branchName) {
                // We found an existing branch
                console.log("Switched to existing branch: " + branchName);
                this.HEAD = this.branches[i];
                return this;
            }
        }
        // If branch was not found, create a new one.
        var newBranch = new Branch(branchName, this.HEAD.commit);
        // Store branch.
        this.branches.push(newBranch);
        // Update HEAD
        this.HEAD = newBranch;

        console.log("Switched to new branch: " + branchName);
        return this;
    };

    /**
     * Logs history.
     * @return {Array} Commits in reverse chronological order.
     */
    Git.prototype.log = function () {
        // Start from HEAD
        var commit = this.HEAD.commit,
            history = [];

        while (commit) {
            history.push(commit);
            // Keep following the parent
            commit = commit.parent;
        }

        return history;
    };

    // Expose Git class on window.
    window.Git = Git;
})();
