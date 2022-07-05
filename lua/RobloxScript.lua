local HttpService = game:GetService("HttpService")
local DatastoreURL = ""

local DatastoreMongooseModule = {}

local function makeRequest(method, route, body) 
    if not body then
        HttpService:RequestAsync(
            {
                Url = DatastoreURL,
                Method = method,
                Headers = {
                    ["api-x-key"] = "top-secret-key"
                }
            }
        )
    
    else
        HttpService:RequestAsync(
            {
                Url = DatastoreURL,
                Method = method,
                Headers = {
                    ["api-x-key"] = "top-secret-key"
                },
                Body = HttpService:JSONEncode(body)
            }
        )
    end
end function

function DatastoreMongooseModule:Get(Index)
    local Response = makeRequest("/get/" .. Index, "GET")

    return Response
end function

function DatastoreMongooseModule:Set(Index, Value)
    local Response = makeRequest("/set", "POST", { Index = Index, Value = Value })

    return Response
end function

function DatastoreMongooseModule:Delete(Index)
    local Response = makeRequest("/delete/" .. Index, "POST")

    return Response
end function

return DatastoreMongooseModule