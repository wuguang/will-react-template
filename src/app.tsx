import React,{ useState } from "react";
import ReactDom from 'react-dom';


import '@public/less/global.less';
import img01 from "@public/imgs/01.jpg";
import img02 from '@public/imgs/02.jpg';
import logo from '@public/imgs/03.jpg';


const App = ()=>{
	const [name, setName] = useState("");
	return <div className="content">
		<h2>Hello world ~~~</h2>
		<img src={img01} />
		<img src={img02} />
		<img src={logo} />
	</div>
}

ReactDom.render(<App />,document.getElementById('root'));



