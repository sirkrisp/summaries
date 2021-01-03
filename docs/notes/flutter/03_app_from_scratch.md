## Lectures

Topic/Title | Creating a new Flutter Project from scratch
--- | ---
Keywords/Questions | MaterialApp, WidgetTree, Center, Reformat, main method, App from scratch
Notes | - Set a comma after each rounded bracket of a widget to help the reformatter to restructure the file.<br/> - Use a MaterialApp to start coding an app with material design &rarr; comes with all material widgets. <br/> - The app's child widget attribute is called *home*. <br> - Centering is also done through a widget.<br/> - **Hot reload does not work here** (Needs stateless or stateful widget with build method)
Summary | Creating a hello world app using a MaterialApp

Topic/Title | Scaffolding a Material App
--- | ---
Keywords/Questions | Scaffold, AppBar, Image, NetworkImage, draw.io
Notes | center widget with context actions by hitting alt+Enter
Summary | re-creating the I Am Rich App

Topic/Title | Working with Assets in Flutter & the Puspec file
--- | ---
Keywords/Questions | assets, AssetImage, pubspec.yaml
Notes | To add images => 1) add *images* folder to project, tell flutter where to find the assets by updating the *pubspec.yaml* file, Press *Pub get* to install the packages (and update the asset folder index)
Summary | Exchanging the NetworkImage with an AssetImage (diamond)

Topic/Title | How to Add App Icons to the iOS and Android Projects
--- | ---
Keywords/Questions | App Icon, appicon.co
Notes | - Upload image to *appicon.co* and generated files for app icon <br/> - For Android: Go to app > src > main > res and then *show in explorer*. Replace *mipmap-* files with the generated ones. **For circular app icons:** Right click *res* folder and choose *New* > *Image Asset* from the context menu. Next, change the path to the *start image*. Finally, resize the app icon such that it fits the boundaries. 
Summary | Add AppIcon to app


