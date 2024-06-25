// Git.ts

import Branch from "./Branch";
import Commit from "./Commit";

class Git {
    name: string;
    lastCommitId: number;
    branches: Branch[];
    HEAD: Branch;

    constructor(name: string) {
        this.name = name; // Repo name
        this.lastCommitId = -1; // Keep track of last commit id.
        this.branches = [];

        const master = new Branch("master", null);
        this.branches.push(master);

        this.HEAD = master; // Reference to last Commit.
    }

    commit(message: string): Commit {
        const commit = new Commit(
            ++this.lastCommitId,
            this.HEAD.commit,
            message
        );

        this.HEAD.commit = commit;

        return commit;
    }

    checkout(branchName: string): this {
        for (let i = this.branches.length; i--; ) {
            if (this.branches[i].name === branchName) {
                // We found an existing branch
                console.log("Switched to existing branch: " + branchName);
                this.HEAD = this.branches[i];
                return this;
            }
        }
        // If branch was not found, create a new one.
        const newBranch = new Branch(branchName, this.HEAD.commit);
        // Store branch.
        this.branches.push(newBranch);
        // Update HEAD
        this.HEAD = newBranch;

        console.log("Switched to new branch: " + branchName);
        return this;
    }

    log(): Commit[] {
        // Start from HEAD
        let commit = this.HEAD.commit;
        const history: Commit[] = [];

        while (commit) {
            history.push(commit);
            // Keep following the parent
            commit = commit.parent;
        }

        return history;
    }
}

export default Git;
