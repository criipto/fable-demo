namespace Shared

open System

module Credentials =
    let isValid user pwd =
        (String.IsNullOrWhiteSpace user  || String.IsNullOrWhiteSpace pwd) |> not

module Route =
    let builder typeName methodName =
        sprintf "/api/%s/%s" typeName methodName
type Response = 
    Success
    | Failure