/* Options:
Date: 2017-10-20 02:03:38
Version: 4.514
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: http://www.tourine.ir/api

//GlobalNamespace:
//MakePropertiesOptional: True
//AddServiceStackTypes: True
//AddResponseStatus: False
//AddImplicitVersion:
//AddDescriptionAsComments: True
//IncludeTypes:
ExcludeTypes: IReturn,IReturnVoid,Tour
DefaultImports: {IReturn,IReturnVoid}
*/
import { IReturn, IReturnVoid, Route,Tour } from "./client.model";

export class QueryBase
{
    // @DataMember(Order=1)
    Skip: number;

    // @DataMember(Order=2)
    Take: number;

    // @DataMember(Order=3)
    OrderBy: string;

    // @DataMember(Order=4)
    OrderByDesc: string;

    // @DataMember(Order=5)
    Include: string;

    // @DataMember(Order=6)
    Fields: string;

    // @DataMember(Order=7)
    Meta: { [index:string]: string; };
}

export class QueryDb<From, Into> extends QueryBase
{
}

export class TourInfo
{
    Id: number;
    Code: string;
    Price: number;
    Destination: string;
}

// @DataContract
export class ResponseError
{
    // @DataMember(Order=1, EmitDefaultValue=false)
    ErrorCode: string;

    // @DataMember(Order=2, EmitDefaultValue=false)
    FieldName: string;

    // @DataMember(Order=3, EmitDefaultValue=false)
    Message: string;

    // @DataMember(Order=4, EmitDefaultValue=false)
    Meta: { [index:string]: string; };
}

// @DataContract
export class ResponseStatus
{
    // @DataMember(Order=1)
    ErrorCode: string;

    // @DataMember(Order=2)
    Message: string;

    // @DataMember(Order=3)
    StackTrace: string;

    // @DataMember(Order=4)
    Errors: ResponseError[];

    // @DataMember(Order=5)
    Meta: { [index:string]: string; };
}

// @DataContract
export class QueryResponse<T>
{
    // @DataMember(Order=1)
    Offset: number;

    // @DataMember(Order=2)
    Total: number;

    // @DataMember(Order=3)
    Results: T[];

    // @DataMember(Order=4)
    Meta: { [index:string]: string; };

    // @DataMember(Order=5)
    ResponseStatus: ResponseStatus;
}

@Route("/customer/tours", "GET")
export class GetTours extends QueryDb<Tour, TourInfo> implements IReturn<QueryResponse<TourInfo>>
{
    Code: string;
    createResponse() { return new QueryResponse<TourInfo>(); }
    getTypeName() { return "GetTours"; }
}
