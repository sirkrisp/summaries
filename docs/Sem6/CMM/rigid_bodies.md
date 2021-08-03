# Rigid Bodies

- Describe rigid body with position of center of mass in world coordiantes and a rotation matrix that transform local vectors to world coordinates:

$$
x_w = p_w + {}_wR_b\ x_b
$$

- Columns of 𝐑(𝑡) encode global coordinates of body space x, y and z vectors at time 𝑡. 
$$
x_w' = p_w' + {}_wR_b'\ x_b
$$ where the derivative is with respect to time.

- let $w$ encode the angular velocity $|w| = \theta'$. Let $c = a^\parallel + b^\perp$ where $a \parallel w$ and $b \perp w$. Then, $|b'| = |b||w|$. By assumption, $b'$ is orthogonal to $w$ and, thus, we can identify $b = w \times b$. Hence, we get:
$$c' = w \times a + w \times b = w \times b = w \times c$$

- Now we can make sense of the derivative of the rotation matrix: $R_{:,1}' = w \times R_{:,1} \rightarrow R_b' = [w]_\times R_b$

### Rigid body dynamics

$$
\begin{aligned}
x_w' &= p_w' + [w(t)]_\times R_b\ x_b \\
&= v + w(t) \times (R_b \ x_b + p_w - p_w) \\
&= v + w(t) \times (x_w - p_w) \\
&= \underbrace{v}_{\text{linear component}} + \underbrace{w(t) \times \vec{r}_w}_{\text{angular component}}
\end{aligned}
$$

### Kinetic energy

$$
K = \frac{1}{2} \sum_i{\dot{x}_i^{T}m_i\dot{x}_i} = \underbrace{\frac{1}{2} v^T M v}_{\text{First order of mass: where is the mass concentrated}} + \underbrace{\frac{1}{2} w^T I w}_{\text{Second order of mass: how is the mass distributed in space}}
$$

- Moment of intertia: $I = RI_b R^T$

### forces and torques
- forces: $F(t) = \sum_i f_i(t)$
- torques: $\tau(t) = \sum_i r_i \times f_i(t)$
    - net torque enforces by gravity is zero as $r_i$ is with respect to center of mass

### Linear and angular momenta

- linear momentum: $p = Mv$, $F = p'$
- angular momentum: $L = Iw$, $\tau = L'$
    - $L' = I'w + Iw'$
    - $I' = [w]I + I[w] \rightarrow I'w = w \times Iw$
    - $Iw' = \tau - w \times Iw$

### F = ma
$$
\begin{bmatrix}
F \\
\tau - w \times Iw
\end{bmatrix} = 
\begin{bmatrix}
M \mathbb{I} & 0 \\
0 & I
\end{bmatrix}
\begin{bmatrix}
v' \\
w'
\end{bmatrix}
$$ The equations are decoupled so we can solve for $v'$ and $w'$ separatly.  

### Symplectic Euler
 1) Compute net forces and torques
 2) solve for $v'$ and $w'$
 3) update $v$ and $w$
 4) update $p$ and $R$
    - note that updating $R$ is not trivial because $R$ has to stay a rotation matrix. 
    - Quaternions can help




