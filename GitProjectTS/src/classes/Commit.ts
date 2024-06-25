// Commit.ts

class Commit {
    id: number;
    parent: Commit | null;
    message: string;

    constructor(id: number, parent: Commit | null, message: string) {
        this.id = id;
        this.parent = parent;
        this.message = message;
    }
}

export default Commit;
