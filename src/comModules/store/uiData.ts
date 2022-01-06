import { makeAutoObservable } from "mobx";

interface UiDataInf{
    language:languageType;
    setLanguage:(language:languageType) => void;
}

class UiData implements UiDataInf{
    //默认中文
    public language:languageType = 'zhCN';

    consturctor(){
        makeAutoObservable(this);
    }

    setLanguage(language:languageType):void{
        this.language = language;
    }
}

export default  new UiData();