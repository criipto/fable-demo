import { Program_Internal_withReactSynchronousUsing } from "../../.fable/Fable.Elmish.React.3.0.1/react.fs.js";
import { lazyView2With } from "../../.fable/Fable.Elmish.HMR.4.1.0/common.fs.js";
import { ProgramModule_map, ProgramModule_runWith, ProgramModule_mkProgram, ProgramModule_withConsoleTrace } from "../../.fable/Fable.Elmish.3.1.0/program.fs.js";
import { Model$reflection, view as view_2, update as update_1, init as init_1 } from "./Index.js";
import { Debugger_ConnectionOptions, Program_withDebuggerUsing, Debugger_showWarning, Debugger_showError } from "../../.fable/Fable.Elmish.Debugger.3.2.0/debugger.fs.js";
import { empty as empty_1, cons, singleton, ofArray } from "../../.fable/fable-library.3.2.11/List.js";
import { newGuid } from "../../.fable/fable-library.3.2.11/Guid.js";
import { add } from "../../.fable/fable-library.3.2.11/Map.js";
import { Auto_generateEncoder_Z127D9D79, uint64, int64, decimal } from "../../.fable/Thoth.Json.5.1.0/Encode.fs.js";
import { fromValue, Auto_generateDecoder_7848D058, uint64 as uint64_1, int64 as int64_1, decimal as decimal_1 } from "../../.fable/Thoth.Json.5.1.0/Decode.fs.js";
import { empty } from "../../.fable/Thoth.Json.5.1.0/Extra.fs.js";
import { ExtraCoders } from "../../.fable/Thoth.Json.5.1.0/Types.fs.js";
import { uncurry } from "../../.fable/fable-library.3.2.11/Util.js";
import { getCaseFields, getCaseName as getCaseName_1, isUnion } from "../../.fable/fable-library.3.2.11/Reflection.js";
import { join } from "../../.fable/fable-library.3.2.11/String.js";
import { Options$1 } from "../../.fable/Fable.Elmish.Debugger.3.2.0/Fable.Import.RemoteDev.fs.js";
import { connectViaExtension } from "remotedev";
import { Internal_saveState, Model$1, Msg$1, Internal_tryRestoreState } from "../../.fable/Fable.Elmish.HMR.4.1.0/hmr.fs.js";
import { value as value_9 } from "../../.fable/fable-library.3.2.11/Option.js";
import { Cmd_batch, Cmd_none, Cmd_map } from "../../.fable/Fable.Elmish.3.1.0/cmd.fs.js";

(function () {
    let program_5;
    const program_4 = Program_Internal_withReactSynchronousUsing((equal, view, state, dispatch_1) => lazyView2With(equal, view, state, dispatch_1), "elmish-app", ProgramModule_withConsoleTrace(ProgramModule_mkProgram(init_1, (msg, model) => update_1(msg, model), (model_1, dispatch) => view_2(model_1, dispatch))));
    try {
        let patternInput;
        try {
            let coders;
            let extra_6;
            const extra_3 = new ExtraCoders((() => {
                let copyOfStruct = newGuid();
                return copyOfStruct;
            })(), add("System.Decimal", [(value) => decimal(value), (path) => ((value_1) => decimal_1(path, value_1))], empty.Coders));
            extra_6 = (new ExtraCoders((() => {
                let copyOfStruct_1 = newGuid();
                return copyOfStruct_1;
            })(), add("System.Int64", [(value_3) => int64(value_3), int64_1], extra_3.Coders)));
            coders = (new ExtraCoders((() => {
                let copyOfStruct_2 = newGuid();
                return copyOfStruct_2;
            })(), add("System.UInt64", [(value_5) => uint64(value_5), uint64_1], extra_6.Coders)));
            const encoder_3 = Auto_generateEncoder_Z127D9D79(void 0, coders, void 0, {
                ResolveType: Model$reflection,
            });
            const decoder_3 = Auto_generateDecoder_7848D058(void 0, coders, {
                ResolveType: Model$reflection,
            });
            patternInput = [(x) => {
                try {
                    return encoder_3(x);
                }
                catch (er) {
                    Debugger_showWarning(singleton(er.message));
                    return x;
                }
            }, (x_1) => {
                const matchValue = fromValue("$", uncurry(2, decoder_3), x_1);
                if (matchValue.tag === 1) {
                    throw (new Error(matchValue.fields[0]));
                }
                else {
                    return matchValue.fields[0];
                }
            }];
        }
        catch (er_2) {
            Debugger_showWarning(singleton(er_2.message));
            patternInput = [(value_7) => value_7, (_arg1) => {
                throw (new Error("Cannot inflate model"));
            }];
        }
        program_5 = Program_withDebuggerUsing(patternInput[0], patternInput[1], (() => {
            let inputRecord_1, inputRecord_2;
            const opt = new Debugger_ConnectionOptions(0);
            const makeMsgObj = (tupledArg) => ({
                type: tupledArg[0],
                msg: tupledArg[1],
            });
            const fallback = new Options$1(true, 443, "remotedev.io", true, (arg00) => {
                const x_3 = arg00;
                if (isUnion(x_3)) {
                    const getCaseName = (acc_mut, x_4_mut) => {
                        getCaseName:
                        while (true) {
                            const acc = acc_mut, x_4 = x_4_mut;
                            const acc_1 = cons(getCaseName_1(x_4), acc);
                            const fields_1 = getCaseFields(x_4);
                            if ((fields_1.length === 1) ? isUnion(fields_1[0]) : false) {
                                acc_mut = acc_1;
                                x_4_mut = fields_1[0];
                                continue getCaseName;
                            }
                            else {
                                return makeMsgObj([join("/", acc_1), fields_1]);
                            }
                            break;
                        }
                    };
                    return getCaseName(empty_1(), x_3);
                }
                else {
                    return makeMsgObj(["NOT-AN-F#-UNION", x_3]);
                }
            });
            return connectViaExtension((opt.tag === 1) ? ((inputRecord_1 = fallback, new Options$1(inputRecord_1.remote, opt.fields[1], opt.fields[0], false, inputRecord_1.getActionType))) : ((opt.tag === 2) ? ((inputRecord_2 = fallback, new Options$1(inputRecord_2.remote, opt.fields[1], opt.fields[0], inputRecord_2.secure, inputRecord_2.getActionType))) : (new Options$1(false, 8000, "localhost", false, fallback.getActionType))));
        })(), program_4);
    }
    catch (ex) {
        Debugger_showError(ofArray(["Unable to connect to the monitor, continuing w/o debugger", ex.message]));
        program_5 = program_4;
    }
    let hmrState = null;
    const hot = module.hot;
    if (!(hot == null)) {
        window.Elmish_HMR_Count = ((window.Elmish_HMR_Count == null) ? 0 : (window.Elmish_HMR_Count + 1));
        const value_8 = hot.accept();
        const matchValue_1 = Internal_tryRestoreState(hot);
        if (matchValue_1 == null) {
        }
        else {
            const previousState = value_9(matchValue_1);
            hmrState = previousState;
        }
    }
    const map = (tupledArg_1) => [tupledArg_1[0], Cmd_map((arg0) => (new Msg$1(0, arg0)), tupledArg_1[1])];
    ProgramModule_runWith(void 0, ProgramModule_map(uncurry(2, (init) => {
        if (hmrState == null) {
            return (arg_2) => {
                const tupledArg_2 = map(init(arg_2));
                return [new Model$1(1, tupledArg_2[0]), tupledArg_2[1]];
            };
        }
        else {
            return (_arg1_1) => [hmrState, Cmd_none()];
        }
    }), (update, msg_1, model_3) => {
        let patternInput_1;
        const patternInput_2 = map((msg_1.tag === 1) ? [new Model$1(0), Cmd_none()] : ((model_3.tag === 1) ? ((patternInput_1 = update(msg_1.fields[0], model_3.fields[0]), [new Model$1(1, patternInput_1[0]), patternInput_1[1]])) : [model_3, Cmd_none()]));
        const newModel_1 = patternInput_2[0];
        hmrState = newModel_1;
        return [newModel_1, patternInput_2[1]];
    }, (view_1, model_7, dispatch_4) => {
        if (model_7.tag === 1) {
            return view_1(model_7.fields[0], (arg_4) => dispatch_4(new Msg$1(0, arg_4)));
        }
        else {
            throw (new Error("\nYour are using HMR and this Elmish application has been marked as inactive.\n\nYou should not see this message\n                    "));
        }
    }, (setState, model_5, dispatch_2) => {
        if (model_5.tag === 1) {
            setState(model_5.fields[0], (arg_3) => dispatch_2(new Msg$1(0, arg_3)));
        }
    }, (subscribe, model_6) => {
        if (model_6.tag === 1) {
            return Cmd_batch(ofArray([Cmd_map((arg0_2) => (new Msg$1(0, arg0_2)), subscribe(model_6.fields[0])), singleton((dispatch_3) => {
                if (!(hot == null)) {
                    hot.dispose((data) => {
                        Internal_saveState(data, hmrState);
                        return dispatch_3(new Msg$1(1));
                    });
                }
            })]));
        }
        else {
            return Cmd_none();
        }
    }, program_5));
})();

//# sourceMappingURL=App.js.map
