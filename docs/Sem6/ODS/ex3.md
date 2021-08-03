# Exercise Set 3

### A. Subgradients

#### Exercise 3.1

If $f$ is differentiable, then by definition:
$$
f(y) = f(x) + \nabla f(x)^T (y - x) + r(y - x),
$$
where $r$ is a function that satisfies:
$$
\lim_{v \rightarrow 0} \frac{||r(v)||}{||v||} = 0
$$
Let us assume that there exists a subgradient $g$ at $x$ for $f$:
$$
f(y) = f(x) + g^T (y - x) + r'(y-x) \quad \forall y,
$$
where $r'$ maps to $\mathbb{R}_0^+$. Hence, for all $y \in dom(f)$ the following holds:
$$
\begin{aligned}
f(x) + g^T (y - x) &\leq f(x) + g^T (y - x) + r'(y-x)  \\
&\leq f(x) + \nabla f(x)^T (y - x) + r(y - x) \\
&= f(y)
\end{aligned}
$$
However, **uniqueness** of $\nabla f(x)$ yields the identity $g \equiv \nabla f(x)$. Moreover, by definition of convexity, $g$ does only exist when $f$ is **convex**. Hence, we get $\partial f(x) \subseteq \{\nabla f(x)\}$.

#### Exercise 3.2 (Lipschitz continuity and bounded subgradient)

By convexity we get for all $g \in \partial f(x)$:
$$
f(y) \geq f(x) + g^T (y - x)
$$
From this definition we can derive the following bounds:
$$
\begin{aligned}
f(x) - f(y) &\leq -g^T (y - x) \\
|f(x) - f(y)| &\leq |-g^T (y - x)| \\
&\leq  ||g|| \cdot ||y - x|| && \text{Cauchy-Schwarz}
\end{aligned}
$$
$(i) \rightarrow (ii)$: Follows immediately by inserting $||g|| \leq B$ into the term above.
$(ii) \rightarrow (i)$: Follows immediately from $||g|| \cdot ||y - x|| \leq B \cdot ||y - x|| \rightarrow ||g||  \leq B$.

### B. Subgradient Descent under Polyak's Stepsize

#### Exercise 3.3 (Convex setting)

By the **basic descent lemma**:
$$
||x_{t+1} - x^*||_2^2 \leq ||x_t - x^*||_2^2 - 2 \gamma_t (f(x_t) - f^*) + \gamma_t^2 ||g_t||_2^2
$$
Now we use our assumption $||g_t|| < B$ and plug in **Polyak's step size** $\gamma_t = \frac{f(x_t) - f^*}{||g_t||_2^2}$:
$$
\begin{aligned}
||x_{t+1} - x^*||_2^2 &\leq ||x_t - x^*||_2^2 - 2 \frac{f(x_t) - f^*}{||g_t||_2^2} (f(x_t) - f^*) + \left(\frac{f(x_t) - f^*}{||g_t||_2^2}\right)^2 ||g_t||_2^2 \\
&= ||x_t - x^*||_2^2 - \frac{(f(x_t) - f^*)^2}{||g_t||_2^2} \\
&\leq ||x_t - x^*||_2^2 - \frac{(f(x_t) - f^*)^2}{B^2}
\end{aligned}
$$
Taking the sum over all time steps yields:
$$
\begin{aligned}
\sum_{t=1}^T \frac{(f(x_t) - f^*)^2}{B^2} &\leq \sum_{t=1}^T ||x_t - x^*||_2^2 - ||x_{t+1} - x^*||_2^2 \\
&\leq ||x_1 - x^*||_2^2
\end{aligned}
$$
Finally, using that $f(x_t) \geq f^*$ we get the desired result:
$$
\begin{aligned}
\frac{T}{B^2} \cdot (\min_{1 \leq t \leq T} f(x_t) - f^*)^2 &\leq ||x_1 - x^*||_2^2 \\
\min_{1 \leq t \leq T} f(x_t) - f^* &\leq \frac{B}{\sqrt{T}} ||x_1 - x^*||_2
\end{aligned}
$$

#### Exercise 3.4 (Strongly convex setting)

By definition of **$\mu$-strongly convex**, non-differentiable functions:
$$
\begin{aligned}
f(x^*) &\geq f(x_t) + g_t^T(x^* - x_t) + \frac{\mu}{2}||x_t - x^*||^2 \\
g_t^T(x^t - x_*) &\geq f(x_t) - f(x^*) + \frac{\mu}{2}||x_t - x^*||^2
\end{aligned}
$$
Using the **basic descent lemma**:
$$
||x_{t+1} - x^*||_2^2 \leq ||x_t - x^*||_2^2 - 2 \gamma_t \left(f(x_t) - f(x^*) + \frac{\mu}{2}||x_t - x^*||_2^2 \right) + \gamma_t^2 ||g_t||_2^2
$$
Now we plug in Polyak's step-size and use our assumption $||g_t|| < B$:
 $$
\begin{aligned}
||x_{t+1} - x^*||_2^2 &\leq ||x_t - x^*||_2^2 - \frac{(f(x_t) - f^*)^2}{B^2} - \frac{\mu}{B^2}(f(x_t) - f^*)||x_t - x^*||_2^2 \\
 &\leq ||x_t - x^*||_2^2 - \frac{\mu}{B^2}(f(x_t) - f^*)||x_t - x^*||_2^2
\end{aligned}
$$
Again, taking the telescoping sum yields:
$$
\begin{aligned}
\sum_{t=1}^T \frac{\mu}{B^2}(f(x_t) - f^*)||x_t - x^*||_2^2 &\leq \sum_{t=1}^T ||x_t - x^*||_2^2 - ||x_{t+1} - x^*||_2^2 \\
\left(\min_{1 \leq t \leq T} f(x_t) - f^* \right) \cdot \frac{\mu}{B^2} \sum_{t=1}^T ||x_t - x^*||_2^2 &\leq ||x_{1} - x^*||_2^2 \\
\left(\min_{1 \leq t \leq T} f(x_t) - f^* \right) \cdot \frac{\mu}{B^2} T ||x_1 - x^*||_2^2 &\leq ||x_{1} - x^*||_2^2 \\
\min_{1 \leq t \leq T} f(x_t) - f^* &\leq \frac{B^2}{\mu T} \\
&\leq \frac{4B^2}{\mu T}
\end{aligned}
$$

### C. Programming on SVM Classification

#### Implementation of Subgradient Descent

[TODO] How to choose sub-gradient?

