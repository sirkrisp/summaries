
First Name:Krispin

Last Name: Wandel

#### Solution to Question 4:

$$
\begin{align}
[F^T F]_{ij} &= \sum_{k=1}^n [F^T]_{ik} F_{kj} = \sum_{k=1}^n F_{ki} F_{kj} \\
[F^T F]_{ii} &= \sum_{k=1}^n F_{ki}^2 \\
\text{tr} (F^T F - I) &= \sum_{i=1}^m -1 + \sum_{k=1}^n F_{ki}^2 = ||F||_F^2 - m = ||F||_F^2 - 2
\end{align}
$$

#### Solution to Question 10:

First, I want to note that in the horizontal case the solution looks as expected. Furthermore, our objective $O$ only depends on the two feature points and makes no further assumptions on the mesh that results from the static solution. Hence, our optimization method just takes the shortest path to the global minimum (objective is convex) in control space and, thus, the solution depends highly on the initial conditions. This behavior can result in unexpected results. 

#### Solution to Question 11:

First, I tried to minimize the shear forces in the static solution but this somehow did not work. I ended up to just regularize the orientation of the left and right handles in the follwing way: Let $v_{l,t}$, $v_{l,b}$ be the left top and bottom corner points and $v_{r,t}$, $v_{r,b}$ the right corner points of the mesh. Let further $p_1$ and $p_2$ be the two feature points controlled by the user. Now, my regularization term $r$ just penalizes the fact that we expect the vectors $v_l = v_{l,t} - v_{l,b}$ and $v_r = v_{r,t} - v_{r,b}$ to be orthogonal to $d = p_1 - p_2$:
$$
\begin{aligned}
\hat v_l &= \frac{v_l}{||v_l||} \\
\hat v_r &= \frac{v_r}{||v_r||} \\
\hat d &= \frac{d}{||d||} \\
r &= \frac{1}{2} \cdot \left((v_l^Td)^2 + (v_r^Td)^2\right)
\end{aligned}
$$
Note, we normalize the vectors to make the objective independent of the dimensions and we further square everything to make the the regularizer smooth. Finally, it is important to mention that our regularizer does not make much sense when we squeeze the bar too much because the static solution of a squeezed bar may have much more energy than a bended bar (depeding on the material paramters). Hence, if the initial bar mesh is not perfectly straight the optimization steps might take a very long time to process because the static solution results in a bended bar whereas our regularizer wants to find a straight bar.

Here is a link to the video that demonstrates everything: https://youtu.be/cMOYAsW7lq4

---

Assignment writeup: http://crl.ethz.ch/teaching/computational-motion-21/slides/tutorial-a4.pdf

---

Could use ./build.sh on Linux/MacOS

