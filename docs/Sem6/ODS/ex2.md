# Exercise Set 2

### Exercise 13

By **Cauchy-Schwarz**:

$$
|c^T x| \leq ||c||\, ||x||
$$

Hence, the spectral norm of $c^T$ is bounded by $||c||$. This bound is reached at $x = c$ and hence equal to the Euclidean norm.

### Exercsie 14

We proof that the gradients of $f$ are Lipschitz continuous which implies smoothness of $f$ (**Lemma 2.4** from the lecture notes):

$$
\nabla f(x) = (Q + Q^T) x + b = 2Qx + b
$$

$$
\begin{aligned}
||2Q(x-y)|| = ||2Q\frac{x-y}{||x-y||} ||x-y|||| \leq 2||Q|| \cdot ||x-y||
\end{aligned}
$$

### Exercise 16

The idea is to adapt the step size $\gamma$ so that we do not make updates on $x$ that are too large. One way to constrain the step size is by normalizing the gradients. Therefore, we guess:

$$
\gamma_t = \frac{R}{||g_t|| \sqrt{T}}
$$

Then, we can bound the updates on $x$ by:

$$
\begin{aligned}
x_{t+1} &= x_t - \frac{R}{||g_t|| \sqrt{T}} g_t \\
|| x_{t+1} - x_t ||^2 &\leq \frac{R^2}{T}
\end{aligned}
$$

From the Vanilla Analysis (equation 2.3, Chapter 2 in the lecture notes), we get:

$$
\begin{aligned}
g_t^T(x_t-x^*) &= \frac{\gamma_t}{2} ||g_t||^2 + \frac{1}{2 \gamma_t} (||x_t - x^*||^2 - ||x_{t+1} - x^*||^2) \\
&= \frac{1}{2} \frac{R ||g_t||}{\sqrt{T}} + \frac{1}{2} \frac{||g_t|| \sqrt{T}}{R} (||x_t - x^*||^2 - ||x_{t+1} - x^*||^2) \\
&\leq \frac{1}{2} \frac{R ||g_t||}{\sqrt{T}} + \frac{1}{2} \frac{||g_t|| \sqrt{T}}{R} ||x_t - x_{t+1}||^2 \\
&\leq \frac{1}{2} \frac{R ||g_t||}{\sqrt{T}} + \frac{1}{2} \frac{R ||g_t||}{\sqrt{T}} =  \frac{R ||g_t||}{\sqrt{T}}
\end{aligned}
$$

Finally, by following the same steps as in the Vanilla Analysis, we get:

$$
\sum_{t=0}^{T-1}{(f(x_t) - f(x^*))} \leq \sum_{t=0}^{T-1}{\frac{R ||g_t||}{\sqrt{T}}} \leq RB \sqrt{T}
$$

Hence, for $T = \frac{\epsilon^2}{R^2B^2}$ we get our desired result.

### Exercise 17

i) From $\nabla f = \sum \lambda_i \nabla f_i(x)$, we get:

$$
\begin{aligned}
|| \nabla f(x) - \nabla f(y) || &= || \sum \lambda_i (\nabla f_i(x) - \nabla f_i(y)) || \\
&\leq \sum \lambda_i || \nabla f_i(x) - \nabla f_i(y)) || && \text{Cauchy-Schwarz} \\
&\leq \sum \lambda_i L_i || x - y ||
\end{aligned}
$$

ii) Let $y = Ax+b$. Then we get $\frac{\partial y_j}{\partial x_i} = A_{ji} = A^T_{ij}$ and hence $\frac{df(y)}{dx_i} = \sum \frac{\partial f(y)}{\partial y_j} \frac{\partial y_j}{\partial x_i} = A^T_{i,:} \nabla f(y)$. Let $u, v \in \text{dom}(f)$ and we define $z := \nabla f(Au + b) - \nabla f(Av + b)$. Then:

$$
\begin{aligned}
|| \nabla f(u) - \nabla f(v) || &= || A^T z|| \\
&= || A^T \frac{z}{||z||} \cdot ||z|| \, || \\
&\leq || A^T || \cdot ||z||  && \text{definition of spectral norm}\\
&\leq || A^T || \cdot L ||A (u - v)|| && \text{by smoothness of } f \\ 
&\leq || A^T || \cdot L ||A|| \cdot ||u - v|| 
\end{aligned}
$$

Since $|| A^T || = || A ||$, we get the desired result.

### Exercise 18

Idea: Choose $\gamma$ such that we still have sufficient decrease in each update step...

### Exercise 20

If we can show the existence of a global minimum $x^*$ then from the definition of strongly convex functions we get

$$
f(y) \geq f(x^*) + \frac{\mu}{2} || x^* - y||^2,
$$

which makes $x^*$ unique for $\mu > 0$. Let us pick a random $x \in \text{dom}(f)$. Since  

$$
g(y) = f(x) + \nabla f(x)^T (y - x) + \frac{\mu}{2} || x - y||^2
$$

is a strong convex function, there must be a $y^*$ that is the global unique minimum of $g$. Hence, $f$ is bounded from below by $g(y^*)$ which implies the existence of a global minimum in $f$. 





