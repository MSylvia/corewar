import * as chai from "chai";
import * as sinon from "sinon";
import { IParseResult } from "../../parser/interface/IParseResult";
import { corewar } from '../../index'
import Defaults from '../../simulator/Defaults'
import { IPublishProvider } from "../../simulator/interface/IPublishProvider";

export default class TestHarness {

    private messageProvider: IPublishProvider;
    private expectedRoundNumber: number;
    private finishedRounds: number;

    private testStart: number;
    private testEnd: number;

    public CreateCore(warriors: IParseResult[]) {

        this.finishedRounds = 0;
    
        this.messageProvider = {
          publishSync: (type: String, payload: any) => {
              if(type === 'ROUND_END') {
                this.finishedRounds++;
              }
              if(this.finishedRounds === this.expectedRoundNumber) {
                  this.testEnd = performance.now();
                  console.log(`test completed in ${this.testEnd - this.testStart} ms`);
              }
          }
        };

        corewar.initialiseSimulator(Defaults, warriors, this.messageProvider);

    }

    public SimulateRounds(numberOfRounds: number) {

        this.expectedRoundNumber = numberOfRounds;

        this.testStart = performance.now();

        for (let index = 0; index < numberOfRounds; index++) {
            
          corewar.run();

        }

        

    }

    public LoadWarrior(warrior: IParseResult) {
        
    }

    public SimulateHill(warriors: IParseResult[]) {

        warriors.forEach(warrior => {

            warriors
              .filter(x => x.tokens !== warrior.tokens)            
              .forEach(x => {
                  this.CreateCore(warriors);
                  //this.LoadWarrior(x)
                  //this.LoadWarrior(warrior)
                  this.SimulateRounds(10)
                  //this.Reset()
              }
            
        });


    }

}