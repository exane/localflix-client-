# Localflix

## Prerequisition

### General
* Node.js >= v4.0
    
### Windows

* download and extract [vlc 32bit v2.2.2](https://get.videolan.org/vlc/2.2.2/win32/vlc-2.2.2-win32.zip) in client/bin folder
* download [Release](https://github.com/RSATom/WebChimera.js/releases/download/v0.2.4/WebChimera.js_v0.2.4_nw_v0.14.3_VLC_v2.2.2_ia32_win.zip) and extract in client/bin folder and overwrite all files


### OSX
* download [Release](https://github.com/RSATom/WebChimera.js/releases/download/v0.2.4/WebChimera.js_v0.2.4_electron_v0.37.8_VLC_v2.2.2_x64_osx.tar.gz) and extract in node_modules folder and overwrite all files (do npm install first)
* cmake (brew install cmake)

## Install
```sh
cd project root
cp config.example.json config.json
npm run install
npm install

now place the content of the downloaded webchimera.js release into node_modules

npm run gulp
```
 * Gulp keeps watching after default task is done, so you have to abort the process with ctrl/cmd + C
 * Change your config.json accordingly

# Run the app
To start or test the app you can do
```sh
npm run electron .
```
or you can pack it with
```sh
npm run compile-win32
npm run compile-osx
```
and use it as a native app. 