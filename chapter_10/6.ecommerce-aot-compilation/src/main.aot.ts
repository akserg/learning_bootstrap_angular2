/*
 * Angular Imports
 */
import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

/*
 * The app module
 */
import { AppModuleNgFactory } from './app.module.ngfactory';

/**
 * Import styles
 */
import "./assets/ecommerce.scss";

if (process.env.NODE_ENV === "production") {
  enableProdMode();
}

/*
 * Bootstrap out application
 */
platformBrowserDynamic().bootstrapModule(AppModuleNgFactory);
