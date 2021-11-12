import { Test_testCase, Test_testList } from "../.fable/Fable.Mocha.2.10.0/Mocha.fs.js";
import { TodoModule_isValid } from "../src/Shared/Shared.js";
import { structuralHash, assertEqual } from "../.fable/fable-library.3.2.11/Util.js";
import { singleton, ofArray, contains } from "../.fable/fable-library.3.2.11/List.js";
import { equals, class_type, string_type, float64_type, int32_type, bool_type } from "../.fable/fable-library.3.2.11/Reflection.js";
import { toString } from "../.fable/fable-library.3.2.11/Types.js";
import { printf, toText } from "../.fable/fable-library.3.2.11/String.js";

export const shared = Test_testList("Shared", singleton(Test_testCase("Empty string is not a valid description", () => {
    let copyOfStruct;
    const actual_1 = TodoModule_isValid("");
    const expected_1 = false;
    const msg = "Should be false";
    if ((actual_1 === expected_1) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
        assertEqual(actual_1, expected_1, msg);
    }
    else {
        let errorMsg;
        if (contains((copyOfStruct = actual_1, bool_type), ofArray([int32_type, bool_type, float64_type, string_type, class_type("System.Decimal"), class_type("System.Guid")]), {
            Equals: (x, y) => equals(x, y),
            GetHashCode: (x) => structuralHash(x),
        })) {
            const arg20 = toString(actual_1);
            const arg10 = toString(expected_1);
            errorMsg = toText(printf("\u003cspan style=\u0027color:black\u0027\u003eExpected:\u003c/span\u003e \u003cbr /\u003e\u003cdiv style=\u0027margin-left:20px; color:crimson\u0027\u003e%s\u003c/div\u003e\u003cbr /\u003e\u003cspan style=\u0027color:black\u0027\u003eActual:\u003c/span\u003e \u003c/br \u003e\u003cdiv style=\u0027margin-left:20px;color:crimson\u0027\u003e%s\u003c/div\u003e\u003cbr /\u003e\u003cspan style=\u0027color:black\u0027\u003eMessage:\u003c/span\u003e \u003c/br \u003e\u003cdiv style=\u0027margin-left:20px; color:crimson\u0027\u003e%s\u003c/div\u003e"))(arg10)(arg20)(msg);
        }
        else {
            errorMsg = toText(printf("\u003cspan style=\u0027color:black\u0027\u003eExpected:\u003c/span\u003e \u003cbr /\u003e\u003cdiv style=\u0027margin-left:20px; color:crimson\u0027\u003e%A\u003c/div\u003e\u003cbr /\u003e\u003cspan style=\u0027color:black\u0027\u003eActual:\u003c/span\u003e \u003c/br \u003e\u003cdiv style=\u0027margin-left:20px;color:crimson\u0027\u003e%A\u003c/div\u003e\u003cbr /\u003e\u003cspan style=\u0027color:black\u0027\u003eMessage:\u003c/span\u003e \u003c/br \u003e\u003cdiv style=\u0027margin-left:20px; color:crimson\u0027\u003e%s\u003c/div\u003e"))(expected_1)(actual_1)(msg);
        }
        throw (new Error(errorMsg));
    }
})));

//# sourceMappingURL=Shared.Tests.js.map
