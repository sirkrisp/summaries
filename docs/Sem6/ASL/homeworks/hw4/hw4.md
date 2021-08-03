# Homework 4

Krispin Wandel, 15-941-388

## 1. Associativity

a) We have $W = 2*10=20$ floating point operations. The byte transfer is equal to

$$
Q = \text{\#misses} \cdot b,
$$

where $b = 16\ \text{bytes}$ is the block size of the cache. Hence, we can directly derive the **operational intensity** $I = W / Q$ from the miss/hit pattern. The **miss/hit pattern** can be optained by first computing the set size $s$ from the cache capacity $c = s \cdot b \cdot e = 128\ \text{bytes}$, where $e$ is the associativity of the cache. Once we have the set size $s$, we just have to follow the LRU replacement strategy to obtain the corresponding miss/hit pattern.  

The table below summarizes the results:

| Associativity | miss/hit pattern | operational intensity |
| -- | --| --|
| 2 ($s = 4$) | x: MMMHHHHMMH <br/> y: MMMMHMHHMH <br/> z: MMHHHHHHHH <br/> 13 misses | $\frac{20}{13 \cdot 16} \approx 0.096$
| 4 ($s = 2$) | x: MMMMHHMMHH <br/> y: MMMMHMHHHM <br/> z: MMHHHHHHHH <br/> 14 misses | $\frac{20}{14 \cdot 16} \approx 0.089$

b) 
1. Access to x cannot have spatial locality because all accesses to x are 4 doubles apart from each other (and a block can only store two doubles). However, x[0], x[4], x[8] are accessed more than once and, in fact, we see from the miss/hit pattern that we could exploit this **temporal locality**.
2. The order y is accessed is as follows: 1, 4, 7, 2, 5, 0, 3, 6, 1, 4. As we can see, all elements from 0 to 7 are accessed and indices 1 and 4 are accessed twice. Moreover, z[0] and z[1] (or z[4], z[5]) are never accessed. Hence, x and y can both share the first cache set as we have 2-way associativity. Therefore, accesses to y benefit from both **spatial and temporal locality**.


## 2. Cache Mechanics

From the cache specifications we can compute the set size $s = 384$. Furthermore, ```sizeof(struct_t) = 64``` for ```PADDING_SIZE 1``` and ```sizeof(struct_t) = 96``` for  ```PADDING_SIZE 5```. Moreover, for all $n$ we get the same miss/ hit pattern for accesses to $A$ as $A_{ij}$ is only accessed once. Hence, we can only benefit from spatial locality as follows: 
```c++  {.line-numbers}
t = A[i*n + j].v; // miss, but will also load A[i*n + j].d
for (int k = 0; k < 3; k++) { 
    t += A[i*n + j].d[k]; // hit
}
for (int k = 0; k < 3; k++) {
    A[i*n + j].u[k] = 0; // k = 0 => miss, k = 1,2 => hit
}
// => 2 misses
```
However, $B_{j0}, j=1 \dots n,$ is accessed $n$ times and we can benefit from temporal locality. As we will see below, the miss rate depends on $n$. Finally, the total number of reads and writes is $9n^2$ and we perform $4n^2$ FLOPS.

a) $n = 8$:
$n^2 \cdot 64\ \text{bytes} = 4096\ \text{bytes}$ still fits into the cache. The miss/ hit pattern for $B$ looks as follows: At $i = 0$ we get $n$ compulsory cache misses. For the next $n - 1$ iterations, however, we get only one cache conflict miss as ```A[i*n+0]``` overwrites ```B[i*n]```. In total, we have $2n^2 + n + n-1 = 143$ cache misses and hence the miss rate is $\frac{143}{9 \cdot 64} \approx 0.25$. The operational intensity is $I = \frac{4 \cdot 8^2\ \text{flops}}{143 \cdot 32\ \text{byte}} \approx 0.056\ \frac{\text{flops}}{\text{byte}}$.

b) $n = 16$:
For $n = 16$, in order to fit A (or B) into the cache we would need $16^2 \cdot 64 / 32 = 512$ cache blocks which is a third more than the cache set size. Hence, when we consecutively access $B_{j0},\ j = 0 \dots 15$ the first four entries of B that we loaded into the cache, $B_{j0},\ j = 0 \dots 3$, are overwritten. For $i = 0$ we get again $n$ compulsory cache misses for B, but for $i = 1 \dots 3$ we now get $2 \cdot 4 = 8$ conflict misses instead of only one and for $i = 4 \dots 15$ we get one additional conflict miss because of the access to ```A[i*n]```. In total, we have $2 \cdot 16^2 + 16 + 3 * 8 + 12 * 9 = 660$ cache misses and hence the miss rate is $\frac{660}{9 \cdot 256} \approx 0.29$. The operational intensity is $I = \frac{4 \cdot 16^2\ \text{flops}}{660 \cdot 32\ \text{byte}} \approx 0.048\ \frac{\text{flops}}{\text{byte}}$.

c) $n = 16$ with ```PADDING_SIZE 5```:
In this setting A (or B) is exactly twice as large as the cache capacity. Hence, we can no longer benefit from temporal locality for accesses to B. Therefore, the total number of misses is $2n^2 + n^2 = 3n^2$ and the miss rate is $\frac{3n^2}{9n^2} = \frac{1}{3} \approx 0.33$. The operational intensity is $I = \frac{4 \cdot 16^2\ \text{flops}}{768 \cdot 32\ \text{byte}} \approx 0.042\ \frac{\text{flops}}{\text{byte}}$.


## 3. Rooflines

a) We have the following relationships between work $W$, byte transfer $Q$, operational intensity $I$, performance $P$ and bandwidth $\beta$.

$$
\begin{aligned}
I(n) &= \frac{W(n)}{Q(n)} \\
P(n) &= \frac{W(n)}{T(n)} \\
\beta &\geq \frac{Q}{T} = \frac{W}{T} \div \frac{W}{Q} = \frac{P}{I} \\
\log{P} &\leq \log{\beta} + \log{I} \leq \log{\pi},
\end{aligned}
$$

where $\pi$ is the peak performance which is attained at $I = \frac{\pi}{\beta}$. 

We can compute $\beta$ from the given specifications:
$$
\beta = 50 \frac{\text{GB}}{\text{s}} = 50 \frac{\text{GB}}{2 \cdot 10^9 \text{cycle}} = 25 \frac{\text{byte}}{\text{cycle}}
$$

As the processor can issue 2 FMAs per cycle we get a peak performance of **4 FLOPs per cycle** without vector instructions. **With vector instructions** we can do 8 FMAs per cycle and hence we get a peak performance of **16 FLOPs per cycle**.



b) I denote $I_u$ the hard upper bound to the ooperational intensity $I$. The table below summarizes the results:

| function | W(n) | Q(n) | $I_u(n)$ | P* | P* with SIMD
| - | - | - | - | - | - |
| ```comp1``` ```comp2```| $3n$ | $(2n + 32) \cdot 8$ | $\frac{3n}{(2n+32) \cdot 8} \leq \frac{3n}{16n} = \frac{3}{16}$ | $\min(\beta \cdot I_u, \pi) = \min(4.6875, 4) = 4$ | $\min(\beta \cdot I_u, \pi_\text{vec}) = \min(4.6875, 16) = 4.6875$ |
| ```comp3```| $2rn$ | $(rn + 2n) \cdot 8$ | $\frac{2rn}{(rn + 2n) \cdot 8} = \frac{6n}{40n} = \frac{6}{40}$ |  3.75 | 3.75 |

@import "roofline_b.svg"

The graph above visualizes the rooflines with points corresponding to $(I_u, P^*)$ and $(I_u, P_\text{vec}^*)$. Note that the plot has only three visible dots because some of the points in the table are identical.


c) comp1 can be computed with one FMA and one ADD. comp2 needs 3 ADDs and comp3 only one FMA. Hence, we get the following results:

| function | $T(n)$ | $P(n)$ | $P_{vec}(n)$
| - | - | - | -
| ```comp1```| $2 \cdot \frac{n}{2} = n$ | $\min (3, 4) = 3$ | $\min (12, 4.6875) = 4.6875$
| ```comp2```| $3 \cdot \frac{n}{2}$ | $\min (2, 4) = 2$ | $\min (8, 4.6875) = 4.6875$
| ```comp3```| $\frac{rn}{2}$ | $\min (4, 3.75) = 3.75$ | $\min (16, 3.75) = 3.75$ |

@import "roofline_c.svg"

Note that the plot has only four visible dots because some of the points in the table are identical.

d) As we can see from our derivation of $I_u(n)$ for ```comp3```, the operational intensity will increase as we increment $r$ since $rn$ will dominate over the term $2n$. In particular, the operational intensity converges to $I^* = \frac{1}{4}$ when we neglect cache capacity misses. The performance for $r=3$ is inherently limited by the bandwith (memory bounded). Hence, we can try to increase the operational intensity to be less limited by the bandwidth. Using $I^*$ we get $P(n) = \min (\beta \cdot 0.25, \pi) =\min (6.25, 4) = 4$ and $P_{\text{vec}}(n) = \min (\beta \cdot 0.25, \pi_{\text{vec}}) =\min (6.25, 16) = 6.25$.

## 4. Cache Miss Analysis

a) Similar to what we have seen in lecture, we get 
$$
\begin{aligned}
\text{\#misses} &\approx \sum_{i = 0}^{n-1} n \cdot \left(\frac{n - i}{8} + n - i \right) \\
&= \frac{9}{8} \left(n^3 - n \cdot \frac{n(n-1)}{2} \right) \\
&= \frac{9}{8} \frac{n^3 + n^2}{2} \\
&\approx \frac{9}{16}n^3
\end{aligned}
$$

b) All three blocks of A, B and C should fit into the cache. Hence, we get 

$$
\begin{aligned}
3b^2 \cdot 8\ \text{byte} \leq \gamma = 8 \text{KiB} \\
b \leq \sqrt{\frac{8192}{3 \cdot 8}} \approx 18.48
\end{aligned}
$$

As $b$ should be divisible by 8 we get $b = 16$.

c)
$$
\begin{aligned}
\text{\#misses} &\approx \sum_{i = 0}^{\frac{n-b}{b}} \frac{n}{b} \cdot \left(\frac{(n - ib)b}{8} + \frac{(n - ib)b}{8} \right) \\
&= \sum_{i = 0}^{\frac{n-b}{b}} \frac{n}{b} \cdot \frac{(n - ib)b}{4} \\
&\approx \frac{n^3}{8b}
\end{aligned}
$$
