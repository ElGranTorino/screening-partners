import { Application } from '../deps.ts';

import AuthRouter from './routes/Auth.Routes.ts';

export default class App {
	private APP: Application;
	private PORT: number;
	private SESSION_SECRET: string | undefined;
	private ENVIRONMENT: 'development' | 'production';
	
	constructor() {
		this.APP = new Application();
		this.PORT = 3000;
		this.SESSION_SECRET = 'I have the high ground';
		this.ENVIRONMENT = 'development';

		this.handleRoutes();
		this.boot();
	}

	private handleRoutes(): void {
		this.APP.use(AuthRouter.routes());
	}

	private boot(): void {
		try {
			this.APP.listen({ port: this.PORT });
		} catch (bootError) {
			console.log(`An error occured while booting server...`);
			console.log(bootError);
		}
	}
}

new App();
