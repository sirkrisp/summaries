# Speed Walker Challenge

Our goal is to immitate the frog jumping mechanism using penumatic actuators. We were inspired by [this video](https://youtu.be/yKpJElwama8) from National Geographic which shows frogs jumping in slow motion.

@import "leg concept.jpg"

## Modeling

We don't have any simulation results yet due to great difficulties with SOFA. Here are the issues we faced with SOFA:

- Compilation was not successful even after putting in hours of effort
- Collission detection seems not to work with the binary distributed via the [Soft Robotics Plugin Homepage](https://project.inria.fr/softrobot/).
- Documentation for most of the components do only exist in the form of examples. Therefore, we have to reverse engineer or have to "guess" the options and dependencies for each component.
- Video tutorials only cover the pure basics and components that are well documented.

Nevertheless, we plan to have a working simulation model in the near future. Moreover, we also thought about simplifying the whole simulation by modeling the frog leg as a chain of rigid bodies with interconnecting springs instead of modeling a soft material reacting to air pressure.

Finally, instead of using SOFA we could also use [Nvidia Flex](https://developer.nvidia.com/flex) that can model rigid/ soft/ fluid systems through particle simulations. Nvidia Flex is also available as a Unity plugin.

