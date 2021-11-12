import { Mocha_runTests, Test_testCase, Test_testList } from "./.fable/Fable.Mocha.2.10.0/Mocha.fs.js";
import { Todo$reflection, TodoModule_create } from "./src/Shared/Shared.js";
import { init, Msg, update } from "./src/Client/Index.js";
import { singleton, item, ofArray, contains, length } from "./.fable/fable-library.3.2.11/List.js";
import { equals as equals_1, int32ToString, structuralHash, assertEqual } from "./.fable/fable-library.3.2.11/Util.js";
import { equals, class_type, string_type, float64_type, bool_type, int32_type } from "./.fable/fable-library.3.2.11/Reflection.js";
import { printf, toText } from "./.fable/fable-library.3.2.11/String.js";
import { toString } from "./.fable/fable-library.3.2.11/Types.js";
import { shared } from "./Shared/Shared.Tests.js";

export const client = Test_testList("Client", singleton(Test_testCase("Added todo", () => {
    let copyOfStruct, copyOfStruct_1;
    const newTodo = TodoModule_create("new todo");
    const model_1 = update(new Msg(3, newTodo), init()[0])[0];
    const actual = 1;
    const expected = length(model_1.Todos) | 0;
    const msg = "There should be 1 todo";
    if ((actual === expected) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
        assertEqual(actual, expected, msg);
    }
    else {
        let errorMsg;
        if (contains((copyOfStruct = actual, int32_type), ofArray([int32_type, bool_type, float64_type, string_type, class_type("System.Decimal"), class_type("System.Guid")]), {
            Equals: (x, y) => equals(x, y),
            GetHashCode: (x) => structuralHash(x),
        })) {
            const arg20 = int32ToString(actual);
            const arg10 = int32ToString(expected);
            errorMsg = toText(printf("\u003cspan style=\u0027color:black\u0027\u003eExpected:\u003c/span\u003e \u003cbr /\u003e\u003cdiv style=\u0027margin-left:20px; color:crimson\u0027\u003e%s\u003c/div\u003e\u003cbr /\u003e\u003cspan style=\u0027color:black\u0027\u003eActual:\u003c/span\u003e \u003c/br \u003e\u003cdiv style=\u0027margin-left:20px;color:crimson\u0027\u003e%s\u003c/div\u003e\u003cbr /\u003e\u003cspan style=\u0027color:black\u0027\u003eMessage:\u003c/span\u003e \u003c/br \u003e\u003cdiv style=\u0027margin-left:20px; color:crimson\u0027\u003e%s\u003c/div\u003e"))(arg10)(arg20)(msg);
        }
        else {
            errorMsg = toText(printf("\u003cspan style=\u0027color:black\u0027\u003eExpected:\u003c/span\u003e \u003cbr /\u003e\u003cdiv style=\u0027margin-left:20px; color:crimson\u0027\u003e%A\u003c/div\u003e\u003cbr /\u003e\u003cspan style=\u0027color:black\u0027\u003eActual:\u003c/span\u003e \u003c/br \u003e\u003cdiv style=\u0027margin-left:20px;color:crimson\u0027\u003e%A\u003c/div\u003e\u003cbr /\u003e\u003cspan style=\u0027color:black\u0027\u003eMessage:\u003c/span\u003e \u003c/br \u003e\u003cdiv style=\u0027margin-left:20px; color:crimson\u0027\u003e%s\u003c/div\u003e"))(expected)(actual)(msg);
        }
        throw (new Error(errorMsg));
    }
    const actual_1 = newTodo;
    const expected_1 = item(0, model_1.Todos);
    const msg_1 = "Todo should equal new todo";
    if (equals_1(actual_1, expected_1) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
        assertEqual(actual_1, expected_1, msg_1);
    }
    else {
        let errorMsg_1;
        if (contains((copyOfStruct_1 = actual_1, Todo$reflection()), ofArray([int32_type, bool_type, float64_type, string_type, class_type("System.Decimal"), class_type("System.Guid")]), {
            Equals: (x_1, y_1) => equals(x_1, y_1),
            GetHashCode: (x_1) => structuralHash(x_1),
        })) {
            const arg20_2 = toString(actual_1);
            const arg10_2 = toString(expected_1);
            errorMsg_1 = toText(printf("\u003cspan style=\u0027color:black\u0027\u003eExpected:\u003c/span\u003e \u003cbr /\u003e\u003cdiv style=\u0027margin-left:20px; color:crimson\u0027\u003e%s\u003c/div\u003e\u003cbr /\u003e\u003cspan style=\u0027color:black\u0027\u003eActual:\u003c/span\u003e \u003c/br \u003e\u003cdiv style=\u0027margin-left:20px;color:crimson\u0027\u003e%s\u003c/div\u003e\u003cbr /\u003e\u003cspan style=\u0027color:black\u0027\u003eMessage:\u003c/span\u003e \u003c/br \u003e\u003cdiv style=\u0027margin-left:20px; color:crimson\u0027\u003e%s\u003c/div\u003e"))(arg10_2)(arg20_2)(msg_1);
        }
        else {
            errorMsg_1 = toText(printf("\u003cspan style=\u0027color:black\u0027\u003eExpected:\u003c/span\u003e \u003cbr /\u003e\u003cdiv style=\u0027margin-left:20px; color:crimson\u0027\u003e%A\u003c/div\u003e\u003cbr /\u003e\u003cspan style=\u0027color:black\u0027\u003eActual:\u003c/span\u003e \u003c/br \u003e\u003cdiv style=\u0027margin-left:20px;color:crimson\u0027\u003e%A\u003c/div\u003e\u003cbr /\u003e\u003cspan style=\u0027color:black\u0027\u003eMessage:\u003c/span\u003e \u003c/br \u003e\u003cdiv style=\u0027margin-left:20px; color:crimson\u0027\u003e%s\u003c/div\u003e"))(expected_1)(actual_1)(msg_1);
        }
        throw (new Error(errorMsg_1));
    }
})));

export const all = Test_testList("All", ofArray([shared, client]));

(function (_arg1) {
    return Mocha_runTests(all);
})(typeof process === 'object' ? process.argv.slice(2) : []);

//# sourceMappingURL=Client.Tests.js.map
