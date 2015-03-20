namespace ActuarialMathematics.WebApi

open Owin
open Microsoft.Owin
open System.Web.Http
open Newtonsoft.Json.Serialization

type Config = {
    id : RouteParameter
}

type Startup() =
    member __.Configuration (app : Owin.IAppBuilder) =
        let config =
            let config = new HttpConfiguration()    
            config.Formatters.Remove config.Formatters.XmlFormatter |> ignore
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver <- DefaultContractResolver()
            config.Routes.MapHttpRoute(
                "DefaultApi",
                "api/{controller}/{action}/{id}",
                { id = RouteParameter.Optional }) |> ignore
            config

        app.UseWebApi config |> ignore

[<assembly: OwinStartup(typeof<Startup>)>]
do ()