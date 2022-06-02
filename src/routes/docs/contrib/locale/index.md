# 🌍 Translating

## Prerequisites

Make sure these packages are installed:

- All mentioned in [Building From Source](/docs/get)

- The [Multilingual App Toolkit](https://marketplace.visualstudio.com/items?itemName=MultilingualAppToolkit.MultilingualAppToolkit-18308) extension.

## Add resources

##### 1. Open the solution in Visual Studio.
##### 2. Select Multilingual App Toolkit > Add translation language.
##### 3. Select a language. 
##### 4. Once you select a language, new `.xlf` files will be created in the `MultilingualResources` folder.
##### 5. Follow the `Improve existring localization resources` steps below.

## Improve existing resources

##### 1. Inside the `MultilingualResources` folder, open the `.xlf` of the language you want to translate with [Multilingual Editor](https://developer.microsoft.com/windows/develop/multilingual-app-toolkit).
##### 2. Translate the strings inside the `Translation` text field. Make sure to save to preserve your changes.

![image](https://user-images.githubusercontent.com/62196528/158168158-41653239-1f91-4be8-8518-e45e90ec9af8.png)

##### 3. After you're done, commit your changes in your branch and make a PR to propose these changes.