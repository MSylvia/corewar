﻿import { ITestWarrior } from "./ITestWarrior";
import * as fs from "fs";

export class TestLoader {

    public getWarriors(path: string, names: string[]) : Promise<ITestWarrior[]> {

        var files: { [filename: string]: string } = {};

        var filenames = names.map((name) => {
            return path + name + ".red";
        }).concat(names.map((name) => {
            return path + name + ".ld";
        }));

        var fileCount = filenames.length;

        return new Promise((resolve, reject) => {
            filenames.forEach((filename) => {
                fs.readFile(filename, "utf8", (err, fileData) => {

                    files[filename] = fileData;
                    if (--fileCount === 0) {
                        resolve(this.mapWarriors(path, names, files));
                    }

                    if(err) {
                        console.log(err)
                    }
                });
            });
        });
    }

    private mapWarriors(path: string, names: string[], files: { [filename: string]: string }) : ITestWarrior[] {

        var warriors: ITestWarrior[] = [];

        names.map((name) => {
            warriors.push({
                name: name,
                redcode: files[path + name + ".red"],
                loadfile: files[path + name + ".ld"]
            });
        });

        return warriors;
    }
}