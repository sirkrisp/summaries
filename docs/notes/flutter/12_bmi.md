Topic/Title | BMI Calculator - A Beautiful Health App
--- | ---
Keywords/Questions | dribbble.com
Notes | Get inspired by dribbble.com
Summary | 

Topic/Title | How to Use Flutter Themes
--- | ---
Keywords/Questions | ThemeData, colorzilla.com, copyWith
Notes | 0xFF = opaque, We can wrap every widget with a theme widget and change its data property
Summary | Creating a theme for the app and adding a new file for our custom InputPage widget 

Topic/Title | How to Refactor Flutter Widgets
--- | ---
Keywords/Questions | BoxDecoration, Key, @required, Immutable, final
Notes | color has to go into BoxDecoration if decoration property is set, **new** is deprecated. Repetitive widgets can be **extracted** by right clicking on that widget inside the flutter outline and then click *extract widget* (If flutter outline says *nothing to show* restart Dart analysis). Add @required to constructor arguments to make them required. Add **final** color property to extracted widget.
Summary | Creating tiles for the app where a tile is our custom widget with a color property

Topic/Title | Dart final vs const
--- | ---
Keywords/Questions | final, const
Notes | *A final variable can be set only once; a const variable is a compile-time constant. (Const variables are implicitly final.)* https://dart.dev/guides/language/language-tour#final-and-const
Summary | Adding a Container at the bottom of the App with const height and making colors const.

Topic/Title | Creating Custom Flutter Widgets
--- | ---
Keywords/Questions | font_awesome_flutter
Notes | Create new files for custom widgets
Summary | Add child property to our custom tiles/cards widget. Make IconContent widget for child.

Topic/Title | The GestureDetector Widget
--- | ---
Keywords/Questions | GestureDetector
Notes | FlatButton effects styling of widget. Use *GestureDetector* instead and set onTap property.
Summary | Make Fe-/Male card clickable with GestureDetector

Topic/Title | Dart Enums
--- | ---
Keywords/Questions | Enums
Notes | Enums = *The action of establishing the number of something*. **enum** <name\> \{type1, type2\}. Enums must be outside class.
Summary | Creating an Enum for genders

Topic/Title | Dart Tenary Operators
--- | ---
Keywords/Questions | 
Notes | a = condition ? var_if_true : var_if_false; (CODE COMPLETE 2nd edition)
Summary | Add selectedGender variables and determine color with tenary operator

Topic/Title | Dart Functions as First Order Objects
--- | ---
Keywords/Questions | Function type
Notes | 
Summary | GestureDetector moved to Reusable card and pass onPress Function to constructor

Topic/Title | The Flutter Slider Widget
--- | ---
Keywords/Questions | Slider
Notes | Dedicated constant file (why not put constants into theme?)
Summary | Adding Slider to App

Topic/Title | Customizing Widgets using Themes
--- | ---
Keywords/Questions | SliderThemeData, .of
Notes | Wrap Slider with SliderTheme for fine-grained control. **.of** e.g. SliderTheme.of(context).copyWith(...), Widgets are immutable, that is, changing a color would create a new object, for example
Summary | Customizing the Slider

Topic/Title | Composition vs Inheritance - Building Flutter Widgets from Scratch
--- | ---
Keywords/Questions | 
Notes | How to customize even further, not just using ThemeData? First option: Inherit from a class and alter its properties/ define new features. Second option: Assume every class is composed of modules. Then we could try to **change a widget's composition** to fine tune a widget to our needs.
Summary | 

Topic/Title | 
--- | ---
Keywords/Questions | 
Notes | 
Summary | 