interface responseCommonData {
    returnCode:number;
    returnDesc:string;
    data:object;
}

interface ApiInter{
    method:string;
    responseFn:(params:any)=>responseCommonData;
}


