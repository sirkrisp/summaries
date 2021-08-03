# Homework 1

Krispin Wandel, 15-941-388
**NOTE For all compilations I used gcc 9.3.0**

## 1 Get to know your machine

a) - d)
| Param | Value|
| -- | -- |
| Processor Manufacturer / Name / Number | Intel / i7 / i7-10700KF
| CPU base frequency | 3.80 GHz
| CPU maximum frequency| 5.10 GHz (with Intel® Turbo Boost Max Technology 3.0)
| Development phase| Optimization

e) My processor is based on the Skylake architecture and therefore supports FMA. FMA performs 2 floating point instructions and has a throughput of 2. There do not exist operations that perform more than 2 floating point operations or have throughput greater than 2. Hence, the theoretical peak performance is **4 flops / cycle**.

f) & g)
| Operation | Latency [cycles] | Throughput [ops/cycle] |
| - | - | - |
| FMA| 4 | 2
| Comparison OP| 1 | 2

h) ADDSD ```gcc -S -fverbose-asm -O3 add.c```
i) For 80-bit operations and because of backwards compatibility.

## 2 Matrix Vector Multiplication

a) [nothing to answer]
b) $n^2$ additions, $n^2$ multiplications
c) 

@import "./results/ex02_fig1.svg"

d) Compiling the code with the ```-O0``` flag results in low  performance since no optimizations are performed. With the ```-O3 -fno-tree-vectorize``` flags, we can significantly increase the performance. However, the reduction operation in the inner loop of the ```compute``` function is a bottleneck for the computation because of serial computation and, thus, reduces the amount of ILP. Compiling the code with ```-O3 -ffast-math -march=native``` makes the program much faster. First, the ```-ffast-math``` flag gives the compiler more options to use arithmetic rules in such a way to increase ILP. Secondly, by replacing the ```-fno-tree-vectorize``` flag with ```-march=native``` we can further speedup the program by using CPU specific instructions, including vector instructions. However, from the experiment we can clearly see that the computation is inherently memory bound. The first drop in the green curve at $n=400$ occurs because the data no longer fits into the L2 Cache. Another big drop at $n=1400$ indicates that the L3 Cache is maxed out.


## 3 Performance Analysis and Bounds

a) Since the algorithm only involves addition and multiplication, we define the cost measure as the count of floating point additions and multiplications.
$$
C(n) = C_{\text{add}} \cdot n_{\text{add}} + C_{\text{mul}} \cdot n_{\text{mul}}
$$
b) For combination we have to perform 2 additions and 4 multiplications. Hence, we get the following cost for a vector of length $n$:
$$
\begin{aligned}
n_{\text{add}} &= 2n \\
n_{\text{mul}} &= 4n \\
C(n) &= C_{\text{add}} \cdot 2n + C_{\text{mul}} \cdot 4n
\end{aligned}
$$
c)



1. On Haswell, we can use 1 port for floating point additions and 2 ports for floating point multiplications. Therefore, the lower bound $l(n)$ for the number of cycles is:
$$
l(n) = \max \left(\frac{2n}{1}, \frac{4n}{2} \right) = 2n
$$
2. The operation can also be rewritten with 2 multiplications and 2 fma instructions:
    ```c
    double t1, t2, t3;
    t1 = u[i] * u[i];
    t2 = x[i] * y[i];
    t3 = z[i] + t1 * u[i];
    z[i] = t3 + t2 * z[i];
    ```
    Since fma instructions can be scheduled on 2 ports, we get the following lower bound:
$$
l_{\text{FMA}}(n) = \max \left(\frac{2n}{2}, \frac{2n}{2} \right) = n
$$
3. We have to load $x, y, z, u$ which results in a total of $4n$ reads. Hence, we get the following answers:
    1. L1 Cache has a maximum load throughput of 8. Therefore, the lower bound for the number of cycles is:
    $$
    l_{\text{L1}}(n) = \frac{4n}{8} = \frac{n}{2}
    $$
    2. RAM has a maximum load throughput of 2. Hence:
    $$
    l_{\text{RAM}}(n) = \frac{4n}{2} = 2n
    $$

d) We need to read a total of
$$
Q_{\text{read}}(n) = 4n \cdot8 \, \text{bytes}= 32n\, \text{bytes}
$$
bytes (64 bits = 8 bytes). Since we have to perform $6n$ floating point operations in total, we get:
$$
I(n) \leq \frac{W(n)}{Q_{\text{read}}(n)} = \frac{6n \, \text{flops}}{32n \, \text{bytes}} = 0.1875 \, \frac{\text{flops}}{\text{bytes}} 
$$

## 4 Scalar Product

a) & b)
@import "./results/ex04_fig1_10accum.svg"

c) The highest performance I achieved was $1.68\, \frac{\text{flops}}{\text{cycle}}$ using $K=10$ accumulators that increase ILP. Theoretically, because both fAdd and fMult have a latency of 4 and throughput of 2 on my CPU, the best number of accumulators should be $K = 2 \cdot (4+4) = 16$. However, I consistenly got better performance with only 10 accumulators. The red curve first increases which is likely due to the overhead of the accumulators for small $n$. However, the performance quickly drops at $n=4096$ because the data does no longer fit into the L2 Cache and because the computation is inherently memory bound. Another drop occurs at $n=2^{20}$ because the L3 Cache is maxed out. When the L3 Cache is full we can also see a drop in the blue curve for the same reason. Finally, one can observe that the blue curve decreases in the begginning, which might be because the compiler made some clever optimizations suitable only for small $n$. 

d) [nothing to answer]

## 5 ILP Analysis

a)
**Throughput and gap** for floating point addition and multiplication on Haswell:

| Operation | Latency | Gap |
| - | - | - |
| MULT | 5 | 2 |
| ADD | 3 | 1|

**Dependency graph**:
The given code snippet

```c
double artcomp ( double a, double b, double c) {
    double r;
    r = (a + b) * (b + c) + a * c;
    return r;
}
```

is equal to (without simplifying arithmetic):

```c
double artcomp ( double a, double b, double c) {
    double r, t1, t2, t3, t4;
    t1 = a * c;
    t2 = a + b;
    t3 = b + c;
    t4 = t2 * t3;
    r = t1 + t4;
    return r;
}
```

**Best possible schedule of operations**:

| Cycle | Port 0 (MULT) | Port 1 (MULT + ADD)|
| - | - | - |
| 1 | t1 | t2 |
| 2 | t1 | t2, t3 |
| 3 | t1 | t2, t3 |
| 4 | t1 | t3 |
| 5 | t1 | t4 |
| 6 |  | t4 |
| 7 |  | t4 |
| 8 |  | t4 |
| 9 |  | t4 |
| 10 |  | r |
| 11 |  | r |
| 12 |  | r |

&#10132; ```artcomp``` needs at least **12 cycles**.















