Topic/Title | Designing the To-Do List App
--- | ---
Keywords/Questions | 
Notes | 
Summary | Styling the Todoey list, adding a tasks_screen file

Topic/Title | The ListView Challenge
--- | ---
Keywords/Questions | ListView, TaskTile
Notes | 
Summary | Creating new files tasks_list.dart and task_tile.dart

Topic/Title | The BottomSheet Widget
--- | ---
Keywords/Questions | showModalBottomSheet
Notes | 
Summary | add_task_screen.dart

Topic/Title | What is State and How do we Manage it?
--- | ---
Keywords/Questions | 
Notes | 
Summary | Create TaskCheckbox in task_tile.dart, convert task_tile to stateful widget

Topic/Title | The ListView Builder
--- | ---
Keywords/Questions | ListView.builder
Notes | ListView builder builds only tiles that are visible.
Summary | Make TaskTile stateless again. Create **models/task.dart** and a list of tasks.

Topic/Title | Lifting State Up Challenge
--- | ---
Keywords/Questions | 
Notes | 
Summary | Make list of tasks available to AddTaskScreen by lifting the list up to the TasksScreen.

Topic/Title | Flutter App Architecture Patterns
--- | ---
Keywords/Questions | Model View Control (**MVC**)
Notes | Model = Data & Logic, View = User interface, Control = Mediator (e.g. makes queries)
Summary | 

Topic/Title | Introducing the Provider Package
--- | ---
Keywords/Questions | Prop Drilling, Provider, InheritedWidget, ChangeNotifier
Notes | **Prop Drilling** = pass data to descendants => **InheritedWidget**, **Provider** wraps InheritedWidget. In order to use the Provider package wrap the App (or a widget) with the Provider or **ChangeNotifierProvider** widget. **Data class** should inherit from **ChangeNotifier** => create function that calls **notifyListeners()**. Update data with **Provider.of<Data\>(context).changeString()** where changeString is a custom method of Data that calls notifyListeners().
Summary | 

Topic/Title | Using a Provider and a ChangeNotifier to Manage State
--- | ---
Keywords/Questions | Consumer, get
Notes | Instead of multiple calls to *Provider.of<Data\>(context).tasks* one can simply wrap the parent widget with a **Consumer** widget which then makes the data available to its children.
Summary | 

Topic/Title | Adding New To-Do List Tasks
--- | ---
Keywords/Questions | UnmodifiableListView
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