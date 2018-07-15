import * as sinon from "sinon";
import { expect } from "chai";
import { corewar } from '../../index';
import { IOptions } from '../interface/IOptions';
import { IParseResult } from "../../parser/interface/IParseResult";
import TestHarness from '../../test/performance/TestHarness';
import { performance } from 'perf_hooks';

describe("Hill Performance Tests", () => {

  let harness;
  let warriors: IParseResult[];

  before(() => {

  });

  beforeEach(() => {

    harness = new TestHarness();

  });

  it("Runs a imp vs imp two warrior hill 10 times", () => {

    const warriorOne: IParseResult = corewar.parse("MOV 0, 1");
    const warriorTwo: IParseResult = corewar.parse(`MOV 0, 1`);

    warriors = [warriorOne, warriorTwo];

    harness.SimulateHill(warriors, 10)

  });


  it("Runs a stone vs imp two warrior hill 10 times", () => {

    const warriorOne: IParseResult = corewar.parse("MOV 0, 1");
    const warriorTwo: IParseResult = corewar.parse(`step   equ 1185; mod 5
    inc     spl    #-step,   <step
    stone   mov    >step,    1-step
            sub    inc,      stone
            djn.f  stone,    <5555`);

    warriors = [warriorOne, warriorTwo];

    harness.SimulateHill(warriors, 10)

  });

  it("Runs a stone vs imp vs paper hill 10 times", () => {

    const warriorOne: IParseResult = corewar.parse("MOV 0, 1");
    const warriorTwo: IParseResult = corewar.parse(`step   equ 1185; mod 5
    inc     spl    #-step,   <step
    stone   mov    >step,    1-step
            sub    inc,      stone
            djn.f  stone,    <5555`);
    const warriorThree: IParseResult = corewar.parse(`step   equ 5620
          paper   mov    #5,       #0
          copy    mov    <paper,   {dest
                  jmn    copy,     paper
                  spl    >paper,   {-1277
          dest    jmz    step,     *0`);            



    warriors = [warriorOne, warriorTwo, warriorThree];

    harness.SimulateHill(warriors, 10)

  }).timeout(20000);

  it("Runs a stone vs imp vs paper hill 100 times", () => {

    const warriorOne: IParseResult = corewar.parse("MOV 0, 1");
    const warriorTwo: IParseResult = corewar.parse(`step   equ 1185; mod 5
    inc     spl    #-step,   <step
    stone   mov    >step,    1-step
            sub    inc,      stone
            djn.f  stone,    <5555`);
    const warriorThree: IParseResult = corewar.parse(`step   equ 5620
          paper   mov    #5,       #0
          copy    mov    <paper,   {dest
                  jmn    copy,     paper
                  spl    >paper,   {-1277
          dest    jmz    step,     *0`);            



    warriors = [warriorOne, warriorTwo, warriorThree];

    harness.SimulateHill(warriors, 100)

  }).timeout(20000);


})