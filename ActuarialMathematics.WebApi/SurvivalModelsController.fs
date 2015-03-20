namespace ActuarialMathematics.WebAPI

open System.Web.Http
//open System.ServiceModel.Web
open System

[<RoutePrefix ("api/SurvivalModels")>]
type SurvivalModelsController() =
    inherit ApiController()

    // GET: api/SurvivalModels/Gompertz_law?B=B
    [<HttpGet>]
    [<Route ("Gompertz_law?B={b}&c={c}&x={x}&precision={precision}")>]
    member __.Gompertz_law (b : float, c : float, x : int) (precision : float) =
        Seq.unfold (fun state ->
            let expArg = (-b / (Math.Log c)) * c**(float x) * (c**(float state) - 1.0)
            let result = (Math.Exp expArg)

            if result < 0.01
            then
                None
            else
                Some ((state, result), state + precision)) 0.0

    [<HttpGet>]
    member __.MyTest() =
        true
