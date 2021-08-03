# Optimization for Data Science - Lectures

## W1 Lecture 1

$f: dom(f) \rightarrow R$ is **convex**, iff $dom(f)$ is convex and for all $x, y \in dom(f)$, $0 \leq \lambda \leq 1$: 

$$f(\lambda x + (1 - \lambda)y) \leq \lambda f(x) + (1 - \lambda) f(y)$$

If $dom(f) \subseteq R^d$ is finite and open $\rightarrow$ $f$ is **continuous**.

## W1 Lecture 2

#### Example: Convex function that is *discontinuous*.

$V$ = set of univariate polynomials (countable infinite vector space). Let $dom(f) = V$ and define $f$ as follows:

$$f(p) = p'(0)$$

**Proof**: $f$ is discontinuous at $0$ (by means of the superior norm defined on $V$).  
**Idea**: Find sequence of polynomials that converge to $0$ but have a non-zero derivative at $0$. For example, polynomials that approximate the sinus curve.

#### Differentiable Function
A function  $f$ that can be locally approximated (*error* term is *sub-linear*) by an affine function $l$:

$$l(y) = f(x) + A(y - x)$$

Sub-Linearity of error term $r(v)$ ($v = y - x$, $x$ constant):

$$ lim_{v \rightarrow 0} \frac{|r(v)|}{|v|} = 0$$

#### 1st order characterization of convexity:

If $f$ is convex and differentiable $\leftrightarrow$

$$f(x) \geq f(x) + \nabla f(x)^T (y - x)$$

**Proof**: Use *definition* and *differentiability* of a convex function and convexity of $dom(f)$.

#### 2nd order characterization of convexity

$\nabla^2 f(x) \succeq 0$ is positive semidefinite.

#### Operation that preserve Convexity

- sum of convex functions
- composition with an affine function, $f(Ax+b)$

#### Properties of convex functions

- *local minima* are global minima (Proof by contradiction)
- *critical points* ($x$ s.t. $\nabla f(x) = 0$) are global minima (*Gradient descent* tries to find those points)

#### Strictly convex functions

- same rules as for convex functions but without equality

#### Constrained minimaztion

$x^* \in X$, $X \in dom(f)$ convex, is a minimizer of $f$ over $X$ iff

$$\nabla f(x^*)^T (x - x^*) \geq 0, \forall x \in X$$

#### Existence of a minimizer

**$\alpha$-sublevel set** of $f$

$$f^{\leq \alpha} := \{x \in R^d: f(x) \leq \alpha\}$$

**The Weierstrass Theorem**:  
If there is a nonempty and **bounded** sublevel set $f^{\leq \alpha}$ $\rightarrow$ $f$ has a **global minimum**. 

**Proof**: Continuous functions attain a minimum in a compact set.

**Weekly coercive functions**

## W2 Lecture 3 - Gradient Descent

#### Idea
Suppose there is a global minimum at $x^*$. Find $x$ s.t.

$$
f(x) - f(x^*) \leq \epsilon
$$

#### The Algorithm

$$
x_{t+1} := x_t + v_t
$$

How to choose $v_t$?

$$
\begin{aligned}
f(x_t + v_t) &\approx f(x_t) + \nabla f(x_t)^T v_t \\
&\geq f(x_t) - \nabla f(x_t)^T \nabla f(x_t) && \text{Cauchy-Schwarz}
\end{aligned}
$$

Hence, gradient descent takes the following update step with constant **step-size** $\gamma$:
$$
x_{t+1} = x_t - \gamma \nabla f(x_t)
$$

#### Vanilla Analysis

How to bound $f(x_t) - f(x^*)$?  
**Theorem 2.1:**

$$
\gamma = \frac{R}{B\sqrt{T}}
$$

$$
\frac{1}{T} \sum_{t=0}^{T-1}{(f(x_t) - f(x^*))} \leq \frac{RB}{\sqrt{T}}
$$

$$
T \geq \frac{R^2B^2}{\epsilon^2} \rightarrow \frac{RB}{\sqrt{T}} \leq \epsilon
$$

- dimension independent (but constants could depend on dimension)
- holds for average and best iterate

#### Smooth Functions

$$
f(y) \leq f(x) + \nabla f(x)^T (y - x) + \frac{L}{2} ||x-y||^2
$$

- Not confused with infinitely often differentiable

## W2 Lecture 4 - Gradient Descent cont'd

#### Smooth Functions cont'd

Trick:

$$
y^2 = x^2 + 2x(y - x) + (x - y)^2
$$

**Operations the preserve smoothness:** Summation and composition with an affine function.

- f smooth $\leftrightarrow$ Lipschitz continuity of $\nabla f$

#### Sufficient decrease

If $f$ is **smooth** on the line segment connecting $x_{t+1}$ and $x_t$
$$
\gamma = \frac{1}{L}
$$
$$
f(x_{t+1}) \leq f(x_t) - \frac{1}{2L} ||\nabla f(x_t)||^2
$$

**Proof:** Use smoothness and plug-in definition of gradient-descent

#### Theorem
If $f$ is **smooth** and **convex**:

$$
f(x_{T}) - f(x^*) \leq \frac{L}{2T} ||x_0 - x^*||^2
$$

**Proof:** Use sufficient decrease and result from Vanilla Analysis

TODO Last iterate is the best

$$
T \geq \frac{R^2L}{2 \epsilon} \rightarrow \frac{L}{2T}R^2 \leq \epsilon
$$

#### Nesterov's accelerated gradient descent

Best algorithm for smooth convex functions: $O \left(\frac{1}{\sqrt{\epsilon}} \right)$ steps

*Proof:* Based on potential functions. 3 ingredients: 

- Sufficient decrease
- Vanilla Analysis
- Convexity (graph above the tangent hyperplane)

#### Strongly Convex Functions

Motivation: Supermodel $f(x) = x^2$ has much better (exponential) convergence than we proved for general smooth functions.

Definition:
$$
f(x) \geq f(x) + \nabla f(x)^T (y - x) + \frac{\mu}{2} ||x - y||^2
$$

#### Theorem 2.12 - Smooth and strongly convex functions: $O(\log{\frac{1}{\epsilon}})$ steps

i)

$$
||x_{t+1} - x^*|| \leq \left(1 - \frac{\mu}{L} \right) ||x_t - x^*||^2
$$

ii)

$$
f(x_T) - f(x^*) \leq \frac{L}{2} \left(1 - \frac{\mu}{L} \right)^T ||x_0 - x^*||^2
$$

*Proof*:

- Use result from Vanilla Analysis
- Use stronger lower bound from strong convexity

$$
T \geq \frac{L}{\mu} \log {\frac{R^2L}{2 \epsilon}} \rightarrow \frac{L}{2} \left(1 - \frac{\mu}{L} \right)^T R^2 \leq \epsilon
$$

## W3 Lecture 5 - Nonsmooth Optimization

Operations that make the function non-smooth (non-differentiable)

- Examples:
    - Lasso
    - Soft Margin SVM => hinge loss non-smooth

#### Subgradients

$g$ is a subgradient (non-unique) if 

$$
f(y) \geq f(x) + g^T (y - x)
$$

#### Hyperplane seperation theorem

Convex sets that do not intersect are seperable by a hyperplane

Convex and Lipschitz <=> bounded subgradients

## W3 Lecture 6 - Nonsmooth Optimization cont'd 

#### Descent Directions
TODO

#### Subgradient descent

$$
x_{t+1} = \Pi_X(x_t - \gamma_t g_t),
$$
where $g_t \in \partial f$

#### Choices for step size

- constant
- Scaled (divide through subgradient norm)
- Non-summable but diminishing stepsize
- Square summable stepsize $\gamma = 1 / t$
- Polyak's stepsize $\gamma_t = \frac{f(x_t) - f(x^*)}{||g_t||_2^2}$

#### Basic "Descent" Lemma

$$
||x_{t+1} - x^*||_2^2 \leq ||x_{t} - x^*||_2^2 - 2 \gamma_t (f(x_t) - f(x^*)) + \gamma_t^2 ||g_t||_2^2
$$

#### Main Theorem on Convergence

If $f$ is convex:

$$
\min_{1 \leq t \leq T} f(x_t) - f^* \leq \frac{||x_1 - x^*||_2^2 + \sum_{t=1}^T {\gamma_t^2 ||g_t||_2^2}}{2 \sum_{t=1}^T \gamma_t}
$$
and
$$
f(\hat{x}_t) - f^* \leq \frac{||x_1 - x^*||_2^2 + \sum_{t=1}^T {\gamma_t^2 ||g_t||_2^2}}{2 \sum_{t=1}^T \gamma_t},
$$
where $\hat{x}_t = \frac{\sum_{t=1}^T \gamma_t x_t}{\sum_{t=1}^T \gamma_t}$.

#### Convergence Rate fro Convex Lipschitz Problem

#### Convergence for Strongly Convex Lipschitz case

### Lower bound

## W4 Lecture 7 & 8 - Nonsmooth and Composite Optimization

Motivation: Try to exploit:
- non-Euclidean geometry -> Mirror descent
- structure of $f$ -> Proximal algorithms

#### Norms

#### Bregmann Divergence
- mirror function


#### Mirror descent

##### Convergence of mirror descent
$
\gamma_t(f(x_t) - f^*) \leq V_w^t - V_w^{t+1} + \frac{\gamma_t^2}{2} ||g_t||_*^2,
$
where $||.||_*$ is the dual norm.

###### Proof 
TODO

#### Convex Composite Optimization

$$
\min_{x \in R^d} f(x) + g(x)
$$

#### Proximal operator

#### Proximal Gradient Method

##### Interpretations

###### Interpretation 1

## Lecture 5 - Stochastic Optimization

$$
\min_{x \in R^d} F(x) := E_{\xi}[f(x, \xi)]
$$

Assumptions:
- $f$ convex in $x$ and differentiable => $F(x)$ is convex

Similar to **big-$n$** problem (empirical risk).

#### Stochastic Gradient Descent

- unbiased estimate

#### Convergence Analysis

##### Convex case

##### Strongly convex case

##### Smooth and strongly convex case

#### Variance Reduction Techniques

#### Adaptive methods

## Lecture 6 - Nonconvex optimization

- Bounded Hessians => smooth
- smooth => bounded hessians (over any *open* convex set)

Say something about convergence of $||\nabla f(x_t)||^2 \rightarrow 0$.

#### Gradient descent on smooth functions

##### No overshooting with $\gamma = \frac{1}{L}$

#### Trajectory analysis

#### Balanced iterates

#### Bounded Hessians along the trajectory

## Lecture 7 - Newton's Method and Quasi-Newton methods

#### Newton-Raphson method
Find zeros (Newton is referred to in optimization with 2nd derivatives, Newton-Raphson wants to find zeros - only involves first derivative)

does not always converge

#### The Babylonian method

Find zero of $f(x) = x^2 - R$

#### Newton's method
$$x_{t+1} = x_t - \nabla^2 f(x_t)^{-1} \nabla f(x_t)$$

= minimize second order taylor expansion at each step

Once you're close you're there (when close to optimum, super-exponentially fast). Intuition, Hessian nearly constant close to optimum.

#### Quasi Newton Methods

Motivation by secant methods (replace gradient with finite difference)
How to choose $H_t$:
$$ \nabla f(x_t) - \nabla f(x_{t-1}) = H_t (x_t - x_{t-1}), \quad H_t = H_t^T $$

##### Greenstadt

TODO recap derivation from lecture notes (involves Lagrange multipliers)

##### Goldfarb
=> BFGS method

##### BFGS method

M = 

##### L-BFGS

Normal $m = 10$

No theoretical runtime guarantees






















