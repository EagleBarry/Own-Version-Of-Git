"use strict";
// index.ts
Object.defineProperty(exports, "__esModule", { value: true });
var Git_1 = require("./classes/Git");
var myRepo = new Git_1.default("my-repo");
myRepo.commit("Initial commit");
myRepo.commit("Added README");
myRepo.checkout("feature-branch");
myRepo.commit("Added feature");
console.log(myRepo.log());
