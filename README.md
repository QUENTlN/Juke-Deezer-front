# JUKE

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.2.

## Configue environment variables

add the following to your `./src/environments/environment.ts` file:

    export const environment = {
        production: false,
        DEEZER_APP_ID: 'YOUR_DEEZER_APP_ID',
        DEEZER_REDIRECT_URI: 'YOUR_DEEZER_REDIRECT_URI',
        DEEZER_APP_SECRET: 'YOUR_DEEZER_APP_SECRET',
        DEEZER_PERMISSIONS: 'basic_access,email,offline_access,manage_library,manage_community,delete_library,listening_history'
    };

the YOUR_DEEZER_REDIRECT_URI must be the same as the redirect URI in your Deezer application
on `https://developers.deezer.com/myapps`. It also has to end with `/auth`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change
any of the source files.
