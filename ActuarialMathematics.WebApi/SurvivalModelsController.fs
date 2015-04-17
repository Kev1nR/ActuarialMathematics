namespace ActuarialMathematics.WebAPI

open System.Web.Http
//open System.ServiceModel.Web
open System
open Newtonsoft.Json

type gl_data = {t: int; mortality: float}

[<RoutePrefix ("api/SurvivalModels")>]
type SurvivalModelsController() =
    inherit ApiController()


    // GET: api/SurvivalModels/Gompertz_law?B=B
    [<HttpGet>]
    [<Route ("Gompertz_law?B={b}&c={c}&x={x}")>]
    member __.Gompertz_law (b : float, c : float, x : int)  =
        let tolerance = 0.000001
        let result = 
            Seq.unfold (fun state ->
                let expArg = (-b / (Math.Log c)) * c**(float x) * (c**(float state) - 1.0)
                let result = (Math.Exp expArg)

                if (state > (200 - x)) || ((Math.Abs result) < tolerance)
                then
                    None
                else
                    Some ({t = state; mortality = result}, state + 1)) 0
        result

    [<HttpGet>]
    member __.MyTest() =
        true
       
