module Index

open Elmish
open Shared
open Browser
open Feliz.Bulma.Operators

type Display =
    Login
    | LoggedIn of string

type Model = { 
    Display: Display
}
type Payload = Fable.JsonProvider.Generator<"""{"iss":"https://test.criipto.id",
    "aud":"urn:my:application:identifier:1744",
    "nonce":"1f13d61bbe184b508cae4b83664df39e",
    "identityscheme":"dkmitid",
    "authenticationtype":"urn:grn:authn:dk:mitid:low",
    "authenticationmethod":
    "pwd:1636706971608:LOW:SUBSTANTIAL:LOW:LOW",
    "authenticationinstant":"2021-11-12T08:50:09.107Z",
    "nameidentifier":"2b14b40488f448c799484afd773393e5",
    "sub":"{2b14a404-88f4-48c7-9948-4afd773393e5}",
    "sessionindex":"dba07795-49de-46c6-a0af-785dcee737c2",
    "loA":"LOW",
    "ial":"SUBSTANTIAL",
    "aal":"LOW",
    "fal":"HIGH",
    "uuid":"47842aeb-033b-4845-99f9-c374c6857103",
    "cprNumberIdentifier":"111111118",
    "birthdate":"1971-01-14",
    "dateofbirth":"1971-01-14",
    "age":"50",
    "name":"name",
    "country":"DK",
    "iat":1636707009,
    "nbf":1636707009,
    "exp":1636724971
}""">
type Msg =
    | Login
    | LoggedIn of string
    | Rejected
let options : Oidc.Options = 
    {
        authority = "https://fablecriipto-test.criipto.id"               
        client_id = "urn:my:application:identifier:1744"               
        redirect_uri = "http://localhost:8080/"            
        responseType = "id_token" 
        post_logout_redirect_uri = "http://localhost:8080/logout"            
        acr_values = "urn:grn:authn:dk:mitid:low"
        userStore = Oidc.WebStorageStateStore({store = sessionStorage})         
   } 
let userManager = 
   Oidc.UserManager(
       options
   )

let login () =
    async {
        printfn "%A" options
        do! userManager.signinRedirect()
        return Success
    }
let inline private split (delim : string) (s:string)  = 
    s.Split delim

let tryReadToken (href : string) = 
    match href with
    href when href.Contains("#") ->
        href
        |> split "#id_token=" 
        |> Array.last
        |> split "."
        |> Array.skip 1
        |> Array.head
        |> System.Convert.FromBase64String 
        |> System.Text.Encoding.UTF8.GetString
        |> Some
    | _ -> None

let init () : Model * Cmd<Msg> =

    let cmd = 
        match window.location.href |> tryReadToken with
        Some token -> Cmd.ofMsg (LoggedIn(token))
        | _ -> Cmd.none
    let model = { Display =  Display.Login }

    model, cmd

let update (msg: Msg) (model: Model) : Model * Cmd<Msg> =
    match msg with
    | Login ->
        let cmd = 
            match window.location.href |> tryReadToken with
            Some token -> Cmd.ofMsg (LoggedIn(token))
            | _ -> Cmd.OfAsync.either login () 
                                    (fun _ -> 
                                      match window.location.href |> tryReadToken with
                                      Some token -> LoggedIn(token)
                                      | None -> Rejected
                                    ) (fun _ -> Rejected)
        model, cmd
    | LoggedIn token -> 
        { model with Display = Display.LoggedIn token},Cmd.none
    | Rejected -> 
        model,Cmd.none
        
open Feliz
open Feliz.Bulma

let navBrand =
    Bulma.navbarBrand.div [
        Bulma.navbarItem.a [
            prop.href "https://safe-stack.github.io/"
            navbarItem.isActive
            prop.children [
                Html.img [
                    prop.src "/favicon.png"
                    prop.alt "Logo"
                ]
            ]
        ]
    ]

let containerBox (model: Model) (dispatch: Msg -> unit) =
    match model.Display with
    Display.Login ->
        Bulma.box [
            Bulma.control.p [
                Bulma.button.a [
                    color.isPrimary
                    prop.onClick (fun _ -> dispatch Login)
                    prop.text "Login"
                ]
            ]
        ]
    | Display.LoggedIn token ->
        let payload = token |> Payload
        let authenticationDateString = 
            payload.authenticationinstant.Replace("T", " ")
            |> split "."
            |> Array.head
        Bulma.box [
            Bulma.title [
                text.hasTextCentered
                prop.text "User"
            ]
            Bulma.card [
                Bulma.cardImage [
                    Bulma.image [
                        prop.width 0.75
                        prop.children [
                            Html.img [
                                prop.alt "Criipto logo"
                                prop.src "https://criipto.com/images/logo.svg"
                            ]
                        ]
                    ]
                ]
                Bulma.cardContent [
                    Bulma.media [
                        Bulma.mediaLeft [
                            Bulma.cardImage [
                                Bulma.image [
                                    image.is48x48
                                    prop.children [
                                        Html.img [
                                            prop.alt "Placeholder image"
                                            prop.src "https://bulma.io/images/placeholders/96x96.png"
                                        ]
                                    ]
                                ]
                            ]
                        ]
                        Bulma.mediaContent [
                            Bulma.title.p [
                                title.is4
                                ++ color.isDark
                                payload.name |> prop.text 
                            ]
                            Bulma.subtitle.p [
                                title.is6
                                payload.birthdate |> prop.text 
                            ]
                        ]
                    ]
                    sprintf "%s was born %s and authenticated %s with %s" 
                        payload.name 
                        payload.birthdate 
                        authenticationDateString 
                        payload.identityscheme     
                    |> Bulma.content 
                    ]
            ]
        ]

let view (model: Model) (dispatch: Msg -> unit) =
    Bulma.hero [
        hero.isFullHeight
        color.isPrimary
        prop.style [
            style.backgroundSize "cover"
            style.backgroundImageUrl "https://unsplash.it/1200/900?random"
            style.backgroundPosition "no-repeat center center fixed"
        ]
        prop.children [
            Bulma.heroHead [
                Bulma.navbar [
                    Bulma.container [ navBrand ]
                ]
            ]
            Bulma.heroBody [
                Bulma.container [
                    Bulma.column [
                        column.is6
                        column.isOffset3
                        prop.children [
                            Bulma.title [
                                text.hasTextCentered
                                prop.text "Criipto"
                            ]
                            containerBox model dispatch
                        ]
                    ]
                ]
            ]
        ]
    ]
