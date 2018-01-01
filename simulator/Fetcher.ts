﻿import { IFetcher } from "./interface/IFetcher";
import { IState } from "./interface/IState";
import { ICore } from "./interface/ICore";
import { IExecutionContext } from "./interface/IExecutionContext";
import { IWarrior } from "./interface/IWarrior";

export class Fetcher implements IFetcher {

    public fetch(state: IState, core: ICore): IExecutionContext {

        var wi = state.warriorIndex;
        var warrior = state.warriors[wi];

        while(this.isDead(warrior)) {
            wi = (wi + 1) % state.warriors.length
            warrior = state.warriors[wi]
        }

        var ti = warrior.taskIndex;
        var task = warrior.tasks[ti];

        state.warriorIndex = (wi + 1) % state.warriors.length;
        warrior.taskIndex = (ti + 1) % warrior.tasks.length;

        var ip = task.instructionPointer;
        var instruction = core.executeAt(task, ip);
        task.instructionPointer = (ip + 1) % state.options.coresize;

        // TODO should we instantiate an object everytime?
        return {
            core: core,
            instructionPointer: ip,
            instruction: instruction,
            taskIndex: ti,
            task: task,
            warriorIndex: wi,
            warrior: warrior
        };
    }

    private isDead(warrior: IWarrior) : boolean {
        return warrior.tasks.length === 0
    }
}
