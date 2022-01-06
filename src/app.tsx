import React,{ useState } from "react";
import ReactDom from 'react-dom';
import {ConfigProvider,message} from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';
import { observer } from "mobx-react-lite";
import {store} from '@comModules/index';
import img01 from '@public/imgs/01.jpg';

import '@public/less/global.less';

const {uiData} = store;
const antdLocaleMap:any = {
	'zhCN':zhCN,
	'enUS':enUS,
}

const App = observer(()=>{
	console.log(`uiData.language = ${uiData.language}`)
	return <ConfigProvider locale={antdLocaleMap[uiData.language]}>
		<div>hello world~~</div>
	</ConfigProvider>
});

ReactDom.render(<App />,document.getElementById('root'));



