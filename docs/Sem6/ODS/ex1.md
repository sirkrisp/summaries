# Exercise Set 1

### Exercise 2 Prove Jensen's inequality (Lemma 1.12)!

**Jensen's inequality:** Let $f$ be convex and $\sum{\lambda_i} = 1$, then:

$$
f \left(\sum \lambda_i x_i \right ) \leq \sum \lambda_i f(x_i)
$$

**Proof by induction:** By definition of convexity, 

$$f(\lambda x + (1 - \lambda)y) \leq \lambda f(x) + (1 - \lambda) f(y),$$

Jensen's inequality holds for $m=2$. Let $\lambda = \lambda_1$. Since $\sum_{i=2}^{m+1} \frac{\lambda_i}{1-\lambda_1} = 1$, we get:

$$
\begin{aligned}
f \left(\sum_{i=1}^{m+1}\lambda_i x_i \right) &= f \left(\lambda x_1 + (1-\lambda)\sum_{i=2}^{m+1} \frac{\lambda_i x_i}{1-\lambda} \right) && \text{by definition of } \lambda \\
&\leq \lambda_1 f(x_1) + (1-\lambda_1) f\left(\sum_{i=2}^{m+1} \frac{\lambda_i x_i}{1-\lambda_1}\right) && \text{by convexity} \\
&\leq \lambda_1 f(x_1) + (1-\lambda_1) \sum_{i=2}^{m+1} \frac{\lambda_i}{1-\lambda_1} f(x_i) && \text{by induction} \\
&= \sum \lambda_i f(x_i)
\end{aligned}
$$

### Exercise 3 Prove that a convex function (with dom(f) open) is continuous (Lemma 1.13)!

Consider a cube $C$ of size $2\epsilon$ centered around $x \in \mathbb{R}^d$: $[x_1 - \epsilon, x_1 + \epsilon] \times [x_2 - \epsilon, x_2 + \epsilon] \times \dots [x_d - \epsilon, x_d + \epsilon]$. W.l.o.g. we fix $x_{i, i > 1}$ and show that a convex function $f(x_1 | x_{i, i > 1})$ attains its maximum at $x_1 - \epsilon$ or $x_1 + \epsilon$. Since $f$ is convex, we get for $x_1 - \epsilon \leq z \leq x_1 + \epsilon$: 

$$
f(z) \leq \max_\lambda{\lambda f(x_1-\epsilon) + (1-\lambda)f(x_1+\epsilon)} = \max\{f(x_1-\epsilon), f(x_1+\epsilon)\}
$$

As we have fixed $x_{i, i > 1}$ arbitrarly, $f$ attains its maximum over $C$ at one of the cube domain's corners.

Now, consider two points $w, y$ that are within radius $\epsilon$ around $x$, $|| w - x || \leq \epsilon$ and $|| y - x || \leq \epsilon$, and such that there is a $\delta$ for which $y = (1 - \delta)x + \delta w$. Let us further define $M := \max_{x \in C} f(x)$.

$$
\begin{aligned}
|f(y) - f(x)| &= |f((1 - \delta)x + \delta w) - f(x)| \\
&\leq |(1 - \delta)f(x) + \delta f(w) - f(x)| && \text{by convexity of } f\\
&\leq \delta |M - f(x)| && \text{since } w \in C
\end{aligned}
$$

The RHS vanishes for $\delta \rightarrow 0$ since $|M - f(x)|$ is constant. As $w$ was chosen arbitrarly, it follows that $f$ is continuous.

### Exercise 4 Prove that the function $d_y : \mathbb{R}^d \rightarrow \mathbb{R}, x \rightarrow ||x - y||^2$ is strictly convex for any $y \in \mathbb{R}^d$. (Use Lemma 1.24.)

Lemma 1.24 states that functions that have a positive definite Hessian are strictly convex. The gradient of $||x - y||^2$ is $2 (x - y)$. The hessian is $2 \text{Id}(d)$ and hence positive definite.

### Exercise 5 Prove Lemma 1.18! Can (ii) be generalized to show that for two convex functions $f, g$, the function $f \circ g$ is convex as well?

i) Let $r \in [0, 1]$ and $f_i$ and $\lambda_i$ as in Lemma 1.18. Then, we get:

$$
\begin{aligned}
\sum \lambda_i f_i(r x + (1 - r) y) &\leq \sum \lambda_i (r f_i(x) + (1 - r) f_i(y)) && \text{convexity of } f_i\\
&= r \sum \lambda_i f_i(x) + (1 - r) \sum \lambda_i f_i(y)
\end{aligned}
$$

ii) The proof follows immediately from observing that $A(rx + (1-r)y) + b = r(Ax + b) + (1- r)(Ay+b)$ since $rb + (1-r)b = b$.

$$
f(A(rx + (1-r)y) + b) \leq r f(Ax+b) + (1 - r) f(Ay+b)
$$

However, $g = Ax+b$ does not generalize to general convex functions. For example, $f = e^{-x}$ and $g = x^2$ are both convex but $f \circ g$ is not. Intuitively, if $f$ is a decreasing function, the contradiction can also be seen from

$$
f(g(rx + (1-r)y)) \geq f(rg(x) + (1-r)g(y)),
$$

If instead $f$ was increasing, the claim would hold.

### Exercise 7 Consider the function $l$ defined in (1.15). Prove that $f$ is convex!

If we can prove that $\ln \left( \sum e^x \right)$ is convex, then the proof follows immediately from Lemma 1.18 (see previous exercise).

Proof of convexity of $\ln \left( \sum e^x \right)$: 
[StackExchange - uses Hölder's inequality](https://math.stackexchange.com/questions/2418554/why-log-of-sum-of-exponentials-fx-log-left-sum-i-1n-e-x-i-right-is)

**Hölder's inequality**: Let $p, q \in [1, \infty]$ s.t. $\frac{1}{p} + \frac{1}{q} = 1$, then:

$$
\langle f, g \rangle \leq ||f||_p ||g||_q
$$

Let $u = e^x$ and $v = e^y$:

$$
\ln \left( \sum e^{rx + (1-r)y} \right) = \ln \left( \sum u^r v^{1-r} \right)
$$

Using Hölder's inequality with $p = \frac{1}{r}$ and $q = \frac{1}{1 - r}$ and by observing that $u, v > 0$, we get:

$$
\begin{aligned}
\ln \left( \sum u^r v^{1-r} \right) &\leq
\ln \left( \left( \sum u^{r \frac{1}{r}} \right)^r \left( \sum v^{1-r \frac{1}{1 - r}} \right)^{1-r} \right) \\
&= r \ln \left( \sum e^x \right) + (1-r) \ln \left( \sum e^y \right)
\end{aligned}
$$










