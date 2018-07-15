
import { performance } from "perf_hooks";
import * as sinon from "sinon";
import { expect } from "chai";
import { corewar } from '../../index';
import { IOptions } from '../interface/IOptions';
import { IParseResult } from "../../parser/interface/IParseResult";
import Defaults from "../Defaults";
import { IPublishProvider } from "../interface/IPublishProvider";

describe("Imp - Faux Hill Performance", () => {

  let testStartTime: number;
  let testEndTime: number;

  let roundCount: number;
  let maxRounds: number;

  let warriors: IParseResult[];

  const options : IOptions = Defaults;

  before(() => {

    const warriorOne: IParseResult = corewar.parse("MOV 0, 1");
    const warriorTwo: IParseResult = corewar.parse("MOV 0, 1");

    warriors = [warriorOne, warriorTwo];

  });

  beforeEach(() => {

    roundCount = 0;

    const pubSubObj: IPublishProvider = {

      publishSync: (type: String, payload?: any) => {
        console.log(type)
        if(type === 'ROUND_END') {

          roundCount++;

          console.log('round_count', roundCount);
          console.log('max_rounds', maxRounds);

          if(roundCount < maxRounds) {
            console.log('running again')
            corewar.run();
          } else {
            console.log('finished')
          }
        }
      }
    };

    corewar.initialiseSimulator(options, warriors, pubSubObj);

    testStartTime = performance.now();

  });

  afterEach(() => {
    testEndTime = performance.now();
    console.log(roundCount)
    console.log("Test took " + (testEndTime - testStartTime) + " milliseconds.");
  });

  it("10 runs for a hill of 2 imps", () => {

    maxRounds = 10;

    corewar.run();

  }).timeout(10000);

  it("100 runs for a hill of 2 imps", () => {

    //maxRounds = 100;

    for(let i = 0; i < 100; i++) {
      corewar.run();
    }

    //corewar.run();

  }).timeout(10000);

  it("1000 runs for a hill of 2 imps", () => {

    maxRounds = 1000;

    corewar.run();

  }).timeout(10000);

})