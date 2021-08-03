# Exercise Set 4

### A. Bregman Divergence

#### Exercise 4.1
Proof:
$$
V_w(x, z) = V_w(x, y) + V_w(y, z) - \left \langle \nabla w(z) - \nabla w(y), x - y \right \rangle
$$

$$
V_w(x, y) = w(x) - w(y) - \nabla w(y)^T (x - y) 
$$

Pluggin in the definition, we get:

$$
\begin{align*}
V_w(x, z) 
&\stackrel{!}{=} V_w(x, y) + V_w(y, z) - \left \langle \nabla w(z) - \nabla w(y), x - y \right \rangle \\
&= w(x) - w(y) - \nabla w(y)^T (x - y) \\
&\quad + w(y) - w(z) - \nabla w(z)^T (y - z) \\
&\quad - \left \langle \nabla w(z) - \nabla w(y), x - y \right \rangle \\
&= w(x) - w(z) - \nabla w(z)^T (y - z) \\
&\quad - \left \langle \nabla w(z), x - y \right \rangle \\
&= w(x) - w(z) - \nabla w(z)^T (x - z)
\end{align*}
$$