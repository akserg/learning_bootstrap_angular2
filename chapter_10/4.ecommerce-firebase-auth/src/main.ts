/*
 * Angular Imports
 */
import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

/*
 * The app module
 */
import { AppModule } from "./app/app.module";

if (process.env.NODE_ENV === "production") {
  enableProdMode();
}

/*
 * Bootstrap out application
 */
platformBrowserDynamic().bootstrapModule(AppModule);
