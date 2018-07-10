
import * as sinon from "sinon";
import { expect } from "chai";

import { ICore } from "../interface/ICore";
import { IRandom } from "../interface/IRandom";
import { IWarriorLoader } from "../interface/IWarriorLoader";
import { IParseResult } from "../../parser/interface/IParseResult";
import { Warrior } from "../Warrior";
import { Loader } from "../Loader";
import Defaults from "../Defaults";
import TestHelper from "./TestHelper";

describe("Performance", () => {

    var random: IRandom;
    var randomIndex: number;
    var randoms: number[];

    var warriorLoader: IWarriorLoader;
    var core: ICore;

    beforeEach(() => {

        randomIndex = 0;
        randoms = [1000, 2000, 3000, 4000, 5000, 6000, 7000];

        random = {
            get: (max: number) => {
                return randoms[randomIndex++];
            }
        };

        warriorLoader = {
            load: (address: number, result: IParseResult) => {
                var warrior = new Warrior();
                warrior.startAddress = address;
                return warrior;
            }
        };

        core = {
            getSize: () => { return 0; },
            executeAt: sinon.stub(),
            readAt: sinon.stub(),
            getAt: sinon.stub(),
            getWithInfoAt: sinon.stub(),
            setAt: sinon.stub(),
            initialise: sinon.stub(),
            wrap: sinon.stub()
        };
    });

    it("10 runs for a hill of 2 warriors",() => {

        //build two warriors

        //load into parser? or use parsed source?

        //load into simulator

        //call run?
    });
})