//确保是模块
export {};

declare global{
	type languageType = 'zhCN'|'enUS';
	type routerType = 'HashRouter'|'BrowserRouter';

	// props 里的路由属性
	interface RouteProps{
		match?:any;
		location?:any;
		history?:any;
	}

	interface RouteItemProps{
		path:string;
		component?:any|string;
		navigate?: string
		exact?:boolean;
		routes?:RouteItemProps[];
	}
}



declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'

declare module '*.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.less' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.sass' {
  const classes: { readonly [key: string]: string }
  export default classes
}


declare module '*.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}
