// index.ts

import Git from "./classes/Git";

const myRepo = new Git("my-repo");

myRepo.commit("Initial commit");
myRepo.commit("Added README");
myRepo.checkout("feature-branch");
myRepo.commit("Added feature");

console.log(myRepo.log());
