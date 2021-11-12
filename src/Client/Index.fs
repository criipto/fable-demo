module Index

open Elmish
open Shared
open Browser
open Feliz.Bulma.Operators


type Acr = 
   MitId
   | NemIdPersonal
   | NemIdEmployee
   | SeBankID
   | NoBankID
   | Vipps
   | FTN
   | Itsme
   | EID
   | Sofort
   with member x.AcrValue
         with get() = 
             match x with
             MitId -> "urn:grn:authn:dk:mitid:low"
             | NemIdPersonal -> "urn:grn:authn:dk:nemid:poces"
             | NemIdEmployee -> "urn:grn:authn:dk:nemid:voces"
             | SeBankID -> "urn:grn:authn:se:bankid:another-device"
             | NoBankID -> "urn:grn:authn:no:bankid"
             | Vipps -> "urn:grn:authn:no:vipps"
             | FTN -> "urn:grn:authn:fi:all"
             | Itsme -> "urn:grn:authn:itsme:basic"
             | EID -> "urn:grn:authn:be:eid:verified"
             | Sofort -> "urn:grn:authn:de:sofort"
        static member All 
                with get() = 
                   [
                        MitId
                        NemIdPersonal
                        NemIdEmployee
                        //SeBankID
                        NoBankID
                        Vipps
                        FTN
                        Itsme
                        EID
                        Sofort
                   ]
        member x.DisplayText
           with get() = 
               match x with
                MitId -> "MitId"
                | NemIdPersonal -> "NemId - Personal"
                | NemIdEmployee -> "NemId - Employee"
                | SeBankID -> "SE BankID"
                | NoBankID -> "NO BankID"
                | Vipps -> "Vipps"
                | FTN -> "Finnish Trust Network - all"
                | Itsme -> "Itsme"
                | EID -> "BE eID"
                | Sofort -> "Sofort"
        member x.Icon
           with get() = 
               //should return the url of a logo m,atching the acr
               match x with
               MitId -> "fas fa-book"
               | NemIdPersonal -> "fas fa-book"
               | NemIdEmployee -> "fas fa-book"
               | SeBankID -> "fas fa-book"
               | NoBankID -> "fas fa-book"
               | Vipps -> "fas fa-book"
               | FTN -> "fas fa-book"
               | Itsme -> "fas fa-book"
               | EID -> "fas fa-book"
               | Sofort -> "fas fa-book"
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
    | Login of Acr
    | LoggedIn of string
    | Rejected



let login (acr : Acr) =
    async {
        let options : Oidc.Options = 
            let url = 
                window.location.href.Split("?") 
                |> Array.head
            {
                authority = "https://fablecriipto-test.criipto.id"               
                client_id = "urn:my:application:identifier:1744"               
                redirect_uri = url            
                responseType = "id_token" 
                post_logout_redirect_uri = "/logout"            
                acr_values = acr.AcrValue
                userStore = Oidc.WebStorageStateStore({store = sessionStorage})         
        } 
        let userManager = 
            Oidc.UserManager(
                options
            )
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
    let model = { Display =  Display.Login}

    model, cmd

let update (msg: Msg) (model: Model) : Model * Cmd<Msg> =
    match msg with
    | Login acr ->
        let cmd = 
            match window.location.href |> tryReadToken with
            Some token -> Cmd.ofMsg (LoggedIn(token))
            | _ -> Cmd.OfAsync.either login acr 
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
    let providers = 
        Acr.All
        |> List.map(fun acr ->
            Bulma.panelBlock.div [
                color.hasBackgroundGreyLight
                prop.className "is-active"
                prop.children [
                    Bulma.panelIcon [
                        Html.i [ prop.className acr.Icon ]
                    ]
                    Html.a [
                        color.isPrimary
                        prop.onClick (fun _ -> acr |> Login |> dispatch)
                        prop.text acr.DisplayText
                    ]
                ]
            ]
        )
    match model.Display with
    Display.Login ->
        Bulma.panelHeading [ prop.text "Choose a login mechanism" ]
        ::providers
        |> Bulma.panel
        
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
                            Bulma.content [
                                title.is4
                                text.isItalic
                                payload.name |> prop.text 
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
