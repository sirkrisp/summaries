
## Coordinate Transforms

Consider a world frame $w$ and a frame $1$ that share the same origin. To transform world coordinates $p_w$ to frame $1$ coordinates $p_1$ we need to multiply $p_w$ with the following rotation matrix:
$$
\begin{aligned}
{}_1R_w &= 
\left(
\begin{matrix}
{}_w e_{1,x}^\top \\
{}_w e_{1,y}^\top
\end{matrix}
\right) =
\left(
\begin{matrix}
c_\theta & s_\theta \\
-s_\theta & c_\theta
\end{matrix}
\right) \\
p_1 &= {}_1R_w\ p_w
\end{aligned}
$$

Note that a rotation is equivalent to ${}_w R_1$. 

If frame $w$ and $1$ and shifted by ${}_w t_{w,1}$, then we first need to subtract ${}_w t_{w,1}$ from $p_w$ before applying ${}_1R_w$:
$$
\begin{aligned}
p_1 &= {}_1R_w \ {}_w T_{1,w}\ \left(\begin{matrix}p_w \\ 1\end{matrix}\right) \\
{}_w T_{1,w} &= 
\left(
\begin{matrix}
I & -{}_w t_{w,1} \\
0 & 1
\end{matrix}
\right)
\end{aligned}
$$

