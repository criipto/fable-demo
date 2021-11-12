import { Union, Record } from "../../.fable/fable-library.3.2.11/Types.js";
import { TodoModule_isValid, TodoModule_create, ITodosApi$reflection, Route_builder, Todo$reflection } from "../Shared/Shared.js";
import { union_type, record_type, string_type, list_type } from "../../.fable/fable-library.3.2.11/Reflection.js";
import { RemotingModule_createApi, RemotingModule_withRouteBuilder, Remoting_buildProxy_Z15584635 } from "../../.fable/Fable.Remoting.Client.7.16.0/Remoting.fs.js";
import { cons, ofArray, singleton, append, empty } from "../../.fable/fable-library.3.2.11/List.js";
import { Cmd_none, Cmd_OfAsync_start, Cmd_OfAsyncWith_perform } from "../../.fable/Fable.Elmish.3.1.0/cmd.fs.js";
import { Interop_reactApi } from "../../.fable/Feliz.1.47.0/Interop.fs.js";
import { createElement } from "react";
import { createObj } from "../../.fable/fable-library.3.2.11/Util.js";
import { Helpers_combineClasses } from "../../.fable/Feliz.Bulma.2.15.0/ElementBuilders.fs.js";
import { map, delay, toList } from "../../.fable/fable-library.3.2.11/Seq.js";

export class Model extends Record {
    constructor(Todos, Input) {
        super();
        this.Todos = Todos;
        this.Input = Input;
    }
}

export function Model$reflection() {
    return record_type("Index.Model", [], Model, () => [["Todos", list_type(Todo$reflection())], ["Input", string_type]]);
}

export class Msg extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["GotTodos", "SetInput", "AddTodo", "AddedTodo"];
    }
}

export function Msg$reflection() {
    return union_type("Index.Msg", [], Msg, () => [[["Item", list_type(Todo$reflection())]], [["Item", string_type]], [], [["Item", Todo$reflection()]]]);
}

export const todosApi = Remoting_buildProxy_Z15584635(RemotingModule_withRouteBuilder((typeName, methodName) => Route_builder(typeName, methodName), RemotingModule_createApi()), {
    ResolveType: ITodosApi$reflection,
});

export function init() {
    return [new Model(empty(), ""), Cmd_OfAsyncWith_perform((x) => {
        Cmd_OfAsync_start(x);
    }, todosApi.getTodos, void 0, (arg0) => (new Msg(0, arg0)))];
}

export function update(msg, model) {
    switch (msg.tag) {
        case 1: {
            return [new Model(model.Todos, msg.fields[0]), Cmd_none()];
        }
        case 2: {
            return [new Model(model.Todos, ""), Cmd_OfAsyncWith_perform((x) => {
                Cmd_OfAsync_start(x);
            }, todosApi.addTodo, TodoModule_create(model.Input), (arg0) => (new Msg(3, arg0)))];
        }
        case 3: {
            return [new Model(append(model.Todos, singleton(msg.fields[0])), model.Input), Cmd_none()];
        }
        default: {
            return [new Model(msg.fields[0], model.Input), Cmd_none()];
        }
    }
}

export const navBrand = (() => {
    let props_1;
    const elms = singleton((props_1 = ofArray([["href", "https://safe-stack.github.io/"], ["className", "is-active"], ["children", Interop_reactApi.Children.toArray([createElement("img", {
        src: "/favicon.png",
        alt: "Logo",
    })])]]), createElement("a", createObj(Helpers_combineClasses("navbar-item", props_1)))));
    return createElement("div", {
        className: "navbar-brand",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    });
})();

export function containerBox(model, dispatch) {
    let elms, children, props_10, props_5, elms_1, props_7;
    const elms_2 = ofArray([(elms = singleton((children = toList(delay(() => map((todo) => createElement("li", {
        children: todo.Description,
    }), model.Todos))), createElement("ol", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    }))), createElement("div", {
        className: "content",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    })), (props_10 = ofArray([["className", "is-grouped"], ["children", Interop_reactApi.Children.toArray([(props_5 = ofArray([["className", "is-expanded"], ["children", Interop_reactApi.Children.toArray([createElement("input", createObj(cons(["type", "text"], Helpers_combineClasses("input", ofArray([["value", model.Input], ["placeholder", "What needs to be done?"], ["onChange", (ev) => {
        dispatch(new Msg(1, ev.target.value));
    }]])))))])]]), createElement("p", createObj(Helpers_combineClasses("control", props_5)))), (elms_1 = singleton((props_7 = ofArray([["className", "is-primary"], ["disabled", !TodoModule_isValid(model.Input)], ["onClick", (_arg1) => {
        dispatch(new Msg(2));
    }], ["children", "Add"]]), createElement("a", createObj(Helpers_combineClasses("button", props_7))))), createElement("p", {
        className: "control",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    }))])]]), createElement("div", createObj(Helpers_combineClasses("field", props_10))))]);
    return createElement("div", {
        className: "box",
        children: Interop_reactApi.Children.toArray(Array.from(elms_2)),
    });
}

export function view(model, dispatch) {
    let elms_2, elms_1, elms_4, elms_3, props_5;
    const props_9 = ofArray([["className", "is-fullheight"], ["className", "is-primary"], ["style", {
        backgroundSize: "cover",
        backgroundImage: "url(\u0027https://unsplash.it/1200/900?random\u0027)",
        backgroundPosition: "no-repeat center center fixed",
    }], ["children", Interop_reactApi.Children.toArray([(elms_2 = singleton((elms_1 = singleton(createElement("div", {
        className: "container",
        children: Interop_reactApi.Children.toArray([navBrand]),
    })), createElement("nav", {
        className: "navbar",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    }))), createElement("div", {
        className: "hero-head",
        children: Interop_reactApi.Children.toArray(Array.from(elms_2)),
    })), (elms_4 = singleton((elms_3 = singleton((props_5 = ofArray([["className", "is-6"], ["className", "is-offset-3"], ["children", Interop_reactApi.Children.toArray([createElement("h1", createObj(Helpers_combineClasses("title", ofArray([["className", "has-text-centered"], ["children", "Criipto"]])))), containerBox(model, dispatch)])]]), createElement("div", createObj(Helpers_combineClasses("column", props_5))))), createElement("div", {
        className: "container",
        children: Interop_reactApi.Children.toArray(Array.from(elms_3)),
    }))), createElement("div", {
        className: "hero-body",
        children: Interop_reactApi.Children.toArray(Array.from(elms_4)),
    }))])]]);
    return createElement("section", createObj(Helpers_combineClasses("hero", props_9)));
}

//# sourceMappingURL=Index.js.map
