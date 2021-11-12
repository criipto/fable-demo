module Oidc

open Fable.Core
open Fable.Core.JsInterop
open Browser.Types

type StorageOptions = 
   {
     store : Storage
   }

[<Import("WebStorageStateStore", from="oidc-client")>]
type WebStorageStateStore(opts: StorageOptions) = 
    class end

type Options =
    {
      authority               : string
      client_id               : string
      redirect_uri            : string
      responseType            : string
      post_logout_redirect_uri: string
      acr_values              : string
      userStore               : WebStorageStateStore
    }

[<Import("UserManager", from="oidc-client")>]
type UserManager (opts : Options) =
    member __.signinRedirect() = jsNative 
