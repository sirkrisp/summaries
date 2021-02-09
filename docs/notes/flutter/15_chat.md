Topic/Title | Named Routes
--- | ---
Keywords/Questions | static, router, initialRoute
Notes | Instead of using strings in *routes* map associate an **static id** with each screen => less risk of typos. Forgot how to use named router => F1 shows documentation
Summary | Adding named routes to main.dart and static id to screens.

Topic/Title | Refactor Routes with the Static Const
--- | ---
Keywords/Questions | 
Notes | 
Summary | All routes as static const id + added Navigator.pushNamed(context, id)

Topic/Title | Flutter Hero Animations
--- | ---
Keywords/Questions | Hero
Notes | Hero requires a tag
Summary | Logo to *float* from one to another screen.

Topic/Title | Custom Flutter Animations with the Animation Controller
--- | ---
Keywords/Questions | SingleTickerProviderStateMixin, AnimationController, Animation, **with**, **mixin**, dispose, ColorTween
Notes | **Mixin** => **with** SingleTickerProviderStateMixin, controller.value from 0 -> 1. Change animation curve by defining an animation = CurvedAnimation(parent: controller, curve: Curves.easeIn). animation.addStatusListener, controller.addListener. Dispose controller when app is disposed to save ressources. Animation listens on controller, controller controls the tick event. controller.forward(), controller.reverse()
Summary | Play around with animations

Topic/Title | Code refactoring challenge
--- | ---
Keywords/Questions | 
Notes | Remember constants can be further tuned with .copyWith(property)
Summary | extract widgets (rounded_button.dart) and create constant for TextDecoration

Topic/Title | Registering Users with Firebase using FirebaseAuth
--- | ---
Keywords/Questions | 
Notes | keyboardType: TextInputType.emailAddress, obscureText: true
Summary | Tuning input text fields

Topic/Title | Listening for Data from Firebase using Streams
--- | ---
Keywords/Questions | stream
Notes | .collection(collectionName).snapshots()
Summary | Subscribe to document changes in the cloud with **streams**

Topic/Title | Turning Streams into Widgets Using the StreamBuilder
--- | ---
Keywords/Questions | StreamBuilder
Notes | Use Streambuilder to subscribe to streams and handle update
Summary | Column of messages

Topic/Title | The Flutter ListView
--- | ---
Keywords/Questions | 
Notes | 
Summary | Styling the text messages

Topic/Title |  A Different UI for Different Senders
--- | ---
Keywords/Questions | 
Notes | 
Summary | 

Topic/Title | Cloud Firestore Security Rules
--- | ---
Keywords/Questions | 
Notes | 
Summary | 

Topic/Title | 
--- | ---
Keywords/Questions | 
Notes | 
Summary | 

Topic/Title | 
--- | ---
Keywords/Questions | 
Notes | 
Summary | 

Topic/Title | 
--- | ---
Keywords/Questions | 
Notes | 
Summary | 