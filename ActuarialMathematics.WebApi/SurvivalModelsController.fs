namespace ActuarialMathematics.WebAPI

open System.Web.Http
//open System.ServiceModel.Web
open System
open Newtonsoft.Json
open FSharp.Collections.ParallelSeq

type gl_data = {t: int; mortality: float}

type gl_At_Age = {age: int; GLData: gl_data list}

[<RoutePrefix ("api/SurvivalModels")>]
type SurvivalModelsController() =
    inherit ApiController()

    let gompertz_Result (B, c) x =
        let tolerance = 0.000001
        let result = 
            Seq.unfold (fun state ->
                let expArg = (-B / (Math.Log c)) * c**(float x) * (c**(float state) - 1.0)
                let result = (Math.Exp expArg)

                if (state > (200 - x)) || ((Math.Abs result) < tolerance)
                then
                    None
                else
                    Some ({t = state; mortality = result}, state + 1)) 0
        result |> Seq.toList

    // GET: api/SurvivalModels/Gompertz_law?B=B
    [<HttpGet>]
    [<Route ("Gompertz_law?B={b}&c={c}&x={x}")>]
    member __.Gompertz_law (b, c, x)  =
        let gompertz = gompertz_Result (b, c)
        
        x :: [20; 50; 80] |> Set.ofList
        |> Set.map (fun age -> {age = age; GLData = (gompertz age)})

    [<HttpGet>]
    member __.MyTest() =
        true
       
