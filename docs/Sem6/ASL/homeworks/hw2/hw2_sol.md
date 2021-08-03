
# Homework 2

Krispin Wandel, 15-941-388

## 1. Optimization Blockers

a)

Results of optimizations:

| Algorithm | Runtime [cycles] | Speedup |
|-|-|-
| ```slow_performance1``` | 53300 | - 
| ```slow_performance2``` | 6740 | 7.91
| ```maxperformance``` | 2767 | 19.26

Code of ```slow_performance1``` as reference:

```c++ {.line-numbers}
void slow_performance1(float* x, float *y, float *z, int n) {
    for (int i = 0; i < n - 2; i++) {
        x[i]     = x[i] / M_SQRT2 + y[i] * C1;
        x[i+1]  += z[(i % 4) * 10] * C2;
        x[i+2]  += sin ((2 * M_PI * i) / 3) * y[i+2];
    }
}
```

```slow_performance2```:
First, I split the loop inside ```slow_performance1``` into three seperate loops where in each loop I optimized lines 3-5 accordingly. For each loop I did the following optimization: 
1) [Line 3] Instead of dividing through ```M_SQRT2``` in each iteration we can simply pre-compute ```1 / M_SQRT2``` and then perform a much cheaper multiplication in each iteration.
2) [Line 4] ```z[(i % 4) * 10] * C2``` can be pre-computed as well as it takes on only four values. We can then create a for-loop where in each iteration we assign those four values to the next four entries.
3) [Line 5] Similar to the previous optimization, we can pre-compute ```sin ((2 * M_PI * i) / 3)``` as it evaluates either to zero or to +/- $\sin(2 \pi / 3)$. Again,we assign those three values to the next three entries in each iteration of the for-loop.

```maxperformance```:
It turns out that by merging those three for loops one can perform further simplifications. As the loop variable in loop (2) of ```slow_performance2``` is increased by four and in loop (3) increased by three, I merged those loops by iterating over the next 12 (the least common multiple of 3 and 4) entries in each step. One can then simplify all computations to only 2 floating point multiplications and additions per entry in $x$.

b) As seen from the table above, the maximum speedup I got was 19.26.

c) The cost is roughly:

$$
C = 2n \cdot C_\text{add} + 2n \cdot C_\text{mult}
$$

$n=1022$ in all tests. Hence, ```maxperformance``` has a performance of 
$$
\frac{4088\ \text{flops}}{2767\ \text{cycles}} = 1.48 \frac{\text{flops}}{\text{cycles}}
$$


## 2. Microbenchmarks

The following table summarizes the results from my micro-benchmarks:

| Operation | Latency [cycles] | Gap [cycles] |
| - | - | -
| Add | 4.01 | 0.58
| Div | 14.03 | 4.01
| Div (min) | 13.03 | 4.01
| Foo | 18.04 | 4.01
| Foo (min) | 17.04 | 4.01

a) As we can see from the table above, the latency and gap of floating point addition and multiplication match the specifications provided by Intel. However, the gap of floating point addition deviates slightly more from its nominal value than the other operations, although not significantly. The reason for that is likely due to the simplicity of floating point addition and the overhead caused by the ```for```and ```while``` loop involved in my measurement for ```add```. Moreover, we can observe that the latency of floating point division decreases by a full cycle when we use trivial divisions such as $\frac{1}{1}$ or $\frac{0}{1}$.

b) The latency and gap of $f(x)$ matches what we would expect. In order to compute $f(x)$ we first have to invoke a ```fma``` operation and then a ```div``` operation. ```fma``` has a latency of 4 cycles and a gap of 0.5 cycles. Hence, the total latency is $4+14=18$ cycles and the gap is equal to $max(0.5,4) = 4$ cycles. Furthermore, $f(0) = \frac{0}{1}$ is a trivial division and therefore we get a minimum latency of 17 cycles.

c) If ```fma``` is disabled, the latency will change, whereas the gap stays the same. In particular, the ```fma``` will change to an ```add``` and a ```mul```. Note that the addition relies on the result of the multiplication, thus, ```add``` and ```mul``` cannot be executed in parallel. Both, floating point addition and multiplication, have a latency of 4 and a gap of 0.5 on Skylake. Hence, the total latency will be $8+14(13)=22(21)$. The gap stays the same as the gap of addition and multiplication is smaller than the gap of division.