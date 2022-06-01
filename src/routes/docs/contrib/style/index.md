# 🏛️ Style guidelines

##### - Follow the Model-View-View-Model (MVVM) design convention.
##### - The code must be well-written and expose a clear purpose.
##### - Your code must be easily maintainable without requiring to rewrite core parts, making sure no code is being duplicated; utilizing abstractions and inheritance is a great way  to sustain high code metrics.
##### - Follow the CodeFactor configuration.

## Code style

To make the codebase consistent and easy to understand, we require you to follow the [predefined code style rules](https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/coding-conventions) and the parts that differ from the guidelines are listed below:

### Naming conventions

##### - Do not add the `s_` or `t_` prefix to static or thread static fields.

### Layouts

##### - Leaving multiple blank lines in code may be accidentally noticed as an error - please make sure you do not do this without administrative permission.

### Comments

##### - XML comments may be omitted only if the purpose of the statement is clear or general without writing it.

### Others

##### -  Use (); whenever possible to instantiate variables.
